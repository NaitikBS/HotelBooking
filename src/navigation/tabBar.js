import { Text, Platform, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BookingStack, HomeStack } from './stackNav';
const Tab = createBottomTabNavigator();

const TabBar = () => {
    return (
        <Tab.Navigator
            initialRouteName='home'
            screenOptions={{
                tabBarStyle: {
                    height: Platform.OS == "android" ? 70 : 90,
                    paddingTop: 5,
                },
                tabBarLabelStyle: {
                    fontSize: 12
                },
            }}
        >
            <Tab.Screen
                name='home'
                component={HomeStack}
                options={{
                    tabBarLabel: ({ focused }) => <Text style={{ color: focused ? 'blue' : 'black' }}>Home</Text>,
                    headerShown: false,
                    gestureEnabled: false,
                    tabBarIcon: ({ focused }) => <Image
                        style={{ height: 20, width: 20, tintColor: focused ? 'blue' : 'black' }}
                        source={require('../assets/home.png')}
                    />,
                }} />
            <Tab.Screen
                name='bokings'
                component={BookingStack}
                options={{
                    tabBarLabel: ({ focused }) => <Text style={{ color: focused ? 'blue' : 'black' }}>Bookings</Text>,
                    headerShown: false,
                    gestureEnabled: false,
                    tabBarIcon: ({ focused }) => <Image
                        style={{ height: 20, width: 20, tintColor: focused ? 'blue' : 'black' }}
                        source={require('../assets/book.png')}
                    />,
                }} />
        </Tab.Navigator>
    )
}

export default TabBar