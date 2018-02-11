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

import styles from "./styles";

class TaskItemView extends Component {
  render() {

    let taskItem = this.props.taskItem;

    console.log('Task item view');
    console.log(taskItem);

    return (
      <View>
        <Text>Test: {taskItem.order}.) {taskItem.text}</Text>

        <View>
          
        </View>

      </View>
    );
  }
}

export default TaskItemView;
