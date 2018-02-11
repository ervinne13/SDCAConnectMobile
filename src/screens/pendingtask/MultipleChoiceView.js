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

class MultipleChoiceView extends Component {
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
    let choices = JSON.parse(taskItem.choices);
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
          {choices.map((choice, key) => <Item label={choice} value={choice} key={key} />)}
        </Picker>

      </View>
    );
  }
}

export default MultipleChoiceView;
