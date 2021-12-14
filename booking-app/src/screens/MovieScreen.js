import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Button, Divider } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, FlatList } from "react-native";
import { FontAwesome5 } from "react-native-vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import ReviewCard from "../components/ReviewCard";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { NavigationEvents } from "react-navigation";

//Inside navigation, we have the prop id.

const MovieScreen = ({ navigation }) => {
  const [movie, setMovie] = useState(null);
  const { custId, setCustId } = useContext(AuthContext);
  const [actor, setActor] = useState([]);
  const [direc, setDirec] = useState([]);
  const [review, setReview] = useState([]);
  const [showM, setShowM] = useState(false);
  const [disen, setDis] = useState(false);

  const getID = () => {
    return navigation.getParam("id");
  };

  const getReviews = async (id) => {
    try {
      const res3 = await axios.get("http://192.168.1.70:3000/review/", {
        params: { movID: id },
      });
      setReview(res3.data);
    } catch (err) {
      console.log(err);
    }
  };

  const actors = () => {
    return actor.map(function (actor, i) {
      return (
        <View key={i}>
          <Text style={styles.text}>
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
          <Text style={styles.text}>
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

      getReviews(id);

      if (
        parseInt(res.data.releaseDate.substring(0, 4)) < 2021 ||
        (parseInt(res.data.releaseDate.substring(0, 4)) == 2021 &&
          parseInt(res.data.releaseDate.substring(5, 7)) < 7)
      ) {
        setDis(true);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  if (!movie || !actor || !direc || !review) return null;

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <NavigationEvents onDidFocus={() => getReviews(getID())} />
      <View>
        <Text style={styles.title}>{movie.title}</Text>
      </View>

      <View style={styles.upperContainer}>
        <Modal
          visible={showM}
          transparent
          onRequestClose={() => setShowM(false)}
        >
          <TouchableOpacity onPress={() => setShowM(false)} style={styles.mod}>
            <Image
              source={{ uri: movie.poster }}
              style={{
                width: "85%",
                height: "60%",
                borderColor: "#1E1F21",
                borderWidth: 7,
              }}
            />
          </TouchableOpacity>
        </Modal>

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

        <Text style={styles.text}>{movie.descr}</Text>
      </View>

      <View style={styles.crewContainer}>
        <Text style={styles.description}>Cast</Text>
        <ScrollView style={styles.crewListContainer}>
          <Text style={styles.text}>{actors()}</Text>
        </ScrollView>
      </View>

      <Divider orientation="horizontal" style={styles.divider} />

      <View style={styles.crewContainer}>
        <Text style={styles.description}>Director</Text>
        <ScrollView style={styles.crewListContainer}>
          <Text style={styles.text}>{directors()}</Text>
        </ScrollView>
      </View>

      <Divider orientation="horizontal" style={styles.divider} />

      <Button
        title={"Book Now"}
        disabled={disen}
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
          <Text style={styles.text}>{movie.rating} / 10</Text>
        </View>

        <View style={styles.container5}>
          <Icon
            name="clock-o"
            color="#FFFFFF"
            size={25}
            style={{ marginTop: 1, marginRight: 3 }}
          />
          <Text style={styles.description}> Runtime </Text>
          <Text style={styles.text}>{movie.movieLength} mins</Text>
        </View>
      </View>

      <View style={styles.reviewsContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 10,
            paddingHorizontal: 20,
            flex: 1,
          }}
        >
          <Text style={styles.description}>Reviews</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Review", { movieId: getID() });
            }}
          >
            <FontAwesome5
              size={20}
              name={"plus"}
              style={{
                color: "#cfcfcf",
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ justifyContent: "center", flex: 10 }}>
          {review.length == 0 ? (
            <Text style={{ color: "#cfcfcf", alignSelf: "center" }}>
              No reviews yet. Be the first to add one!
            </Text>
          ) : (
            <FlatList
              horizontal={true}
              keyExtractor={(item) => item.review.movRevID}
              data={review}
              renderItem={({ item }) => {
                return <ReviewCard rev={item} />;
              }}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "#cfcfcf",
    fontSize: 35,
    flex: 1,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 5,
  },
  container: {
    backgroundColor: "#303337",
    paddingHorizontal: 10,
  },
  upperContainer: {
    marginBottom: 5,
    backgroundColor: "#1E1F21",
    borderRadius: 10,
    flexDirection: "row",
  },
  crewListContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  crewContainer: {
    marginTop: 5,
    flexDirection: "column",
  },
  container4: {
    justifyContent: "space-around",
    flexDirection: "row",
    paddingVertical: 10,
    backgroundColor: "#1E1F21",
    borderRadius: 10,
  },
  container5: {
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  mod: {
    backgroundColor: "#00000099",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  reviewsContainer: {
    backgroundColor: "#1E1F21",
    borderRadius: 10,
    marginVertical: 15,
    height: 220,
  },
  text: {
    color: "#cfcfcf",
    fontSize: 15,
    alignSelf: "center",
    flex: 1,
    marginHorizontal: 10,
  },
  description: {
    color: "#cfcfcf",
    fontSize: 15,
    fontWeight: "bold",
  },

  button: {
    borderRadius: 30,
    width: "90%",
    marginVertical: 15,
    alignSelf: "center",
  },

  divider: {
    marginHorizontal: 5,
    marginVertical: 5,
    borderWidth: 0.1,
  },
});

export default MovieScreen;
