import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react'
import axios from 'axios';
import styles from './style'
import API_URL from '../../common';

const Registration = (props) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        axios({
            method: 'post',
            url: `${API_URL}signup`,
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email.toLowerCase(),
                password: password
            }
        })
            .then(res => {
                Alert.alert("Hotel Booking", res?.data?.message)
                props.navigation.goBack()
            })
            .catch((err) => {
                Alert.alert("Hotel Booking", err.response.data.message)
            })
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput
                style={styles.input}

                placeholder="First Name"
                onChangeText={(text) => setFirstName(text)}
                value={firstName}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                onChangeText={(text) => setLastName(text)}
                value={lastName}
            />
            <TextInput
                style={styles.input}
                keyboardType='email-address'
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <TextInput
                style={styles.input}
                // keyboardType='visible-password'
                placeholder="Password"
                // secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Registration