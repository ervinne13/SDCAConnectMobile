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
  Body
} from "native-base";

import TaskListItemView from './TaskListItemView';

import {ListView} from 'realm/react-native';

//  Services
import TaskService from '../../services/TaskService';

import styles from "./styles";

class PendingTasksScreen extends Component {

  constructor(props) {
    super(props);

    let tasks = Array.from(TaskService.findAll());

    console.log('Tasks', tasks);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: ds.cloneWithRows(tasks)
    };
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
              dataSource={this.state.dataSource}
              renderRow={(rowData) => <TaskListItemView task={rowData} navigation={this.props.navigation}/>}/>
          </View>
        </Content>

        <Footer>
          <FooterTab>
            <Button active full>
              <Text>Refresh</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default PendingTasksScreen;
