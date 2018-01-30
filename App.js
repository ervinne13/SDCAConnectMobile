import React from "react";
import Setup from "./src/boot/setup";
import Login from "./src/screens/login";
import Splashscreen from "./src/screens/splashscreen";
import PendingTasksScreen from "./src/screens/pendingtasks";

import UserAPI from './src/api/UserAPI';

import Task from './src/models/Task';
import TaskService from './src/services/TaskService';

import {AsyncStorage} from "react-native";
import {Root, Toast} from "native-base";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      authenticated: false
    };
  }

  async componentDidMount() {
    console.log('mounted');

    let authenticationToken = await AsyncStorage.getItem('@Connect:AuthToken');
    if (authenticationToken) {
      
      this.setState({authenticated: true});
      console.log('authenticated, will lookup user from server later');

      let userAPI = new UserAPI(await AsyncStorage.getItem('@Connect:Server'));
      userAPI.checkToken(authenticationToken)
        .then(() => {
          this.setState({authenticated: true});
          this.setState({loading: false});

          this.beginSync();          
        }).catch(err => {
          if (err === 401) {  //  Unauthorized
            this.setState({authenticated: false});
          } else {
            console.error(error);
            throw new Error(error);
          }        

          this.setState({loading: false});
        });
            
    } else {
      this.setState({loading: false});
    }
    
  }

  async processUserInfo(userInfo) {
    console.log('Processing user info', userInfo);
    if (userInfo.token && userInfo.display_name) {
      await AsyncStorage.setItem('@Connect:UserDisplayName', userInfo.display_name);
      await AsyncStorage.setItem('@Connect:AuthToken', userInfo.token);

      this.setState({authenticated: true});
      console.log('Welcome ' + userInfo.display_name);

      this.beginSync();
    }
  }

  async beginSync() {
    let AuthToken = await AsyncStorage.getItem('@Connect:AuthToken');
    let server = await AsyncStorage.getItem('@Connect:Server');
    TaskService.beginSync(server, AuthToken)
      .then(() => {
        Toast.show({ text: 'Tasks Synchronized', position: 'bottom' });
      }).catch(err => {
        if (err === 401) {  //  Unauthorized
          this.setState({authenticated: false});
        } else {
          console.error(error);
          throw new Error(error);
        }        
      });
  }

  render() {
    if (this.state.loading) {
      return (
        <Root>
          <Splashscreen/>
        </Root>
      );
    } else if (!this.state.authenticated) {
      return <Login onLoginSuccess={userInfo => this.processUserInfo(userInfo)}/>;
    } else {
      return (
        <Root>
          <Setup/>
        </Root>
      );
    }
  }
}