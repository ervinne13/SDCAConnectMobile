import React, {Component} from "react";
import {AsyncStorage, ImageBackground, View, StatusBar} from "react-native";
import {Container, Button, H2, H3, Text} from "native-base";

import styles from "./styles";

const npLogo = require("../../../assets/Splash2.png");

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userDisplayName: ''
    };

    AsyncStorage
      .getItem('@Connect:UserDisplayName')
      .then(userDisplayName => this.setState({userDisplayName}));

  }

  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content"/>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <ImageBackground source={npLogo} style={styles.logo}/>
          </View>
          <View
            style={{
            alignItems: "center",
            marginBottom: 50,
            backgroundColor: "transparent"
          }}>
            <H2 style={styles.text}>Hi {this.state.userDisplayName}</H2>
            <H3 style={styles.text}>Welcome to SDCAConnect Mobile</H3>
            <View style={{
              marginTop: 8
            }}/>
          </View>
          <View style={{
            marginBottom: 80
          }}>
            <Button
              style={{
              backgroundColor: "#6FAF98",
              alignSelf: "center"
            }}
              onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Text>Click here to start</Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }
}

export default Home;
