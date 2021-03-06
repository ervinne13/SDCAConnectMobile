//  React
import React, { Component } from "react";
import { Root, Toast } from "native-base";
import { AsyncStorage, NetInfo } from "react-native";
import { StackNavigator, DrawerNavigator } from "react-navigation";

//  Screens
import Login from "./screens/login";
import Splashscreen from "./screens/splashscreen";
import PendingTasksScreen from "./screens/pendingtasks";
import PendingTaskScreen from "./screens/pendingtask";
import PostsScreen from "./screens/posts";
import ProfilesScreen from "./screens/profiles";
import ProfileScreen from "./screens/profile";
import Home from "./screens/home/";
import SideBar from "./screens/sidebar";

import TaskListItemView from './screens/pendingtasks/TaskListItemView'

//  API
import UserAPI from './api/UserAPI';

//  Models
import Task from './models/Task';

//  Services
import TaskService from './services/TaskService';
import PostService from './services/PostService';

import { NotificationsAndroid } from 'react-native-notifications';
import { NativeModules, DeviceEventEmitter } from "react-native";

const RNNotifications = NativeModules.WixRNNotifications;

const Drawer = DrawerNavigator(
  {
    Home: { screen: Home },
    PendingTasksScreen: { screen: PendingTasksScreen },
    PendingTaskScreen: { screen: PendingTaskScreen },
    PostsScreen: { screen: PostsScreen },
    ProfilesScreen: { screen: ProfilesScreen },
    ProfileScreen: { screen: ProfileScreen },
  },
  {
    initialRouteName: "Home",
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const AppNavigator = StackNavigator(
  {
    Drawer: { screen: Drawer },
    PendingTasksScreen: { screen: PendingTasksScreen },
    PendingTaskScreen: { screen: PendingTaskScreen },
    PostsScreen: { screen: PostsScreen },
    ProfilesScreen: { screen: ProfilesScreen },
    ProfileScreen: { screen: ProfileScreen },
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      taskCount: 0,
      loading: true,
      authenticated: false
    };
  }

  async componentDidMount() {
    console.log('mounted');

    let authenticationToken = await AsyncStorage.getItem('@Connect:AuthToken');
    if (authenticationToken) {

      this.setState({ authenticated: true });
      console.log('authenticated, now validating if token is still valid');

      const connectionInfo = await NetInfo.getConnectionInfo();

      if (connectionInfo.type == 'none') {
        console.log('Checking is aborted, no connection to server');
        this.setState({ authenticated: true });
        this.setState({ loading: false });
        return;
      }

      let userAPI = new UserAPI(await AsyncStorage.getItem('@Connect:Server'));
      userAPI.checkToken(authenticationToken)
        .then(() => {
          this.setState({ authenticated: true });
          this.setState({ loading: false });
          this.beginSyncContinuous();
        }).catch(err => {
          if (err === 401) {  //  Unauthorized
            this.setState({ authenticated: false });
          } else {
            console.error(err);
            throw new Error(err);
          }

          this.setState({ loading: false });
        });

    } else {
      this.setState({ loading: false });
    }

  }

  async processUserInfo(userInfo) {
    console.log('Processing user info', userInfo);
    if (userInfo.token && userInfo.display_name) {
      await AsyncStorage.setItem('@Connect:UserDisplayName', userInfo.display_name);
      await AsyncStorage.setItem('@Connect:AuthToken', userInfo.token);

      this.setState({ authenticated: true });
      console.log('Welcome ' + userInfo.display_name);

      this.beginSyncContinuous();
    }
  }

  async beginSync() {
    let AuthToken = await AsyncStorage.getItem('@Connect:AuthToken');
    let server = await AsyncStorage.getItem('@Connect:Server');
    TaskService.beginSync(server, AuthToken)
      .then(() => {
        //  show for 2s
        // Toast.show({ text: 'Tasks Synchronized', position: 'bottom', duration: 2000 });

        let synchronizedTasks = TaskService.findAll();

        if (synchronizedTasks.length && this.state.taskCount != synchronizedTasks.length) {
          RNNotifications.postLocalNotification({
            title: "MySDCA Connect",
            body: `You have ${synchronizedTasks.length} tasks!`,
            extra: "data"
          }, 1);

          this.setState({ taskCount: synchronizedTasks.length });
        }
        console.log('Created notifications');
      }).catch(err => {
        if (err === 401) {  //  Unauthorized
          this.setState({ authenticated: false });
        } else {
          console.error(err);
          throw new Error(err);
        }
      });

    PostService.beginSync(server, AuthToken)
      .then(() => {
        //  show for 2s
        Toast.show({ text: 'Posts Synchronized', position: 'bottom', duration: 2000 });
      }).catch(err => {
        if (err === 401) {  //  Unauthorized
          this.setState({ authenticated: false });
        } else {
          console.error(err);
          throw new Error(err);
        }
      });
  }

  async onLogout() {
    console.log('Logging out');
    await AsyncStorage.multiRemove(['@Connect:AuthToken', '@Connect:UserDisplayName']);

    this.setState({ authenticated: false });

    console.log('Logged out');
  }

  async beginSyncContinuous() {
    setInterval(async function () {
      const connectionInfo = await NetInfo.getConnectionInfo();
      if (connectionInfo.type != 'none') {
        this.beginSync();
      }
    }.bind(this), 5000);
  }

  render() {
    if (this.state.loading) {
      return (
        <Root>
          <Splashscreen />
        </Root>
      );
    } else if (!this.state.authenticated) {
      return <Login onLoginSuccess={userInfo => this.processUserInfo(userInfo)} />;
    } else {
      return (
        <Root>
          <AppNavigator screenProps={{ onLogout: () => this.onLogout() }} />
        </Root>
      );
    }
  }

}
