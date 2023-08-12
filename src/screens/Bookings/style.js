const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoutContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        zIndex: 1
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        margin: 10,
        alignItems: 'center'
    },
    buttonRed: {
        backgroundColor: 'maroon',
        padding: 8,
        borderRadius: 5
    },
    roomContainer: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    roomName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    roomPrice: {
        marginTop: 5,
        color: 'green',
    },
    roomStatus: {
        marginTop: 5,
        color: 'gray',
    },
})

export default styles