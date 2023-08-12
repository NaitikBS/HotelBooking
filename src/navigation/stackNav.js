import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/Home'
import Login from '../screens/Login'
import Registration from '../screens/Registration'
import Bookings from '../screens/Bookings'
const Stack = createNativeStackNavigator()


export const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{}}>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Registration' component={Registration} />
        </Stack.Navigator>
    )
}

export const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{}}>
            <Stack.Screen name='Home' component={HomeScreen} />
        </Stack.Navigator>
    )
}

export const BookingStack = () => {
    return (
        <Stack.Navigator screenOptions={{}}>
            <Stack.Screen name='Bookings' component={Bookings} />
        </Stack.Navigator>
    )
}
