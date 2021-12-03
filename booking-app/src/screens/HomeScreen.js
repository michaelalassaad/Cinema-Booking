import React, { useEffect, useRef, useState } from "react";
import { Text, StyleSheet, FlatList, View } from "react-native";
import MovieCard from "../components/MovieCard";
import { SearchBar, Tab } from "react-native-elements";
import axios from "axios";
import { Button } from "react-native-elements/dist/buttons/Button";
import LoginForm from "../components/LoginForm";

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState(null);
  const [term, setTerm] = useState("");
  const [index, setIndex] = useState(0);
  //const [title, setTitle] = useState();
 
  useEffect(async () => {
    if (index == 0) {
      try {
        const res = await axios.get("http://192.168.16.118:3000/now");
        setMovies(res.data);
        styles.filter1 = { ...styles.filter1, color: "grey" };
        styles.filter2 = { ...styles.filter2, color: "#cfcfcf" };
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res = await axios.get("http://192.168.16.118:3000/all");
        setMovies(res.data);
        styles.filter1 = { ...styles.filter1, color: "#cfcfcf" };
        styles.filter2 = { ...styles.filter2, color: "grey" };
      } catch (err) {
        console.log(err);
      }
    }
  }, [index]);

  return (
    <View style={styles.container}>
      <View>
        <SearchBar
          placeholder="Type Here..."
          value={term}
          onChangeText={(newTerm) => setTerm(newTerm)}
          onSubmitEditing={() => console.log(term)}
          round={true}
          searchIcon={{ size: 25 }}
        />

        <Tab value={index} onChange={setIndex}>
          <Tab.Item title="Now showing" titleStyle={styles.filter1} />
          <Tab.Item title="All Movies" titleStyle={styles.filter2} />
        </Tab>
      </View>

     

      <FlatList
        keyExtractor={(item) => item.movieID}
        columnWrapperStyle={{
          marginVertical: 10,
          marginHorizontal: 20,
          justifyContent: "space-between",
        }}
        data={movies}
        numColumns={2}
        renderItem={({ item }) => {
          return <MovieCard movie={item} />;
        }}
      />
      <Button
        onPress={() => {
          navigation.navigate('Movie');
        }}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#303337",
    flex: 1,
  },
  filter1: {
    color: "#cfcfcf",
    fontSize: 15,
    fontWeight: "bold",
  },
  filter2: {
    color: "grey",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default HomeScreen;