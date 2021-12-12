import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button } from "react-native-elements";
import AuthContext from "../context/AuthContext";

const MovieScreen = ({ navigation }) => {
  const { custId } = useContext(AuthContext);
  const movieId = navigation.getParam("movieId");

  return (
    <View>
      <Text>
        movie: {movieId} customer: {custId}
      </Text>

      <Button
        title={"Submit Review"}
        onPress={() => {
          navigation.pop();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default MovieScreen;
