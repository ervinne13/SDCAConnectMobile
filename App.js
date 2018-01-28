import React from "react";
import Setup from "./src/boot/setup";
import Login from "./src/screens/login";
import Splashscreen from "./src/screens/splashscreen";
import PendingTasksScreen from "./src/screens/pendingtasks";

import Task from './src/models/Task';
import TaskService from './src/services/TaskService';

import {AsyncStorage} from "react-native";
import {Root} from "native-base";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      authenticated: false
    };
  }

  async componentDidMount() {
    console.log('Attempting to get authentication token from storage');
    let authenticationToken = await AsyncStorage.getItem('@Connect:AuthToken');
    if (authenticationToken) {
      //  TODO validate auth token here
      this.setState({authenticated: true});
      console.log('authenticated, will lookup user from server later');
    }

    this.setState({loading: false});
  }

  async processUserInfo(userInfo) {
    console.log('Processing user info', userInfo);
    if (userInfo.token && userInfo.display_name) {
      await AsyncStorage.setItem('@Connect:UserDisplayName', userInfo.display_name);
      await AsyncStorage.setItem('@Connect:AuthToken', userInfo.token);

      this.setState({authenticated: true});
      console.log('Welcome ' + userInfo.display_name);
    }
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
      return <Setup />
    }
  }
}