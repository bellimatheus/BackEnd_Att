import React, {useState} from 'react';

import {View, Dimensions, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';

export default function Home(){
    const [coord, setCoord] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
    });


    return(
        <View style={styles.container}>
            <MapView style={styles.map} 
            region = {{
                ...coord, // latitude; coord.latitude ----- longitude: coord.longitude
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });