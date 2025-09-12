import { View, Text, StyleSheet } from "react-native"

import { MessageCurrentRecipientProps } from "../../types"
import { COLORS } from "../../utils/constants"

export const MessageCurrentRecipientContent = ({
    username,
    fullName
}: MessageCurrentRecipientProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.fullName}>{fullName}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
    },
    username: {
        fontWeight: "bold",
    },
    fullName: {
        color: COLORS.TEXT.LIGHT,
    }
})