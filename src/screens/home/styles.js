const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;

export default {
  container: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: '#bdc0c0'
  },
  logoContainer: {
    flex: 1,
    marginTop: deviceHeight / 8,
    marginBottom: 30
  },
  logo: {
    position: "absolute",
    left: Platform.OS === "android" ? 40 : 50,
    top: Platform.OS === "android" ? 35 : 60,
    width: 280,
    height: 150
  },
  text: {
    color: "#5f3a17",
    bottom: 6,
    marginTop: 5
  }
};
