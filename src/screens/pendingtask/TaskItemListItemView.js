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

class TaskItemListItemView extends Component {
  render() {

    let taskItem = this.props.taskItem;

    console.log(taskItem);

    return (
      <View>
        <Text>{taskItem.text}</Text>
      </View>
    );
  }
}

export default TaskItemListItemView;
