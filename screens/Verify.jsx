import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import LocationVerification from "../assets/Components/LocationVerification";
import places from "../assets/Components/data/Place";
function VerifyScreen(props) {
  const [logout, setLogout] = useState("");
  console.log(LocationVerification());

  function Out() {
    const now = new Date();
    places.splice(6, 1, { timeIN: now });
    console.log(places[6].timeIN);
    onPressFunction = () => {
      const now = new Date();
      places.splice(7, 1, { timeOUT: now });
      console.log(places[7].timeOUT);
      props.navigation.navigate("Home");
    };
    return (
      <View
        style={{
          backgroundColor: "#4286f4",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
          marginTop: 10,
        }}
      >
        <Button
          onPress={onPressFunction}
          title="LogOut"
          color="white"
          accessibilityLabel="LogOut"
        />
      </View>
    );
  }
  function TryAgain() {
    return (
      <View
        style={{
          backgroundColor: "red",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
          marginTop: 10,
        }}
      >
        <Button
          onPress={() => props.navigation.navigate("Attendance")}
          title="Try Again"
          color="white"
          accessibilityLabel="Attendance"
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "start",
        alignItems: "center",
        paddingTop: 100,
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          color: "green",
          fontSize: 24,
          paddingBottom: 20,
        }}
      >
        Verify Your Location
      </Text>
      <Text>Please wait</Text>
      <LocationVerification />
      {places[5].logout == "out1" ? <>{Out()}</> : null}
      {places[5].logout == "out2" ? <>{TryAgain()}</> : null}
    </View>
  );
}

export default VerifyScreen;
