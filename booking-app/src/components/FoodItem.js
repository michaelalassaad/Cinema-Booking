import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { CheckBox } from "react-native-elements";

const FoodItem = ({ foodName, unitPrice, totalPrice, setTotalPrice }) => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [qty, setQty] = useState(0);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setTotalPrice(0);
  }, [checked]);

  return (
    <View>
      <View style={styles.container}>
        <CheckBox
          onPress={() => setChecked(!checked)}
          checked={checked}
          title={foodName}
        />
        <SelectDropdown
          data={arr}
          onSelect={(selectedItem, index) => {
            setQty(selectedItem);
            setTotalPrice(selectedItem * unitPrice);
          }}
          buttonStyle={{ width: 40 }}
          disabled={!checked}
        />
        <Text>Price: {totalPrice}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default FoodItem;
