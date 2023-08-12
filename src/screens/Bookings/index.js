import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { useFocusEffect } from '@react-navigation/native'
import styles from './style'
import Loader from '../../loaderComponent'
import API_URL from '../../common'

const Bookings = (props) => {

    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    let config = {
        headers: {
            'Authorization': 'Bearer ' + global.token
        }
    }

    useFocusEffect(
        useCallback(() => {
            axios.get(`${API_URL}booking`, config)
                .then(res => {
                    const data = res.data;
                    setRooms(data);
                }).catch(err => {
                    console.log("error", err)
                })
        }, [])
    )

    const renderRoomItem = (item, index) => {
        return (
            <View style={styles.roomContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.roomName}>{item.room_Id?.name}</Text>
                    <Text style={styles.roomPrice}>Price: ${item?.price}</Text>
                    <Text style={styles.roomStatus}>{moment(item.from).format('L')} To {moment(item.to).format('L')}</Text>
                </View>
                <View style={{ justifyContent: 'flex-end' }}>
                    <TouchableOpacity style={styles.buttonRed} onPress={() => {
                        Alert.alert("Hotel Booking", "Are you sure you want to cancel this booking?", [
                            {
                                text: 'OK',
                                onPress: () => {
                                    setIsLoading(true);
                                    let newArr = rooms.filter((e, eleIndex) => eleIndex != index)
                                    setTimeout(() => {
                                        setIsLoading(false)
                                        setRooms(newArr)
                                    }, 300)
                                }
                            },
                            {
                                text: 'Cancel',
                                style: 'cancel'
                            }
                        ])
                    }}>
                        <Text style={{ color: 'white' }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <>
            <Loader isVisible={isLoading} />
            <View style={styles.container}>
                <View style={styles.logoutContainer}>
                    <TouchableOpacity style={{ ...styles.button, backgroundColor: 'red' }}
                        onPress={() => {
                            setIsLoading(true);
                            setTimeout(() => {
                                setIsLoading(false)
                                props.navigation.navigate('Auth')
                            }, 300)
                        }
                        }>
                        <Text style={{ color: 'white' }}>Logout</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, padding: 20 }}>
                    <FlatList
                        data={rooms}
                        keyExtractor={(_, index) => index.toString()}
                        ListEmptyComponent={() => {
                            return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text>No data found</Text>
                            </View>
                        }}
                        renderItem={({ item, index }) => renderRoomItem(item, index)}
                    />
                </View>
            </View>
        </>
    )
}

export default Bookings