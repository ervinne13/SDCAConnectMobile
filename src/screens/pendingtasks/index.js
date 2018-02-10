import React, {Component} from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Footer,
  FooterTab,
  View,
  Left,
  Right,
  Body,
  Toast
} from "native-base";

import TaskListItemView from './TaskListItemView';

import {AsyncStorage, NetInfo, RefreshControl} from "react-native";
import {ListView} from 'realm/react-native';

//  Services
import TaskService from '../../services/TaskService';

import styles from "./styles";

class PendingTasksScreen extends Component {

  constructor(props) {
    super(props);
    this.loadTasks();
  }

  loadTasks() {
    let tasks = Array.from(TaskService.findAll());
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: ds.cloneWithRows(tasks),
      refreshing: false
    };

  }

  onRefresh() {
    this.setState({refreshing: true});
    this.beginSync();
  }

  async beginSync() {
    let AuthToken = await AsyncStorage.getItem('@Connect:AuthToken');
    let server = await AsyncStorage.getItem('@Connect:Server');
    TaskService.beginSync(server, AuthToken)
      .then(() => {
        this.setState({refreshing: false});
        this.loadTasks();
        //  show for 5s
        Toast.show({ text: 'Tasks Synchronized', position: 'bottom', duration: 5000 });        
      }).catch(err => {
        this.setState({refreshing: false});
        if (err === 401) {  //  Unauthorized
          //  notify that the user needs to log in again
        } else {
          console.error(err);
          throw new Error(err);
        }        
      });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="ios-menu"/>
            </Button>
          </Left>
          <Body>
            <View>
              <Title>Pending Tasks</Title>
            </View>
          </Body>
          <Right/>
        </Header>

        <Content padder>
          <View>
            <ListView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh.bind(this)}
                />
              }
              dataSource={this.state.dataSource}
              renderRow={(rowData) => <TaskListItemView task={rowData} navigation={this.props.navigation}/>}/>
          </View>
        </Content>

        <Footer>
          <FooterTab>
            <Button active info onPress={() => this.onRefresh()}>
              <Text>Refresh</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default PendingTasksScreen;
