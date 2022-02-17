import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, ToastAndroid, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import md5 from 'md5';


export default function Usuario() {
    const [senha, setSenha] = useState("");
    const [imagem, setImagem] = useState(require('../../assets/app/avatar.png'));

    const atualizar = async () => {
        let idUser = JSON.parse(await AsyncStorage.getItem('userdata'));

        let dados = {
            senha: md5(senha),
            foto: (imagem.uri !== undefined) ? imagem.uri : '',
        }


        await fetch('http://192.168.0.108:3000/usuario/' + idUser.id, {
            method: 'PUT',
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(dados),

        })
            .then(resp => { return resp.json(); })
            .then(data => {
                ToastAndroid.show('Atualizado com sucesso', ToastAndroid.SHORT);
            })
    }

    const selecionarImagem = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        if (!result.cancelled && result.base64.length < 59500) {
            setImagem({
                uri: 'data:image/jpeg;base64,' + result.base64,
            })
        } else if (!result.cancelled) {
            ToastAndroid.show('Selecione uma imagem menor', ToastAndroid.SHORT);
        }
    }


    return (
        <View>
            <Image source={imagem} style={{ width: 128, height: 128 }} />

            <TextInput
                value={senha}
                onChangeText={setSenha}
            />
            <TouchableOpacity onPress={() => { selecionarImagem() }}>
                <Image source={require('../../assets/app/camera.png')} style={{ width: 32, height: 32 }} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { atualizar() }}>
                <Text>Atualizar</Text>
            </TouchableOpacity>

        </View>
    )
}