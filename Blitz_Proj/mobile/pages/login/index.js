import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, ToastAndroid, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import md5 from 'md5';

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [imagem, setImagem] = useState(require('../../assets/app/avatar.png'));

    const [cadastrando, setCadastrando] = useState(false);

    useEffect(async () => {
        if(await AsyncStorage.getItem('userdata') !== null) {
            navigation.navigate('Main');
        }
    }, [])

    const autenticar = () => {
        let usuario = {
            email: email,
            senha: md5(senha),
        }

        fetch('http://192.168.0.108:3000/login', {
            "method": "POST",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(usuario),
        })
        .then(resp => { return resp.json() })
        .then(async data => {
            if(data.length > 0) {
                await AsyncStorage.setItem('userdata', JSON.stringify(data[0]));
                navigation.navigate('Main');
            }else {
                ToastAndroid.show('Email ou Senha Invalidos', ToastAndroid.SHORT);
            }
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
        }else if(!result.cancelled) {
            ToastAndroid.show('Selecione uma imagem menor', ToastAndroid.SHORT);
        }
    }

    const habilitarCadastro = () => {
        setCadastrando(true);
    }

    const cadastrar = () => {
        let usuario = {
            email: email,
            senha: md5(senha),
            foto: (imagem.uri !== undefined) ? imagem.uri : '',
        }

        fetch('http://192.168.0.108:3000/usuario', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type":"application/json"
            },
            body: JSON.stringify(usuario),
        })
        .then(resp => { return resp.json(); })
        .then(async data => {
            if(data.id === undefined) {
                ToastAndroid.show('Falha ao cadastrar', ToastAndroid.SHORT);
                setCadastrando(false);
            } else {
                await AsyncStorage.setItem('userdata', JSON.stringify(data));
                navigation.navigate('Main');
            }
        });
    }

    return(
        <View>
            <Image source={imagem} style={{width: 128, height: 128}} />
            
            <TextInput
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                value={senha}
                onChangeText={setSenha}
            />

            { 
                (cadastrando) ?
                    <TouchableOpacity onPress={() => { selecionarImagem() }}>
                        <Image source={require('../../assets/app/camera.png')} style={{width: 32, height: 32}} />
                    </TouchableOpacity>
                :  
                    <TouchableOpacity onPress={() => { habilitarCadastro() }}>
                        <Text>Cadastrar-se</Text>
                    </TouchableOpacity>
            }

            <TouchableOpacity onPress={() => { if(!cadastrando) autenticar(); else cadastrar(); }}>
                <Text>{(cadastrando) ? "Cadastrar" : "Login"}</Text>
            </TouchableOpacity>
        </View>
    )
}