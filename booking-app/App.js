import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SignupScreen from "./src/screens/SignupScreen";
import MovieScreen from "./src/screens/MovieScreen";
import MovieReview from "./src/screens/MovieReview";
import BookingScreen from "./src/screens/BookingScreen";
import { AuthProvider } from "./src/context/AuthContext";

const navigator = createSwitchNavigator(
  {
    loginFlow: createStackNavigator({
      Login: LoginScreen,
      Signup: SignupScreen,
    }),

    mainFlow: createStackNavigator({
      Home: HomeScreen,
      Movie: MovieScreen,
      Review: MovieReview,
      Book: BookingScreen,
    }),
  },
  {
    initialRouteName: "loginFlow",
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
MovieReview.navigationOptions = () => {
  return {
    headerStyle: {
      backgroundColor: "#303337",
    },
    headerTitleStyle: {
      color: "#cfcfcf",
    },
  };
};

const App = createAppContainer(navigator);

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};
