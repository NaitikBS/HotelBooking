import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import styles from './styles'
import Loader from '../../loaderComponent'
import API_URL from '../../common'

const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isVisible, setIsVisible] = useState(false)

    const handleLogin = () => {
        let payload = {
            email: email.toLowerCase(),
            password: password
        }

        if (email === '') {
            Alert.alert("Hotel Booking", "Please Enter Email")
        } else if (password === "") {
            Alert.alert("Hotel Booking", "Please Enter Password")
        }
        else {
            setIsVisible(true)
            axios.post(`${API_URL}login`, payload)
                .then(res => {
                    global.token = res?.data?.token
                    if (res.status != '200') {
                        Alert.alert("Hotel Booking", res?.data?.message)
                    }
                    setTimeout(() => {
                        setIsVisible(false)
                        props.navigation.navigate('HomeNav')
                    }, 500);
                })
                .catch((err) => {
                    console.log("error", JSON.stringify(err))
                    setIsVisible(false)
                    return Alert.alert("Hotel Booking", err?.response?.data?.message)
                })
        }
    };

    return (
        <View style={styles.container}>
            <Loader isVisible={isVisible} />
            <Image source={require('../../assets/town-hall.png')} style={{ height: 100, width: 100 }} />
            <Text style={styles.title}>Hotel Booking</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ margin: 20 }} onPress={() => props.navigation.navigate('Registration')}>
                <Text>New User? Register now</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login

