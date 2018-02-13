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

//  APIs
import TaskAPI from "../../api/TaskAPI";

//  Services
import TaskService from '../../services/TaskService';

import {AsyncStorage, NetInfo} from "react-native";

import AwesomeAlert from 'react-native-awesome-alerts';


class PendingTaskScreen extends Component {

  constructor(props) {
    super(props);

    let task = this.props.navigation.state.params.task;

    if (!task) {
      return;
    }

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
    let {
      loading,
      showAlert,
      ...form
    } = this.state;
    console.log(form);

    //  TODO: confirm here

    this.setState({loading: true});

    let authToken = await AsyncStorage.getItem('@Connect:AuthToken');
    let server = await AsyncStorage.getItem('@Connect:Server');

    let api = new TaskAPI(server, authToken);

    try {
      let response = await api.submitTaskResponse(task.id, form);
      TaskService.remove(task);
      console.log(response);

      this.props.navigation.goBack();
    } catch (e) {
      //  TODO: toast here
      console.error(e);
    }

    this.setState({loading: false});
  }

  showAlert() {
    this.setState({showAlert: true});
  };

  hideAlert() {
    this.setState({showAlert: false});
  };

  render() {

    const task = this.props.navigation.state.params.task;
    const {showAlert} = this.state;

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
              <Button active info onPress={() => this.showAlert()}>
                <Text>Submit</Text>
              </Button>
            </FooterTab>
          </Footer>

          <AwesomeAlert
            show={showAlert}
            showProgress={false}
            title="Warning"
            message="After you submit, you may not edit your responses anymore. Are you sure you want to submit now?"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="No, cancel"
            confirmText="Yes, submit my responses"
            confirmButtonColor="#DD6B55"
            onCancelPressed={() => {
            this.hideAlert();
          }}
            onConfirmPressed={() => {
            this.onSubmitAnswers();
            this.hideAlert();
          }}/>
        </Container>
      );
    }
  }
}

export default PendingTaskScreen;
