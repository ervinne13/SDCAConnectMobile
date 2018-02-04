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
  Left,
  Right,
  Body,
  View
} from "native-base";

//  Services
import TaskService from './services/TaskService';

import styles from "./styles";

class TaskList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tasks: []
    };
  }

  async componentDidMount() {
    this.setState('tasks', TaskService.findAll());
  }

  render() {
    return (
      <View>
        this.
      </View>
    );
  }
}

export default TaskList;
