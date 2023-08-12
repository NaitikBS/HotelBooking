import { Text, View, Alert, Platform, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { useDispatch, useSelector } from 'react-redux';
import styles from './style';
import { addTokenForUser } from '../../redux/profileslice';
import { Constants } from '../../common';
import { incomingOrder } from '../../redux/orderslice';

const Home = (props) => {

    const [deviceToken, setDeviceToken] = useState({});

    const dispatch = useDispatch()

    global.props = props
    global.dispatch = dispatch

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, []);

    const backAction = () => {
        Alert.alert(Constants.APPNAME, "Are you sure you want to exit?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel",
            },
            { text: "YES", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
    };

    async function requestUserPermission() {
        const authorizationStatus = await messaging().requestPermission();
        if (authorizationStatus) {
            console.log('Permission status:', authorizationStatus);
        }
    }
    requestUserPermission();

    //************************************************* NOTIFICATION CODE STARTS FROM HERE *************************************************//

    async function registerAppWithFCM() {
        await messaging().registerDeviceForRemoteMessages();
        let fcm = messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        const jsonValue = JSON.stringify({ token: token, os: 'ios' })
        if (Platform.OS === 'ios') {
            const Payload = {
                isAndroidDevice: false,
                deviceToken: JSON.parse(jsonValue).token
            }
            dispatch(addTokenForUser(Payload))
        }
    }

    useEffect(() => {
        registerAppWithFCM();
    }, [])

    async function checkApplicationPermission() {
        const authorizationStatus = await messaging().requestPermission();
        if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
            console.log('User has notification permissions enabled.');
        } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
            console.log('User has provisional notification permissions.');
        } else {
            console.log('User has notification permissions disabled');
        }
    }
    checkApplicationPermission();
    PushNotification.configure({
        onRegister: function (token) {
            console.log('TOKEN:', token);
            const jsonValue = JSON.stringify({ token: token, os: 'android' })
            if (Platform.OS === 'android') {
                if (deviceToken && deviceToken.token != JSON.parse(jsonValue).token.token) {
                    setDeviceToken({ os: 'android', token: JSON.parse(jsonValue).token.token })
                    const Payload = {
                        isAndroidDevice: true,
                        deviceToken: JSON.parse(jsonValue).token.token
                    }
                    dispatch(addTokenForUser(Payload))
                }
            }
        },

        onNotification: function (notification) {
            console.log('NOTIFICATION:----------------->', notification);
            dispatch(incomingOrder({ props: props, notification: notification.foreground == true ? notification?.data?.data : notification?.data }))
            // // (required) Called when a remote is received or opened, or local notification is opened
            // notification.finish(PushNotificationIOS.FetchResult.NoData);
        },

        // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
        onAction: function (notification) {
            console.log('NOTIFICATION ACTION:', notification);
        },

        // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
        onRegistrationError: function (err) {
            console.error("remote notifications RegistrationError", err.message, err);
        },

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
            alert: true,
            badge: true,
            sound: true,
        },

        // Should the initial notification be popped automatically
        popInitialNotification: true,
        requestPermissions: true,
    });

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
            const last4Str = String(remoteMessage.sentTime).slice(-6); // 👉️ '6789'
            const last4Num = Number(last4Str); // 👉️ 6789
            let array = [];
            let num = last4Num
            array.push(num.toString());

            //THIS CODE IS SPECIFIC FOR CLEAR REMOTE NOTIFICATION IN 30 minutes
            setTimeout(() => {
                PushNotification.removeDeliveredNotifications(Platform.OS == "android" ? array : [remoteMessage.messageId])
            }, 1800000);
        });
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Message handled in the background!', remoteMessage);
            const last6Str = String(remoteMessage.sentTime).slice(-6); // 👉️ '6789'
            const last6Num = Number(last6Str); // 👉️ 6789
            let array = [];
            let num = last6Num
            array.push(num.toString());

            //THIS CODE IS SPECIFIC FOR CLEAR REMOTE NOTIFICATION IN 30 minutres  
            setTimeout(() => {
                PushNotification.removeDeliveredNotifications(Platform.OS == "android" ? array : [remoteMessage.messageId])
            }, 1800000);
        });
        return unsubscribe;
    }, []);

    //************************************************* NOTIFICATION CODE ENEDS HERE *************************************************//

    return (
        <View>
            <Text style={styles.NameText}>Home Screen</Text>
        </View>
    )
}

export default Home