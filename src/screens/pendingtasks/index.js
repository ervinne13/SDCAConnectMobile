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

import styles from "./styles";

class PendingTasksScreen extends Component {
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
            <Title>Pending Tasks</Title>
          </Body>
          <Right/>
        </Header>

        <Content padder>
          <View>
            <Text>Content goes here</Text>
          </View>
        </Content>

        <Footer>
          <FooterTab>
            <Button active full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default PendingTasksScreen;
