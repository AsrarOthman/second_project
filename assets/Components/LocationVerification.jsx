// import statements should be separated by commas, and Button is not being used
import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import * as Location from "expo-location";
import places from "../Components/data/Place";

function LocationVerification(props) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  // use state instead of let
  const locationNow = {
    lat: location?.coords?.latitude,
    long: location?.coords?.longitude,
  };

  useEffect(() => {
    let i = places[0].verifyplace;
    console.log(i);
    if (
      locationNow.lat > places[i].lat - places[1].degrees &&
      locationNow.lat < places[i].lat + places[1].degrees &&
      locationNow.long > places[i].long - places[1].degrees &&
      locationNow.long < places[i].long + places[1].degrees
    ) {
      places.splice(5, 1, { logout: "out1" });
      console.log(places[5].logout);
      console.log("betul");
    } else {
      places.splice(5, 1, { logout: "out2" });
      console.log(places[5].logout);
      console.log("salah");
    }

    console.log(places[1].degrees);
  }, [location]); // re-run this effect whenever location changes

  function verified() {
    return (
      <Text
        style={{
          fontWeight: "bold",
          color: "green",
          paddingTop: 20,
          fontSize: 20,
          textAlign: "center",
        }}
      >
        Your location has been successfully verified
      </Text>
      
      
    );
  }
  function notverified() {
    return (
      <Text style={{ fontWeight: "bold", color: "red", paddingTop: 20 }}>
        Your location is incorrect, please try again
      </Text>
    );
  }
  return (
    <View>
      <View>
        <Text style={{ textAlign: "center" }}>Latitude: {locationNow.lat}</Text>
        <Text style={{ textAlign: "center" }}>
          Longitude: {locationNow.long}
        </Text>
        {places[5].logout === "out1" ? <>{verified()}</> : null}
        {places[5].logout === "out2" ? <>{notverified()}</> : null}
      </View>
    </View>
  );
}

export default LocationVerification;
