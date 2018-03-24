import React, {Component} from "react";
import {
  Text,
  View,
  ListItem,
  Left,
  Right,
  Body
} from "native-base";

class PostListItemView extends Component {
  render() {

    let post = this.props.post;

    return (
      <View>
        <ListItem avatar>
          <Body>
            <Text>Posted By: {post.authorDisplayName}</Text>
            <Text>Group: {post.groupDisplayName}</Text>

            <Text note>{post.content}</Text>
          </Body>
        </ListItem>
      </View>
    );
  }
}

export default PostListItemView;
