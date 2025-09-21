import { View, Text, StyleSheet } from "react-native"

import { MessageItemProps } from "../../types"
import { COLORS } from "../../utils/constants"

export const MessageItemContent = ({
    fullName,
    latestMessage,
    receivedTime
}: MessageItemProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.fullName}>{fullName}</Text>
            <Text style={styles.message}>{latestMessage} • {receivedTime}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        
    },
    fullName: {
        fontWeight: "bold",
    },
    message: {
        color: COLORS.TEXT.LIGHT,
    },
})