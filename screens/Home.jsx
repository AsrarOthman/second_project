import {
  Button,
  RefreshControl,
  ScrollView,
  View,
  Text,
  Image,
} from "react-native";
import places from "../assets/Components/data/Place";
import React, { useState, useEffect } from "react";

function HomeScreen(props) {
  const [refresh, setRefresh] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    places.splice(6, 1, { timeIN: "datain" });
    places.splice(7, 1, { timeOUT: "dataout" });
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefresh((prevState) => !prevState);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  function logIn() {
    return (
      <View
        style={{
          backgroundColor: "#29c5f6",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
          marginTop: 10,
        }}
      >
        <Text style={{ fontWeight: "bold", textAlign: "center" }}>
          {"LogIn Time : " + `${places[6].timeIN}`}
        </Text>
      </View>
    );
  }

  function logOut() {
    return (
      <View
        style={{
          backgroundColor: "#ed2939",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
          marginTop: 10,
        }}
      >
        <Text style={{ fontWeight: "bold", textAlign: "center" }}>
          {"LogOut Time : " + `${places[7].timeOUT}`}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "start",
          paddingTop: 20,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "black",
            fontSize: 30,
            paddingBottom: 20,
          }}
        >
          eAttendance System
        </Text>
        <View>
          <Image
            source={require("../assets/image.png")}
            style={{ width: 400, height: 300 }}
          />
        </View>
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
            onPress={() => props.navigation.navigate("Attendance")}
            title="LogIn"
            color="white"
            accessibilityLabel="Configure your app settings"
          />
        </View>
        <View
          style={{
            backgroundColor: "white",
            height: 200,
            width: 300,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            marginTop: 10,
          }}
        >
          {places[6].timeIN !== "datain" && logIn()}
          {places[7].timeOUT !== "dataout" && logOut()}
        </View>
      </View>
    </ScrollView>
  );
}

export default HomeScreen;
