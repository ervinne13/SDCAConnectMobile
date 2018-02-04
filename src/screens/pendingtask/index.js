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

class PendingTaskScreen extends Component {

  constructor(props) {
    super(props);

    console.log(props.navigation);
  }

  render() {

    let task = this.props.navigation.state.params.task;

    console.log(this.props.navigation.state);

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
            <Text>Task Confirmation View</Text>
          </View>
        </Content>

        <Footer>
          <FooterTab>
            <Button active full>
              <Text>Submit</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default PendingTaskScreen;
