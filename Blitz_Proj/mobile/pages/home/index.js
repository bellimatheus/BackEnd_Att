import React, {useEffect, useState} from 'react';

import * as Location from 'expo-location';
import {View, Dimensions, StyleSheet, ToastAndroid, Image, Modal, TouchableOpacity, Text} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import {Picker} from '@react-native-picker/picker';


export default function Home(){
  const tipos = [
    require('../../assets/app/1.png'),
    require('../../assets/app/1.png'),
    require('../../assets/app/1.png'),
    require('../../assets/app/1.png'),
    require('../../assets/app/1.png'),
    require('../../assets/app/1.png')
  ]

  const [alertas, setAlertas] = useState([])
  const [coordAl, setCoordAl] = useState("");
  const [showModal, setShowModal] = useState(false)
  const [valuePicker, setValuePicker] = useState();
  const [marcadores, setMarcadores] = useState([])
  const [coord, setCoord] = useState({
      latitude: 37.78825,
      longitude: -122.4324,
  });
  
    useEffect(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
          ToastAndroid.show('Localização negada', ToastAndroid.SHORT);
      }else {
          let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.BestForNavigation});

          console.log(location);
          setCoord({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });

          let posi = {
            coordenadas: location.coords.latitude +', '+ location.coords.longitude,
            alertum: { 
              id: "marker",
              tipo: "marker",
              descricao: "Minha localização",
            },
            image: require(`../../assets/app/localiz.png`)
          }

          let arr = [];
          arr.push(posi);
          setMarcadores(arr)
          carregarAlertas()
          listarAlertas()
      }
    }, []);

    const listarAlertas = () => {
      fetch('http://10.87.207.4/alerta')
      .then(resp => {return resp.json()})
      .then(data => {
        setAlertas(data);
      })
    }

    const carregarAlertas = () => {
      fetch("http://10.87.207.4:3000/local")
      .then(resp => {return resp.json()})
      .then(data => {
        let tempArr = marcadores;
        

        data.forEach(item => {
          item.image = tipos[item.alertum.id - 1]
          tempArr.push(item);
          
        })
        setMarcadores(tempArr)
      })
    }
    const cadastrarAlerta = () => {
      console.log(valuePicker)
    }

    const algumaAcao = (e) => {
      
      let coord = (e.nativeEvent.coordinate.latitude+ ', ' +e.nativeEvent.coordinate.longitude)
      setCoordAl(coord);
      setShowModal(true)
    }


    return(
        <View style={styles.container}>
            <MapView 
              style={styles.map} 
              region = {{
                  ...coord, // latitude; coord.latitude ----- longitude: coord.longitude
                  latitudeDelta: 0.0065,
                  longitudeDelta: 0.0065,
                }}
                onPress={algumaAcao}
              >
                {
                    marcadores.map((marcador, index) => {
                        let loc = marcador.coordenadas.split(',');
                        
                        return(
                            <Marker
                            
                                key={index}
                                coordinate={{
                                    latitude: Number(loc[0]),
                                    longitude: Number(loc[1]),
                                }}
                                title={marcador.alertum.tipo}
                                description={""}
                            >
                                <Image source={marcador.image} style={styles.marcador} />
                                
                            </Marker>
                        )
                    })
                } 

            </MapView>
            <Modal
              visible={showModal}
            >
              <Picker
                selectedValue={valuePicker}
                onValueChange={(itemValue, itemIndex) =>
                  setValuePicker(itemValue)
                }
            >
                {
                  alertas.map((alerta, index) => {
                    
                    return(
                      <Picker.Item label={alerta.tipo} value={alerta.id} key={index}/>
                    )
                  })
                }

              </Picker>
              <TouchableOpacity onPress={() => {cadastrarAlerta()}}>
                <Text>Cadastrar alerta</Text>
              </TouchableOpacity>
            </Modal>
            
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
    marcador: {
      width: 32, 
      height: 32,
    }
  });