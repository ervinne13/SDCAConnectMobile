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
  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back"/>
            </Button>
          </Left>
          <Body>
            <Title>Pending Tasks</Title>
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
