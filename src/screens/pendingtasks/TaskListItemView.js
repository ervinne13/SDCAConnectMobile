import React, {Component} from "react";
import {
  Text,
  View,
  ListItem,
  Left,
  Right,
  Body
} from "native-base";

class TaskListItemView extends Component {
  render() {

    let task = this.props.task;
    let typeDisplay = '';

    switch (task.typeCode) {
      case 'A':
        typeDisplay = 'Assignment';
        break;
      case 'Q':
        typeDisplay = 'Quiz';
        break;
    }

    return (
      <View>
        <ListItem avatar onPress={() => this.props.navigation.navigate('PendingTaskScreen', {task})}>
          <Body>
            <Text>{task.displayName}</Text>
            <Text note>{task.description}</Text>
          </Body>
          <Right>
            <Text note>{typeDisplay}</Text>
          </Right>
        </ListItem>
      </View>
    );
  }
}

export default TaskListItemView;
