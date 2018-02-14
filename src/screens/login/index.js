import React, {Component} from "react";
import { Root, Toast } from "native-base";
import {AsyncStorage} from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Item,
  Label,
  Input,
  Body,
  Left,
  Right,
  Icon,
  Form,
  Spinner,
  Text
} from "native-base";

import styles from "./styles";

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      server: 'http://sdca-connect.tk',
      username: null,
      password: null,
      isLoading: false,
      errorMessage: ''
    };

    AsyncStorage
      .getItem('@Connect:Server')
      .then(server => {
        if (server) {
          this.setState({server});
          console.log('server', this.state.server);
        }
      });

    console.log('server', this.state.server);
  }

  componentWillUnmount() {
    Toast.toastInstance = null;    
  }

  async onLogin() {
    this.setState({isLoading: true});

    AsyncStorage.setItem('@Connect:Server', this.state.server);

    try {
      let url = this.state.server + '/api/v1/login';
      let params = {
        username: this.state.username,
        password: this.state.password
      };

      console.log('Sending request to ' + url, params);
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      });

      let responseJson = await response.json();

      if (response.status == 200) {

        if (responseJson.token) {
          this
            .props
            .onLoginSuccess(responseJson);
        }

        this.setState({errorMessage: ''});
      } else {
        if (responseJson.error) {
          this.setState({errorMessage: responseJson.error});
        } else {
          console.error(responseJson);
        }
      }
    } catch (e) {
      console.error(e);

      this.setState({errorMessage: e});
    } finally {
      this.setState({isLoading: false});
    }

  }

  render() {
    if (this.state.isLoading) {
      return (
        <Container style={styles.container}>
          <Header>
            <Body>
              <Title>Login</Title>
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
            <Body>
              <Title>Login</Title>
            </Body>
            <Right/>
          </Header>

          <Content>
            <Form>
              <Item stackedLabel>
                <Label>Server</Label>
                <Input
                  onChangeText={text => this.setState({server: text})}
                  value={this.state.server}/>
              </Item>
              <Item stackedLabel>
                <Label>Username</Label>
                <Input onChangeText={text => this.setState({username: text})}/>
              </Item>
              <Item stackedLabel last>
                <Label>Password</Label>
                <Input secureTextEntry onChangeText={text => this.setState({password: text})}/>
              </Item>
            </Form>
            <Button
              success
              onPress={() => this.onLogin()}
              block
              style={{
              margin: 15,
              marginTop: 50
            }}>
              <Text>Sign In</Text>
            </Button>

            <Text
              style={{
              color: 'red',
              margin: 'auto'
            }}>{this.state.errorMessage}</Text>
          </Content>
        </Container>
      );
    }
  }
}

export default Login;
