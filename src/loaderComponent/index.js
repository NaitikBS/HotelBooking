import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loader = ({ isVisible }) => {
    return isVisible && (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', opacity: 0.7, position: 'absolute', backgroundColor: 'white', height: '120%', width: '120%', zIndex: 1 }}>
            <ActivityIndicator size="large" color="blue" />
        </View>
    )
}

export default Loader

const styles = StyleSheet.create({})