import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";

//Inside navigation, we have the prop id.

const MovieScreen = ({ navigation }) => {
  const [movie, setMovie] = useState(null);

  const getMovie = () => {
    const id = navigation.getParam("id");

    setMovie({ title: "ok", id: id });
  };

  useEffect(() => {
    getMovie();
  }, []);

  if (!movie) return null;

  return <Text>{movie.id}</Text>;
};

export default MovieScreen;
