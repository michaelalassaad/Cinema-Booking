import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
} from "react-native";
import { Button, ButtonGroup, Overlay, Divider } from "react-native-elements";
import SelectDropdown from "react-native-select-dropdown";
import AuthContext from "../context/AuthContext";
import FoodItem from "../components/FoodItem";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";

const BookingScreen = ({ navigation }) => {
  const { custID, setCustID } = useContext(AuthContext);
  const [selectedBranch, setSelectedBranch] = useState(-1);
  const [selectedDate, setSelectedDate] = useState(-1);
  const [showtimes, setShowtimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedScreening, setSelectedScreening] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [freeSeats, setFreeSeats] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [ticketID, setTicketID] = useState(null);
  const [displaySeats, setDisplaySeats] = useState(false);

  const movieID = navigation.getParam("movieID");
  const movieName = navigation.getParam("movieName");
  const moviePoster = navigation.getParam("moviePoster");
  const foodList = navigation.getParam("foodList");

  const branches = ["Byblos", "Beirut", "Zahle"];
  const dates = ["2021-12-15", "2021-12-16", "2021-12-17"];
  const state = [];
  const qts = [];

  for (i = 0; i < foodList.length; i++) {
    state.push(useState(0));
  }

  for (i = 0; i < foodList.length; i++) {
    qts.push(useState({}));
  }

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(
    () => {
      var a = 0;
      for (i = 0; i < state.length; i++) {
        var key = foodList[i].foodID;
        console.log(state[i][0], key);

        qts[i][[foodList[i].foodID]] = state[i][0] / foodList[i].price;
        a += state[i][0];
      }
      setTotalPrice(a);
      console.log(qts);
    },
    state.map((item) => item[0])
  );
  useEffect(async () => {
    setSelectedTime(null);
    setFreeSeats(null);
    setDisplaySeats(false);
    if (selectedBranch >= 0 && selectedDate >= 0) {
      try { 
        const res1 = await axios.get("http://172.20.10.2:3000/getTimings", { 
          params: {
            movieID: movieID,
            date: dates[selectedDate],
            branch: branches[selectedBranch],
          },
        });
        setShowtimes(res1.data);
      } catch (err) {
        console.log(err);
      }
    }
  }, [selectedBranch, selectedDate]);

  useEffect(async () => {
    if (selectedScreening) { 
      const res2 = await axios.get("http://172.20.10.2:3000/getFreeSeats", { 
        params: {
          screeningID: selectedScreening,
        },
      });

      setFreeSeats(res2.data);
      setDisplaySeats(true);
    }
  }, [selectedScreening]);

  return (
    <View>
      <FlatList
        style={styles.container}
        //Above Food Component
        ListHeaderComponent={
          <View>
            <View style={{ flex: 3 }}>
              <View style={{ flex: 0.5 }}>
                <Text style={styles.title}>{movieName}</Text>
              </View>
              <View style={styles.smovie}>
                <Image source={{ uri: moviePoster }} style={styles.image} />
              </View>
            </View>

            <Text style={styles.description}>Choose a Branch</Text>
            <ButtonGroup
              buttons={["Byblos", "Beirut", "Zahle"]}
              containerStyle={{ height: 80 }}
              onPress={(newIndex) => {
                setSelectedBranch(newIndex);
                setSelectedScreening(null);
              }}
              buttonStyle={{ backgroundColor: "#cfcfcf" }}
              selectedButtonStyle={{ backgroundColor: "blue" }}
              selectedIndex={selectedBranch}
            />

            <Text style={styles.description}>Choose a Date</Text>

            <ButtonGroup
              buttons={["15/12/2021", "16/12/2021", "17/12/2021"]}
              containerStyle={{ height: 80 }}
              onPress={(newIndex) => {
                setSelectedDate(newIndex);
                setSelectedScreening(null);
              }}
              buttonStyle={{ backgroundColor: "#cfcfcf" }}
              selectedButtonStyle={{ backgroundColor: "blue" }}
              selectedIndex={selectedDate}
            />

            {showtimes.length >= 1 ? (
              <View>
                <Text style={styles.description}>Choose a Screening Time</Text>
                <ButtonGroup
                  buttons={showtimes.map((element) => element.screeningTime)}
                  containerStyle={{ height: 100 }}
                  onPress={(newIndex) => {
                    setSelectedTime(newIndex);
                    setSelectedScreening(showtimes[newIndex].screeningID);
                  }}
                  buttonStyle={{ backgroundColor: "#cfcfcf" }}
                  selectedButtonStyle={{ backgroundColor: "blue" }}
                  selectedIndex={selectedTime}
                />
              </View>
            ) : (
              <Text style={styles.warning}>
                No screenings{" "}
                {dates[selectedDate]
                  ? `found on ${dates[selectedDate]}`
                  : "found"}
                {branches[selectedBranch]
                  ? ` in ${branches[selectedBranch]}`
                  : ""}
              </Text>
            )}

            {!selectedScreening ? (
              <Text style={styles.warning}>No screening is selected</Text>
            ) : (
              <View>
                <Image
                  source={require("../../MovSeat.png")}
                  style={styles.image2}
                />

                <Text style={styles.description}>
                  Choose one of the following available seats:
                </Text>

                {displaySeats ? (
                  <SelectDropdown
                    data={freeSeats.map((element) => element.seatNumber)}
                    onSelect={(selectedItem, index) => {
                      setSelectedSeat(selectedItem);
                    }}
                    buttonStyle={{
                      width: 400,
                      marginTop: 7,
                      marginBottom: 35,
                      borderRadius: 5,
                      backgroundColor: "#cfcfcf",
                    }}
                  />
                ) : null}
              </View>
            )}

            <View
              style={{
                backgroundColor: "#1E1F21",
                flexDirection: "row",
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  color: "#cfcfcf",
                  fontSize: 17,
                  fontWeight: "bold",
                  marginTop: 25,
                  marginLeft: 5,
                  width: "80%",
                }}
              >
                Want food ready when the movie starts? Choose below
              </Text>
              <Icon name="fast-food-sharp" color="#cfcfcf" size={75} />
            </View>
            <ScrollView
              style={{
                backgroundColor: "#1E1F21",
                borderRadius: 10,
                height: 350,
              }}
            >
              <FlatList
                data={foodList}
                renderItem={(element) => {
                  const item = element.item;
                  const index = element.index;
                  return (
                    <FoodItem
                      foodName={item.foodName}
                      unitPrice={item.price}
                      totalPrice={state[index][0]}
                      setTotalPrice={state[index][1]}
                    />
                  );
                }}
                keyExtractor={(item) => item.foodName}
              />
            </ScrollView>
          </View>
        }
        //Food Components
        //Below Food Components
        ListFooterComponent={
          < View >
            <Button
              title="Book"
              buttonStyle={styles.button}
              ViewComponent={LinearGradient}
              linearGradientProps={{
                colors: ["#42f5ef", "#429cf5"],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 },
              }}
              onPress={async () => {
                const res4 = await axios.post(
                  "http://172.20.10.2:3000/confirmBooking",
                  {
                    custID: custID,
                    selectedSeat: selectedSeat,
                    ticketID: ticketID,
                    screeningID: selectedScreening,
                  }
                );

                console.log(qts);

                for (i = 0; i < qts.length; i++) {
                  for (const [key, value] of Object.entries(qts[i])) {
                    console.log(key, value);
                    await axios.post("http://172.20.10.2:3000/confirmFood", {
                      custID: custID,
                      foodID: key,
                      qty: value,
                    });
                  }
                }

                setTicketID(res4.data);
                setOverlayVisible(true);
              }}
            />
            <Overlay isVisible={overlayVisible}>
              <Text>
                You have succesfully booked a ticket. Please arrive at the
                location at least 30 mins before the start of the movie to pay
                for the ticket. Failure to do so will result in cancellation of
                the ticket. For reference: Ticket ID - {ticketID}
              </Text>
              <Button
                onPress={() => {
                  setOverlayVisible(false);
                  navigation.navigate("Home", {
                    showReview: true,
                  });
                }}
                title="Proceed"
              />
            </Overlay>
          </View >
        }
        //End of Flatlist
      />
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#303337",
  },
  smovie: {
    backgroundColor: "#303337",
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  title: {
    color: "#cfcfcf",
    fontSize: 35,
    flex: 1,
    alignSelf: "center",
    marginTop: 15,
  },
  button: {
    borderRadius: 30,
    width: "90%",
    marginVertical: 15,
    alignSelf: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: 210,
    height: 300,
    borderWidth: 4,
    borderColor: "#1E1F21",
    borderRadius: 10,
  },
  image2: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    width: 350,
    height: 275,
    borderRadius: 10,
    marginTop: 20,
  },
  description: {
    color: "#cfcfcf",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 15,
    marginLeft: 15,
  },
  warning: {
    color: "#7A0B16",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 15,
    marginHorizontal: 15,
    alignSelf: "center",
    textAlign: "center",
  },
});

export default BookingScreen;
