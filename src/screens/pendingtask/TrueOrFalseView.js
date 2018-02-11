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
  Item,
  Picker
} from "native-base";

import styles from "./styles";

class TrueOrFalseView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null
    }
  }

  onValueChange(value) {    
    this.setState({value});
    
    if (this.props.onValueChange) {
      this.props.onValueChange(this.props.taskItem, value);
    }
  }

  render() {
    let taskItem = this.props.taskItem;
    return (
      <View>
        <Text style={styles.titleText}>{taskItem.order}.) {taskItem.text}</Text>
        <Picker          
          mode="dropdown"
          selectedValue={this.state.value}
          onValueChange={this
          .onValueChange
          .bind(this)}>
          <Item label="Select an answer" value={null}/>
          <Item label="True" value={true}/>
          <Item label="False" value={false}/>
        </Picker>

      </View>
    );
  }
}

export default TrueOrFalseView;
