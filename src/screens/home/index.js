import React, { Component } from "react";
import { ImageBackground, View, StatusBar } from "react-native";
import { Container, Button, H3, Text } from "native-base";

import styles from "./styles";

const npLogo = require("../../../assets/np-logo.png");

class Home extends Component {
  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <ImageBackground source={npLogo} style={styles.logo} />
          </View>
          <View
            style={{
              alignItems: "center",
              marginBottom: 50,
              backgroundColor: "transparent"
            }}
          >
            <H3 style={styles.text}>Mobile Loyalty Rewards</H3>
            <View style={{ marginTop: 8 }} />
          </View>
          <View style={{ marginBottom: 80 }}>
            <Button
              style={{ backgroundColor: "#6FAF98", alignSelf: "center" }}
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Text>Lets Go!</Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }
}

export default Home;
