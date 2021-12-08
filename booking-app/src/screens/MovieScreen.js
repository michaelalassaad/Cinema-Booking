import React from "react";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import AuthContext from "../context/AuthContext";

//Inside navigation, we have the prop id.

const MovieScreen = ({ navigation }) => {
  const [movie, setMovie] = useState(null);
  const { custId, setCustId } = useContext(AuthContext);
  console.log(custId);

  /*
  const getMovie = () => {
    const id = navigation.getParam("id");
    setMovie({ title: "ok", id: id });
  };

  useEffect(() => {
    getMovie();
  }, []);

  if (!movie) return null;
  */

  return <Text>{custId}</Text>;
};

export default MovieScreen;
