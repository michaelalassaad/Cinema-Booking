import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
} from "react-native";
import { NavigationEvents } from "react-navigation";
import { Button, ButtonGroup, Overlay, Divider } from "react-native-elements";
import SelectDropdown from "react-native-select-dropdown";
import { Picker } from "@react-native-picker/picker"; 
import AuthContext from "../context/AuthContext";
import FoodItem from "../components/FoodItem";
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

  const branches = ["Byblos", "Beirut", "Zahle"]; //see if you can automate fetching the branches
  const dates = ["2021-12-15", "2021-12-16", "2021-12-17"]; //see if you can automate fetching the dates
  const state = [];
  for (i = 0; i < foodList.length; i++) {
    state.push(useState(0));
  }
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(
    () => {
      var a = 0;
      for (i = 0; i < state.length; i++) {
        a += state[i][0];
      }
      setTotalPrice(a);
    },
    state.map((item) => item[0])
  );
  useEffect(async () => {
    setSelectedTime(null);
    setFreeSeats(null);
    setDisplaySeats(false);
    if (selectedBranch >= 0 && selectedDate >= 0) {
      try {
        const res1 = await axios.get("http://192.168.0.100:3000/getTimings", {
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
      const res2 = await axios.get("http://192.168.0.100:3000/getFreeSeats", {
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
              }
              }
              buttonStyle={{ backgroundColor: "#cfcfc0" }}
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
              }
              }
              buttonStyle={{ backgroundColor: "#cfcfc0" }}
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
                  buttonStyle={{ backgroundColor: "#cfcfc0" }}
                  selectedButtonStyle={{ backgroundColor: "blue" }}
                  selectedIndex={selectedTime}
                />
              </View>
            ) : (
              <Text style={styles.warning}>No screenings {dates[selectedDate] ? `found on ${dates[selectedDate]}` : "found"}
                {branches[selectedBranch] ? ` in ${branches[selectedBranch]}` : ""}</Text>
            )}

            {!selectedScreening ? (
              <Text style={styles.warning}>No screening is selected</Text>
            ) : (
              <View>
                <Text>Here lies the seats</Text>
                <Text style={styles.description}>Choose one of the following free seats:</Text>

                {displaySeats ? (
                  <SelectDropdown
                    data={freeSeats.map((element) => element.seatNumber)}
                    onSelect={(selectedItem, index) => {
                      setSelectedSeat(selectedItem);
                    }}
                    buttonStyle={{ width: 400, marginTop: 7, marginBottom: 35 }}
                  />
                ) : null}
              </View>
            )}

            <Text style={styles.description}>Want food ready when the movie starts? Choose below</Text>
          </View>}
        //Food Components
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

        //Below Food Components
        ListFooterComponent={
          <View>
            <Button
              title="Book"
              onPress={async () => {
                const res4 = await axios.post(
                  "http://192.168.0.100:3000/confirmBooking",
                  {
                    custID: custID,
                  }
                );
                setTicketID(res4.data);
                setOverlayVisible(true);
              }}
            />
            <Overlay isVisible={overlayVisible}>
              <Text>
                You have succesfully booked a ticket. Please arrive at the location at least 30
                mins before the start of the movie to pay for the ticket. Failure to
                do so will result in cancellation of the ticket. For reference: Ticket
                ID - {ticketID}
              </Text>
              <Button onPress={() => setOverlayVisible(false)} title="Proceed" />
            </Overlay>
          </View>
        }
      //End of Flatlist
      />
    </View>
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
  image: {
    flex: 1,
    justifyContent: "center",
    width: 210,
    height: 300,
    borderWidth: 4,
    borderColor: "#1E1F21",
    borderRadius: 10,
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
    textAlign: "center"
  },
});

export default BookingScreen;
