import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button, ButtonGroup, Overlay } from "react-native-elements";
import AuthContext from "../context/AuthContext";
import { Picker } from "@react-native-picker/picker";
import FoodList from "../components/FoodList";
import axios from "axios";
import SelectDropdown from "react-native-select-dropdown";

const BookingScreen = ({ navigation }) => {
  const { custID, setCustID } = useContext(AuthContext);
  const [selectedBranch, setSelectedBranch] = useState(-1);
  const [selectedDate, setSelectedDate] = useState("2021-12-14");
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
  const foodList = navigation.getParam("foodList");

  const branches = ["Dbayeh", "Tripoli", "Beirut"]; //see if you can automate fetching the branches

  useEffect(async () => {
    setSelectedTime(null);
    setFreeSeats(null);
    setDisplaySeats(false);
    if (selectedBranch >= 0 && selectedDate) {
      try {
        const res1 = await axios.get("http://192.168.1.70:3000/getTimings", {
          params: {
            movieID: movieID,
            date: selectedDate,
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
    console.log(selectedScreening);
    if (selectedScreening) {
      const res2 = await axios.get("http://192.168.1.70:3000/getFreeSeats", {
        params: {
          screeningID: selectedScreening,
        },
      });

      setFreeSeats(res2.data);
      setDisplaySeats(true);
    }
  }, [selectedScreening]);

  return (
    <ScrollView>
      <Text>Booking {movieName}</Text>
      <Text>Choose a Branch</Text>
      <ButtonGroup
        buttons={["Dbayeh", "Tripoli", "Beirut"]}
        containerStyle={{ height: 100 }}
        onPress={(newIndex) => setSelectedBranch(newIndex)}
        buttonStyle={{ backgroundColor: "blue" }}
        selectedButtonStyle={{ backgroundColor: "grey" }}
        selectedIndex={selectedBranch}
      />

      <Text>Choose a Date</Text>
      <Picker
        selectedValue={selectedDate}
        onValueChange={(itemValue, itemIndex) => setSelectedDate(itemValue)}
      >
        <Picker.Item label="14/12/2021" value="2021-12-14" />
        <Picker.Item label="15/12/2021" value="2021-12-15" />
      </Picker>

      {showtimes.length >= 1 ? (
        <ButtonGroup
          buttons={showtimes.map((element) => element.screeningTime)}
          containerStyle={{ height: 100 }}
          onPress={(newIndex) => {
            setSelectedTime(newIndex);
            setSelectedScreening(showtimes[newIndex].screeningID);
          }}
          buttonStyle={{ backgroundColor: "blue" }}
          selectedButtonStyle={{ backgroundColor: "grey" }}
          selectedIndex={selectedTime}
        />
      ) : (
        <Text>No screenings on this date and branch</Text>
      )}

      {/*add a condition like the upper place*/}
      <Text>Choose one of the following free seats:</Text>

      {displaySeats ? (
        <SelectDropdown
          data={freeSeats.map((element) => element.seatID)}
          onSelect={(selectedItem, index) => {
            setSelectedSeat(selectedItem);
            console.log(selectedSeat);
          }}
          buttonStyle={{ width: 40 }}
        />
      ) : null}

      <Text>Want food ready when the movie starts? Choose below</Text>
      <FoodList foodList={foodList} />

      <Button
        title="Book"
        onPress={async () => {
          console.log(custID);
          const res4 = await axios.post(
            "http://192.168.1.70:3000/confirmBooking",
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
          You have succesfully booked a ticket. Please arrive at the location 30
          mins before the start of the movie to pay for the ticket. Failure to
          do so will result in cancellation of the ticket. For reference: Ticket
          ID {ticketID}
        </Text>
        <Button onPress={() => setOverlayVisible(false)} title="Proceed" />
      </Overlay>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default BookingScreen;
