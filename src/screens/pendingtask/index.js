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
  Spinner
} from "native-base";

import styles from "./styles";

import TrueOrFalseView from "./TrueOrFalseView";
import MultipleChoiceView from "./MultipleChoiceView";

import TaskAPI from "../../api/TaskAPI";

import {AsyncStorage, NetInfo} from "react-native";

class PendingTaskScreen extends Component {

  constructor(props) {
    super(props);

    let task = this.props.navigation.state.params.task;
    let state = {
      loading: false
    };

    task
      .items
      .forEach(taskItem => {
        state['task_item_' + taskItem.order] = null;
      });

    this.state = state;

    console.log(props.navigation);
  }

  onTaskItemValueChange(sourceTask, value) {
    let key = 'task_item_' + sourceTask.order;

    this.setState({[key]: value});
  }

  async onSubmitAnswers() {
    let task = this.props.navigation.state.params.task;
    let {loading, ...form} = this.state;
    console.log(form);

    //  TODO: confirm here

    this.setState({loading: true});

    let authToken = await AsyncStorage.getItem('@Connect:AuthToken');
    let server = await AsyncStorage.getItem('@Connect:Server');

    let api = new TaskAPI(server, authToken);

    try {
      let response = await api.submitTaskResponse(task.id, form);
      console.log(response);
    } catch(e) {
      //  TODO: toast here
      console.error(e);
    }
  
    this.setState({loading: false});
  }

  render() {

    let task = this.props.navigation.state.params.task;

    if (this.state.loading) {
      return (
        <Container style={styles.container}>
          <Header>
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back"/>
              </Button>
            </Left>
            <Body>
              <Title>{task.displayName}</Title>
            </Body>
            <Right/>
          </Header>

          <Content>
            <Spinner color='blue'/>
          </Content>
        </Container>
      );
    } else {
      return (
        <Container style={styles.container}>
          <Header>
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back"/>
              </Button>
            </Left>
            <Body>
              <Title>{task.displayName}</Title>
            </Body>
            <Right/>
          </Header>

          <Content padder>
            <View>
              <Text>Note that after submission, you are not allowed to edit your answers anymore.</Text>
              {task
                .items
                .map((taskItem, key) => {
                  switch (taskItem.typeCode) {
                    case 'TF':
                      return <TrueOrFalseView
                        taskItem={taskItem}
                        key={key}
                        onValueChange={this
                        .onTaskItemValueChange
                        .bind(this)}/>
                    case 'MC':
                      return <MultipleChoiceView
                        taskItem={taskItem}
                        key={key}
                        onValueChange={this
                        .onTaskItemValueChange
                        .bind(this)}/>
                    default:
                      return <Text key={key}>Task item type {taskItem.typeCode}
                        is not supported in mobile</Text>
                  }
                })}
            </View>
          </Content>

          <Footer>
            <FooterTab>
              <Button active info onPress={() => this.onSubmitAnswers()}>
                <Text>Submit</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      );
    }
  }
}

export default PendingTaskScreen;
