import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView, FlatList } from "react-native";
import { Image } from "expo-image";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import Constants from "expo-constants";
import * as dayjs from "dayjs";
import { LinearGradient } from 'expo-linear-gradient';


const weatherIcon = require("./assets/clear_sky.svg");

const Item = ({ time }) => {
  const date = dayjs(new Date(time.item.time));
  return (
    <View style={styles.item}>
      <Text>{date.format("DD MMMM, HH:mm")}</Text>
      <Text>
        {"Temp: " + time?.item.data?.instant?.details?.air_temperature + " °C"}
      </Text>
    </View>
  );
};

export default function App() {
  const api_url = Constants.expoConfig.extra.GEOAPIFY_API_KEY;

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [currentPlace, setCurrentPlace] = useState(null);

  useEffect(() => {
    (async () => {
      if (location) {
        const res = await fetch(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${location.coords.latitude}&lon=${location.coords.longitude}&apiKey=${api_url}`
        );
        const data = await res.json();
        setCurrentPlace(data);
      }
    })();
  }, [location]);

  useEffect(() => {
    (async () => {
      if (location) {
        const res = await fetch(
          `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${location.coords.latitude}&lon=${location.coords.longitude}`
        );

        const data = await res.json();
        setWeatherData(data);
      }
    })();
  }, [location]);

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
  } else if (weatherData) {
    text = JSON.stringify(weatherData);
  }
  console.log(currentPlace);
  //variables
  const city =
    currentPlace?.features[0]?.properties?.city ||
    currentPlace?.features[0]?.properties?.county;
  const country = currentPlace?.features[0]?.properties?.country;
  const temperature =
    weatherData?.properties.timeseries[0].data.instant.details.air_temperature;
  const humidityVal =
    weatherData?.properties.timeseries[0].data.instant.details
      .relative_humidity;
  const windSpeedVal =
    weatherData?.properties.timeseries[0].data.instant.details.wind_speed;
  const precipitationAmount =
    weatherData?.properties.timeseries[0].data.next_6_hours.details
      .precipitation_amount;
  const pressureVal =
    weatherData?.properties.timeseries[0].data.instant.details
      .air_pressure_at_sea_level;
  return (
    <View style={styles.container}>

      <LinearGradient
        colors={["rgba(48,184,255,1.8)", "transparent"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: -600,
          height: 1500,   
          transform: [{ rotate: "45" }],
        }}
      />

      <View style={styles.imageContainer}>
        <Text style={styles.cityTxt}>{city}</Text>
        <Text style={styles.countryTxt}>{country}</Text>
        <Image source={weatherIcon} style={styles.image} />
        <Text style={styles.tempTxt}>{temperature + " °C"}</Text>
      </View>

      <View style={styles.infoBox}>
        <View style={styles.secondaryInf}>
          <Text style={styles.secondaryTxt}>Humidity</Text>
          <Text style={styles.secondaryTxt}>{humidityVal + " %"}</Text>
          <Text style={styles.secondaryTxt}></Text>
          <Text style={styles.secondaryTxt}>Wind</Text>
          <Text style={styles.secondaryTxt}>{windSpeedVal + " m/s"}</Text>
        </View>

        <View style={styles.secondaryInf}>
          <Text style={styles.secondaryTxt}>Precipitation</Text>
          <Text style={styles.secondaryTxt}>{precipitationAmount + " mm"}</Text>
          <Text style={styles.secondaryTxt}></Text>
          <Text style={styles.secondaryTxt}>Pressure</Text>
          <Text style={styles.secondaryTxt}>{pressureVal + " hPa"}</Text>
        </View>
      </View>

      <SafeAreaView style={styles.listView}>
        {weatherData?.properties?.timeseries?.length ? (
          <FlatList
            horizontal
            data={weatherData.properties?.timeseries}
            renderItem={(time) => <Item time={time} />}
            keyExtractor={(time) => time.time}
          />
        ) : null}
      </SafeAreaView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex:1,
    width: "100%",
    backgroundColor: "#C7E1FF",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    //flex: 1,
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 1,
  },
  tempTxt: {
    fontSize: 50,
    marginBottom: 45,
    marginTop: 45,
  },
  cityTxt: {
    fontSize: 45,
    paddingTop: 15,
  },
  countryTxt: {
    fontSize: 15,
    marginBottom: 25,
    paddingTop: 10,
  },
  infoBox: {
    // flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryInf: {
    // flex: 4,
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 45,
  },
  secondaryTxt: {
    fontSize: 20,
    marginBottom: 10,
    // whiteSpace: "nowrap",
  },
  mainTxt: {},
  listView: {
    // flex: 1,
    marginTop: StatusBar.currentHeight+25 || 0,
    maxHeight: 300,
    maxWidth: 780,
  },
  item: {
    backgroundColor: "#7BB4F5",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 38,       
    textAlign: "center", 
  },
});
