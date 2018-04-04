import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Thumbnail,
  Left,
  Right,
  Body,
  Item,
  Picker
} from "native-base";
import styles from "./styles";

import { AsyncStorage, NetInfo, RefreshControl } from "react-native";
import { ListView } from 'realm/react-native';
import ProfileAPI from '../../api/ProfileAPI';

class NHListAvatar extends Component {

  constructor(props) {
    super(props);

    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      profileType: 'Students',
      profileTypes: ['Students', 'Teachers'],      
      server: '',
      dataSource: ds.cloneWithRows([]),
      refreshing: false
    };

    // this.displayProfiles([], true);

    this.loadProfiles('students');
  }

  async loadProfiles(type) {

    let server = await AsyncStorage.getItem('@Connect:Server');
    let authenticationToken = await AsyncStorage.getItem('@Connect:AuthToken');
    let profileAPI = new ProfileAPI(server, authenticationToken);

    this.setState({ server });

    console.log('refreshing profiles');

    if (type == 'Students') {
      profileAPI.getStudents()
        .then(students => {
          this.displayProfiles(students);
        }).catch(err => {
          console.log('Error', err);
          if (err === 401) {  //  Unauthorized
            this.setState({ authenticated: false });
          } else {
            console.error(err);
            throw new Error(err);
          }

          this.setState({ refreshing: false });
        });
    } else {
      profileAPI.getTeachers()
        .then(teachers => {
          this.displayProfiles(teachers);
        }).catch(err => {
          console.log('Error', err);
          if (err === 401) {  //  Unauthorized
            this.setState({ authenticated: false });
          } else {
            console.error(err);
            throw new Error(err);
          }

          this.setState({ refreshing: false });
        });
    }
  }

  displayProfiles(profiles) {

    console.log('refreshing posts by api');
    this.setState({ refreshing: false });
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(profiles)
    });

    console.log('profiles', profiles);

    console.log(this.state);
  }

  onRefresh() {
    this.setState({ refreshing: true });
  }

  onProfileTypeChanged(profileType) {
    this.setState({ profileType });
    this.loadProfiles(profileType);
  }

  renderItem(data) {
    return (
      <ListItem avatar>
        <Left>
          <Thumbnail small source={{ uri: this.state.server + '/' + data.user_account.image_url }} />
        </Left>
        <Body>
          <Text>
            {data.user_account.display_name}
          </Text>
          <Text numberOfLines={1} note>
            {data.student_number ? data.student_number : data.about}
          </Text>
        </Body>
        <Right>
          <Text note>
            {data.time}
          </Text>
        </Right>
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
            <Title>Profile List</Title>
          </Body>
          <Right />
        </Header>

        <Content>

          <Picker
            mode="dropdown"
            selectedValue={this.state.profileType}
            onValueChange={this
              .onProfileTypeChanged
              .bind(this)}>
            <Item label="Select profile type to display" value={null} />
            {this.state.profileTypes.map((choice, key) => <Item label={choice} value={choice} key={key} />)}
          </Picker>

          <ListView
            dataSource={this.state.dataSource}
            renderRow={data => this.renderItem(data)}
          />
        </Content>
      </Container>
    );
  }
}

export default NHListAvatar;
