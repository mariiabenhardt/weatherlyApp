import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';

const weatherIcon = require('./assets/clear_sky.svg')

export default function App() {

  let city = "Your city"
  let country = "Your country"
  let temperature = "0"
  let humidityVal = "0"
  let windSpeedVal  = "0"
  let sightDistVal  = "0"
  let pressureVal = "0"
  return (
    <View style={styles.container}>

          
        <View style={styles.imageContainer}>
          <Text style={styles.cityTxt}>{city}</Text>
          <Text style={styles.countryTxt}>{country}</Text>
          <Image source={weatherIcon} style={styles.image} />
          <Text style={styles.tempTxt}>{temperature + " °C"}</Text>
        </View>

      
        <View style={styles.infoBox}>
          <View
            style={styles.secondaryInf}>
            <Text style={styles.secondaryTxt}>Humidity</Text>
            <Text style={styles.secondaryTxt}>{humidityVal + " %"}</Text>
            <Text style={styles.secondaryTxt}>Wind</Text>
            <Text style={styles.secondaryTxt}>{windSpeedVal + " km/h"}</Text>
          </View>

          <View
            style={styles.secondaryInf}>
            <Text style={styles.secondaryTxt}>Sight distance</Text>
            <Text style={styles.secondaryTxt}>{sightDistVal + " km"}</Text>
            <Text style={styles.secondaryTxt}>Pressure</Text>
            <Text style={styles.secondaryTxt}>{pressureVal + " mm"}</Text>
          </View>
        </View>
    
      
    <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C7E1FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 1,
  },
  tempTxt: {
    fontSize: 50,
  },
  cityTxt: {
    fontSize: 40,
  },
  countryTxt: {
    fontSize: 15,
  },
  infoBox:{
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryInf: {
    flex: 4,
    flexDirection: 'column',
    alignItems: 'center',
    //marginHorizontal: 45
  },
  secondaryTxt: {
    fontSize: 20,
    marginBottom: 10,
  },
  mainTxt: {

  },
});


