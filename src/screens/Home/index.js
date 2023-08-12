import { Alert, FlatList, Image, Modal, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import DatePicker from 'react-native-date-picker'
import { useFocusEffect } from '@react-navigation/native'
import styles from './style'
import Loader from '../../loaderComponent'
import API_URL from '../../common'

const HomeScreen = (props) => {
    const [rooms, setRooms] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(0);
    const [open, setOpen] = useState(false);
    const [dateFrom, setDateFrom] = useState(new Date());
    const [dateTo, setDateTo] = useState(new Date());
    const [isDateFrom, setIsDateFrom] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    let config = {
        headers: {
            'Authorization': 'Bearer ' + global.token
        }
    }

    useFocusEffect(
        useCallback(() => {
            axios.get(`${API_URL}rooms`, config)
                .then(res => {
                    const data = res.data;
                    setRooms(data);
                }).catch(err => {
                    console.log("error", err)
                })
        }, [])
    )

    const onBook = () => {
        setIsLoading(true);
        axios.post(`${API_URL}booking`,
            {
                room_Id: rooms[selectedRoom]._id,
                from: dateFrom.toISOString(),
                to: dateTo.toISOString()
            },
            config)
            .then(res => {
                setIsModalVisible(false)
                setTimeout(() => {
                    setIsLoading(false)
                    props.navigation.navigate('bokings')
                }, 500);
            })
            .catch((err) => {
                setIsLoading(false)
                setIsModalVisible(false)
                Alert.alert("Hotel Booking", err.response.data.message)
            })
    }

    const getTotalPrice = () => {
        var date1 = moment(moment(dateFrom).format('YYYY-MM-DD'));
        var date2 = moment(moment(dateTo).format('YYYY-MM-DD'));
        var days = date2.diff(date1, 'days')
        return days * rooms[selectedRoom]?.price
    }

    const renderRoomItem = (item, index) => {
        return (
            <View style={{ ...styles.roomContainer, opacity: isModalVisible ? 0.3 : 1 }}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.roomName}>{item.name}</Text>
                    <Text style={styles.roomPrice}>Price: ${item.price}</Text>
                    <Text style={styles.roomStatus}>Status: {item.status ? 'Active' : 'Not Active'}</Text>
                </View>
                <View style={{ justifyContent: 'flex-end' }}>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        setIsModalVisible(true)
                        setSelectedRoom(index)
                    }}>
                        <Text style={{ color: 'white' }}>Book Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Loader isVisible={isLoading} />
            <FlatList
                data={rooms}
                keyExtractor={(_, index) => index.toString()}
                ListEmptyComponent={() => {
                    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>No data found</Text></View>
                }}
                renderItem={({ item, index }) => renderRoomItem(item, index)}
            />
            <DatePicker
                modal
                open={open}
                date={isDateFrom ? dateFrom : dateTo}
                minimumDate={!isDateFrom ? dateFrom : new Date()}
                mode={"date"}
                androidVariant={"iosClone"}
                onConfirm={(date) => {
                    if (isDateFrom) {
                        setDateFrom(date)
                    } else {
                        setDateTo(date)
                    }
                    setOpen(false)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
            <Modal
                visible={isModalVisible}
                animationType='slide'
                transparent={true}>
                <View style={styles.modalView}>
                    <View style={styles.shadow}>
                        <TouchableOpacity style={styles.closeBtn} onPress={() => {
                            setIsModalVisible(false)
                        }}>
                            <Image
                                style={{ height: 25, width: 25, tintColor: 'maroon' }}
                                source={require('../../assets/close.png')}
                            />
                        </TouchableOpacity>
                        <Text style={styles.modalHeader}>Room: {rooms[selectedRoom]?.name}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.date} onPress={() => {
                                setIsDateFrom(true)
                                setOpen(true)
                            }}>
                                <Text>{moment(dateFrom).format('L')}</Text>
                            </TouchableOpacity>
                            <View style={{ alignSelf: 'center' }}>
                                <Text>     To     </Text>
                            </View>
                            <TouchableOpacity style={styles.date} onPress={() => {
                                setIsDateFrom(false)
                                setOpen(true)
                            }}>
                                <Text>{moment(dateTo).format('l')}</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ ...styles.roomPrice, marginTop: 20 }}>Price Per Day : ${rooms[selectedRoom]?.price} </Text>
                        <Text style={{ ...styles.roomPrice, marginTop: 20 }}>Total Price: ${getTotalPrice()}</Text>
                        <TouchableOpacity style={styles.submitBtn} onPress={() => {
                            onBook()
                        }}>
                            <Text style={{ color: 'white' }}>Book Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default HomeScreen
