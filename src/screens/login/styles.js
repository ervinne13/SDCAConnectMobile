const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;

export default {
  container: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: '#E1E1E1',
  },
  content: {
    alignItems:'center'
  }
};
