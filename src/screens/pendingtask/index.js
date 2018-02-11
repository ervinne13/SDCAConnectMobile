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

import TrueOrFalseView from "./TrueOrFalseView";
import MultipleChoiceView from "./MultipleChoiceView";

class PendingTaskScreen extends Component {

  constructor(props) {
    super(props);

    let task = this.props.navigation.state.params.task;
    let state = {};

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

  onSubmitAnswers() {
    let form = this.state;
    console.log(form);

  }

  render() {

    let task = this.props.navigation.state.params.task;

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
                      onValueChange={this.onTaskItemValueChange.bind(this)}/>
                  case 'MC':
                    return <MultipleChoiceView
                      taskItem={taskItem}
                      key={key}
                      onValueChange={this.onTaskItemValueChange.bind(this)}/>
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

export default PendingTaskScreen;
