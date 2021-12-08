import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  ListViewComponent,
  Modal,
} from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import { FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import ReviewCard from "../components/ReviewCard";
import axios from "axios";
import AuthContext from "../context/AuthContext";
//Inside navigation, we have the prop id.

const MovieScreen = ({ navigation }) => {
  const [movie, setMovie] = useState(null);
  const { custId, setCustId } = useContext(AuthContext);
  const [actor, setActor] = useState([]);
  const [direc, setDirec] = useState([]);
  const [review, setReview] = useState([]);
  const [showM, setShowM] = useState(false);

  const getID = () => {
    return navigation.getParam("id");
  };

  const actors = () => {
    return actor.map(function (actor, i) {
      return (
        <View key={i}>
          <Text style={styles.values}>
            {actor.firstName} {actor.lastName}{" "}
          </Text>
        </View>
      );
    });
  };
  const directors = () => {
    return direc.map(function (direc, i) {
      return (
        <View key={i}>
          <Text style={styles.values}>
            {direc.firstName} {direc.lastName}{" "}
          </Text>
        </View>
      );
    });
  };

  useEffect(async () => {
    const id = getID();
    try {
      const res = await axios.get("http://192.168.1.70:3000/movie/", {
        params: { movID: id },
      });
      setMovie(res.data);
      const res1 = await axios.get("http://192.168.1.70:3000/act/", {
        params: { movID: id },
      });
      setActor(res1.data);
      const res2 = await axios.get("http://192.168.1.70:3000/dir/", {
        params: { movID: id },
      });
      setDirec(res2.data);
      const res3 = await axios.get("http://192.168.1.70:3000/review/", {
        params: { movID: id },
      });
      setReview(res3.data);
      styles.filter1 = { ...styles.filter1, color: "#cfcfcf" };
      styles.filter2 = { ...styles.filter2, color: "grey" };
    } catch (err) {
      console.log(err);
    }
  }, [0]);

  if (!movie || !actor || !direc || !review) return null;

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View>
        <Text style={styles.title}>{movie.title}</Text>
      </View>

      <Modal visible={showM} transparent onRequestClose={() => setShowM(false)}>
        <TouchableOpacity onPress={() => setShowM(false)} style={styles.mod}>
          <Image
            source={{ uri: movie.poster }}
            style={{
              width: "85%",
              height: "75%",
              borderColor: "#1E1F21",
              borderWidth: 7,
            }}
          />
        </TouchableOpacity>
      </Modal>

      <View style={styles.container2}>
        <TouchableOpacity onPress={() => setShowM(true)}>
          <Image
            source={{ uri: movie.poster }}
            style={{
              width: 150,
              height: 225,
              marginVertical: 10,
              marginLeft: 15,
              borderColor: "#1E1F21",
              borderWidth: 7,
              borderRadius: 10,
            }}
          />
        </TouchableOpacity>

        <Text style={styles.values}>{movie.descr}</Text>
      </View>

      <View style={styles.container3}>
        <Text style={styles.description}> Cast</Text>
      </View>
      <ScrollView style={styles.container2a}>
        <Text style={styles.values}>{actors()}</Text>
      </ScrollView>

      <View style={styles.container3}>
        <Text style={styles.description}> Director</Text>
      </View>
      <ScrollView style={styles.container2a}>
        <Text style={styles.values}>{directors()}</Text>
      </ScrollView>

      <Button
        title={"Book Now"}
        titleStyle={{ fontFamily: "Noteworthy" }}
        buttonStyle={styles.button}
        ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: ["#42f5ef", "#429cf5"],
          start: { x: 0, y: 0.5 },
          end: { x: 1, y: 0.5 },
        }}
        onPress={() => {
          navigation.navigate("Home");
        }} //to be changed
      />

      <View style={styles.container4}>
        <View style={styles.container5}>
          <Icon
            name="star"
            color="#e8bc1c"
            size={25}
            style={{ marginTop: 1, marginRight: 3 }}
          />
          <Text style={styles.description}> Rating </Text>
          <Text style={styles.values}>{movie.rating} / 10</Text>
        </View>
        <View style={{ marginHorizontal: "15%" }}></View>
        <View style={styles.container5}>
          <Icon
            name="clock-o"
            color="#FFFFFF"
            size={25}
            style={{ marginTop: 1, marginRight: 3 }}
          />
          <Text style={styles.description}> Runtime </Text>
          <Text style={styles.values}>{movie.movieLength} mins</Text>
        </View>
      </View>

      <View>
        <FlatList
          horizontal={true}
          keyExtractor={(item) => item.review.movRevID}
          data={review}
          renderItem={({ item }) => {
            return <ReviewCard rev={item} />;
          }}
        />
      </View>

      <Button
        title={"Add Review"}
        titleStyle={{ fontFamily: "Noteworthy" }}
        buttonStyle={styles.button2}
        ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: ["#42f5ef", "#429cf5"],
          start: { x: 0, y: 0.5 },
          end: { x: 1, y: 0.5 },
        }}
        onPress={() => {
          navigation.navigate("Login");
        }} //to be changed
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "#cfcfcf",
    fontSize: 35,
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    textAlignVertical: "center",
    alignContent: "center",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 5,
  },
  container: {
    backgroundColor: "#303337",
  },
  container2: {
    marginHorizontal: 15,
    marginBottom: 5,
    borderColor: "#1E1F21",
    borderWidth: 3,
    backgroundColor: "#1E1F21",
    borderRadius: 10,
    flexDirection: "row",
  },
  container2a: {
    marginHorizontal: 15,
    marginBottom: 5,
    flexDirection: "row",
  },
  container3: {
    margin: 5,
    flexDirection: "column",
  },
  container4: {
    marginHorizontal: 15,
    marginTop: 5,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "#1E1F21",
    borderWidth: 3,
    backgroundColor: "#1E1F21",
    borderRadius: 10,
  },
  container5: {
    marginHorizontal: 15,
    marginTop: 5,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  content: {
    flexDirection: "row",
    alignSelf: "flex-start",
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
  values: {
    color: "#cfcfcf",
    fontSize: 15,
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    textAlignVertical: "center",
    alignContent: "center",
    textAlignVertical: "center",
    marginHorizontal: 10,
  },
  description: {
    color: "#cfcfcf",
    fontSize: 15,
    fontSize: 15,
    flex: 1,
    flexDirection: "row",
    textAlign: "justify",
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 2,
  },

  reviews: {
    color: "#cfcfcf",
    fontSize: 15,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    textAlignVertical: "center",
    alignContent: "center",
  },

  button: {
    borderRadius: 30,
    width: "90%",
    marginVertical: 25,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    textAlignVertical: "center",
    alignContent: "center",
  },
  button2: {
    borderRadius: 30,
    marginBottom: 25,
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    textAlignVertical: "center",
    alignContent: "center",
  },

  previous: {
    color: "blue",
  },

  mod: {
    backgroundColor: "#00000099",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MovieScreen;
