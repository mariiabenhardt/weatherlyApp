import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';

const weatherIcon = require('./assets/clear_sky.svg')

export default function App() {
  return (
    <View style={styles.container}>


      <View style={styles.imageContainer}>
       <Text>Your City</Text>
       <Text>Yout Country</Text>
        <Image source={weatherIcon} style={styles.image} />
        <Text>Temperature</Text>
      </View>

       <View
        style={styles.secondaryInf}>
         <Text style={styles.secondaryTxt}>Humidity</Text>
         <Text style={styles.secondaryTxt}>Wind</Text>
      </View>

      <View
        style={styles.secondaryInf}>
        <Text style={styles.secondaryTxt}>Sight distance</Text>
        <Text style={styles.secondaryTxt}>Pressure</Text>
      </View>

    

    <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: 'C7E1FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 0,
    paddingTop: 100,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 1,
  },
  secondaryInf: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  secondaryTxt: {
    marginRight: 50,
    marginLeft: 50,
    fontSize: 20,
  }
});


