import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SignupScreen from "./src/screens/SignupScreen";
import MovieScreen from "./src/screens/MovieScreen";
import ReviewScreen from "./src/screens/ReviewScreen";

const navigator = createSwitchNavigator(
  {
    loginFlow: createStackNavigator({
      Login: LoginScreen,
      Signup: SignupScreen,
    }),

    mainFlow: createStackNavigator({
      Home: HomeScreen,
      Movie: MovieScreen,
      Review: ReviewScreen,
    }),
  },
  {
    initialRouteName: "loginFlow",
    defaultNavigationOptions: { title: "Main" },
  }
);

HomeScreen.navigationOptions = () => {
  return {
    headerStyle: {
      backgroundColor: "#303337",
    },
    headerTitleStyle: {
      color: "#cfcfcf",
    },
  };
};

MovieScreen.navigationOptions = () => {
  return {
    headerStyle: {
      backgroundColor: "#303337",
    },
    headerTitleStyle: {
      color: "#cfcfcf",
    },
    
  };
};
ReviewScreen.navigationOptions = () => {
  return {
    headerStyle: {
      backgroundColor: "#303337",
    },
    headerTitleStyle: {
      color: "#cfcfcf",
    },
  };
};

export default createAppContainer(navigator);