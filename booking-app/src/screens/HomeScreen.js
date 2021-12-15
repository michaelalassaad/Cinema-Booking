import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View, Text, Button } from "react-native";
import MovieCard from "../components/MovieCard";
import { SearchBar, Tab, Overlay } from "react-native-elements";
import axios from "axios";
import { NavigationEvents } from "react-navigation";

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState(null);
  const [term, setTerm] = useState("");
  const [index, setIndex] = useState(0);
  const [showReview, setShowReview] = useState(false);

  useEffect(async () => {
    if (index == 0) {
      try {
        const res = await axios.get("http://172.20.10.2:3000/now");
        setTerm("");
        setMovies(res.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res = await axios.get("http://172.20.10.2:3000/all");
        setTerm("");
        setMovies(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  }, [index]);

  const search = async (searchTerm) => {
    try {
      const res = await axios.get("http://172.20.10.2:3000/search", {
        params: {
          term: searchTerm,
          filter: index,
        },
      });

      setMovies(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const clear = () => {
    search("");
  };

  return (
    <View style={styles.container}>
      <NavigationEvents
        onWillFocus={() => {
          console.log(navigation);
          if (navigation.getParam("showReview")) {
            console.log(showReview);
            setShowReview(navigation.getParam("showReview"));
          } else setShowReview(false);
        }}
        onDidBlur={() => {
          setShowReview(false);
        }}
      />
      <View>
        <SearchBar
          placeholder="Type Here..."
          value={term}
          onChangeText={(newTerm) => setTerm(newTerm)}
          onSubmitEditing={() => search(term)}
          onClear={clear}
          round={true}
          searchIcon={{ size: 25 }}
        />

        <Tab value={index} onChange={setIndex}>
          <Tab.Item
            title="Now showing"
            titleStyle={index == 0 ? styles.pressed : styles.unpressed}
          />
          <Tab.Item
            title="All Movies"
            titleStyle={index == 1 ? styles.pressed : styles.unpressed}
          />
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

      <Overlay
        isVisible={showReview}
        onBackdropPress={() => setShowReview(false)}
      >
        <Text>Do you want to review us?</Text>
        <Button
          onPress={() => {
            navigation.navigate("About");
          }}
          title="Review"
        />
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#303337",
    flex: 1,
  },
  unpressed: {
    color: "grey",
    fontSize: 15,
    fontWeight: "bold",
  },
  pressed: {
    color: "#cfcfcf",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default HomeScreen;
