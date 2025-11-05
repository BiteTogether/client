import { Text, View, StyleSheet } from "react-native"
import { FONTS } from "../../../utils/constants"
export const ReceivedMessageTextItem = ({
    messageText
} : { messageText: string }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.receivedMessageText}>{messageText}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
        borderRadius: 20,
        margin: 8,
        maxWidth: '70%',
        maxHeight: "100%",
        padding: 12,
        backgroundColor: "#EBEBEB",
    },
    receivedMessageText: {
        color: '#000000',
        fontSize: FONTS.SIZES.MEDIUM,
        lineHeight: 20,
    },
})
