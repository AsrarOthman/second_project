import React, { useState, useEffect, Image } from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import places from "../assets/Components/data/Place";

function Attendance(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState("");
  const [pic, setPic] = useState("");
  const [verify, setVerify] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    alert(`Successful Scan`);
    console.log(data);
    places.splice(5, 1, { logout: "out" });
    console.log(places[5].logout);

    for (let i = 2; i <= 5; i++) {
      if (data === places[i].id) {
        setData(places[i].place);
        setVerify(true);
        places.splice(0, 1, { verifyplace: i });
        break;
      }
      if (i === 5) {
        setData("! Please Scan The Correct QR Code !");
        setVerify(false);
      }
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    // Master container
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
      }}
    >
      {/* Header Text */}
      <Text
        style={{
          textAlign: "center",
          color: "blue",
          fontWeight: "bold",
          paddingTop: 20,
          paddingBottom: 20,
          fontSize: 18,
        }}
      >
        Scan The Attendance QR Code
      </Text>
      {/* <LocationVerification /> */}
      {/* QR Code scan camera % try again */}
      <View style={{ height: "40%", width: "80%" }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ flex: 1 }}
        />

        {scanned && (
          <TouchableOpacity
            style={{
              backgroundColor: "#4286f4",
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 5,
              marginTop: 10,
            }}
            onPress={() => {
              setScanned(false);
              setVerify(false);
              setData("");
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#FFFFFF",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Scan Again
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {/* Intruction */}
      <Text
        style={{
          textAlign: "center",
          color: "blue",
          fontWeight: "bold",
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        Make sure you're in the right place
      </Text>
      <Text
        style={{
          textAlign: "center",
          color: "black",
          fontSize: 18,
          fontWeight: "bold",
          padding: 20,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "black",
            fontSize: 18,
            fontWeight: "bold",
            padding: 20,
          }}
        >{`${data}`}</Text>
      </Text>
      {/* button to confirm the attendance */}
      {verify ? (
        <View
          style={{
            backgroundColor: "green",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            marginTop: 10,
          }}
        >
          <Button
            onPress={() => props.navigation.navigate("Verify")}
            title="Verify your location"
            color="white"
            accessibilityLabel="Verification"
          />
        </View>
      ) : null}
    </View>
  );
}

export default Attendance;
