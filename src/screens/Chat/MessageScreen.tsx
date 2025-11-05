import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { FAB, Icon, Input } from "@rneui/themed"

import { COLORS, CURRENT_RECIPIENT, FONTS } from "../../utils/constants"
import { MessageCurrentRecipientContent } from "./components/MessageCurrentRecipientContent"
import { MessageItem } from "./components/MessageItem"
import { ReceivedMessageTextItem } from "./components/ReceivedMessageTextItem"
import { useNavigation } from '@react-navigation/native';


const MessageScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon 
                        name="arrow-left" 
                        type="feather"
                        size={24} 
                        color="black" />
                </TouchableOpacity>

                <MessageItem
                    itemStyle={styles.item}
                    imageContent={CURRENT_RECIPIENT.imageUri}
                    // imageContentStyle={styles.avatar}
                    textContent={
                        <MessageCurrentRecipientContent
                            username={CURRENT_RECIPIENT.textContent.username}
                            fullName={CURRENT_RECIPIENT.textContent.fullName} />
                    } />
            </View>

            <View style={styles.messageSpace}>
                <MessageItem 
                    itemStyle={styles.sentMessageContainer}
                    textContent={<Text style={styles.sentMessageText}>Hello</Text>} />
                <MessageItem 
                    imageContent={CURRENT_RECIPIENT.imageUri}
                    // imageContentStyle={styles.avatar}
                    itemStyle={styles.receivedMessageContainer}
                    textContent={
                        <ReceivedMessageTextItem
                            messageText="Hi there!" />} />
            </View>

            <View style={styles.footer}>
                <FAB
                    icon={{ 
                        name : "add", 
                        color : "#6C757D" }}
                    size="small"
                    color="#EBEBEB" />
                <Input 
                    placeholder="Type a message..."
                    placeholderTextColor="#6C757D"
                    rightIcon={{
                        name: "send",
                        type: "feather",
                        color: "#000000",
                        size: 24,
                    }}
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={styles.inputStyle}
                    containerStyle={styles.inputWrapperStyle} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: COLORS.BACKGROUND,
    },
    header: {
        width: "100%",
        height: "12%",
        paddingTop: 35,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: 20,
        backgroundColor: "#FAFAFA",
        gap: 20,
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    // avatar: {
    //     rounded: true,
    // },
    messageSpace: {
        width: "100%",
        height: "78%",
    },
    sentMessageContainer: {
        alignSelf: 'flex-end',
        backgroundColor: '#000000',
        borderRadius: 20,
        margin: 10,
        maxWidth: '70%',
        maxHeight: "100%",
        padding: 12,
    },
    receivedMessageContainer: {
        alignSelf: 'flex-start',
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        borderRadius: 20,
        margin: 8,
        maxWidth: '70%',
        maxHeight: "100%",
        padding: 12,
        backgroundColor: "#FFFFFF",
    },
    sentMessageText: {
        color: '#FFFFFF',
        fontSize: FONTS.SIZES.MEDIUM,
        lineHeight: 20,

    },
    receivedMessageText: {
        color: '#000000',
        fontSize: FONTS.SIZES.MEDIUM,
        lineHeight: 20,
    },
    footer: {
        width: "100%",
        height: "10%",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
        alignItems: "center",
        gap: 8,
    },
    inputWrapperStyle: {
        flex: 1,
        paddingHorizontal: 0,
        margin: 0,
        height: 40,
    },
    inputContainerStyle: {
        maxWidth: "100%",
        backgroundColor: "#EBEBEB",
        borderRadius: 20,
        borderBottomWidth: 0,
        paddingHorizontal: 16,
        height: 40,
        margin: 0,
    },
    inputStyle: {
        fontWeight: "bold",
        fontSize: FONTS.SIZES.MEDIUM,
        padding: 0,
        margin: 0,
    },
})

export default MessageScreen;