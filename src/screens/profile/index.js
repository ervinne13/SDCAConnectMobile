import React, { Component } from "react";
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
  Toast,
  List,
  ListItem,
} from "native-base";

import { AsyncStorage, NetInfo, RefreshControl } from "react-native";
import { Image } from 'react-native';
import { ListView } from 'realm/react-native';
import styles from "./styles";

class ProfileScreen extends Component {

  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      server: '',
      profile: props.navigation.state.params,
      imageUrl: '',
      bioText: ''
    };

    console.log(this.state.profile);

  }

  async componentDidMount() {
    let server = await AsyncStorage.getItem('@Connect:Server');
    this.setState({ server });
    this.setState({ imageUrl: this.state.server + '/' + this.state.profile.user_account.image_url });
    this.setState({ bioText: this.state.profile.student_number ? 'Student Number: ' + this.state.profile.student_number : this.state.profile.about });

    console.log(this.state.imageUrl);

  }

  renderItem(data) {
    return (
      <ListItem icon>
        <Left style={{marginLeft: 10}}>
          <Icon name='star' />
        </Left>
        <Body>
          <Text>
            {data.display_name}
          </Text>
        </Body>
      </ListItem>
    );
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{this.state.profile.user_account.display_name}</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <View style={styles.userRow}>
            <Image
              style={styles.userImage}
              source={{ uri: this.state.imageUrl }}
            />
            <View style={styles.userNameRow}>
              <Text style={styles.userNameText}>{this.state.profile.user_account.display_name}</Text>
            </View>
            <View style={styles.userBioRow}>
              <Text style={styles.userBioText}>{this.state.bioText}</Text>
            </View>
          </View>

          <List
            style={{ padding: 10, color: '#FEC724'}}
            dataArray={this.state.profile.user_account.badges}
            renderRow={data => this.renderItem(data)}
          />
        </Content>
      </Container>
    );
  }
}

export default ProfileScreen;
