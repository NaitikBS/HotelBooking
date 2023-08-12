import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    button: { backgroundColor: 'blue', padding: 8, borderRadius: 5 },
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
    modalView: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 22,
    },
    shadow: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    closeBtn: {
        position: 'absolute',
        padding: 8,
        borderRadius: 5,
        marginTop: 20,
        right: 20
    },
    modalHeader: {
        fontSize: 18,
        fontWeight: '500',
        padding: 20
    },
    date: {
        borderWidth: 1,
        borderColor: 'black',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    submitBtn: {
        backgroundColor: 'blue',
        padding: 8,
        borderRadius: 5,
        marginTop: 20
    }
})

export default styles