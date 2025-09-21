import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native"
import { SearchBar } from "@rneui/themed"

import { COLORS, FONTS, MESSAGE_ITEMS } from "../../utils/constants"
import { MessageItem } from "./components/MessageItem"
import { MessageItemContent } from "./components/MessageItemContent"
import { useNavigation } from '@react-navigation/native';

const MessageListScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <SearchBar 
                    containerStyle={styles.searchBarContainer}
                    inputContainerStyle={styles.inputContainerStyle}
                    leftIconContainerStyle={styles.leftIconContainerStyle}
                    inputStyle={styles.inputStyle}
                    placeholderTextColor={COLORS.TEXT.PRIMARY}
                    placeholder="Search"
                     />
            </View>

            <Text style={styles.title}>Messages</Text>

            <ScrollView 
                showsVerticalScrollIndicator={false}
                style={styles.messageList} >
                {MESSAGE_ITEMS.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => navigation.navigate('ChatDetail')}>
                    <MessageItem
                        key={index}
                        itemStyle={styles.item}
                        imageContent={item.imageUri}
                        imageContentStyle={styles.avatar}
                        textContent={
                        <MessageItemContent 
                            fullName={item.textContent.fullName} 
                            latestMessage={item.textContent.latestMessage} 
                            receivedTime={item.textContent.receivedTime} />} />
                    </TouchableOpacity>
                ))}
            </ScrollView>

            
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
        height: "10%",
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "#FAFAFA",
    },
    title: {
        fontSize: FONTS.SIZES.XLARGE,
        fontWeight: "bold",
        paddingLeft: 20,
        marginBottom: 20,
    },
    searchBarContainer: {
        width: "92%",
        height: "70%",
        backgroundColor: "#FAFAFA",
        borderColor: "#FAFAFA",
        justifyContent: "flex-end",

    },
    inputContainerStyle: {
        width: "100%",
        height: 30,
        backgroundColor: "#EBEBEB",
        borderRadius: 10,
    },
    leftIconContainerStyle: {
        
    },
    inputStyle: {
        fontSize: FONTS.SIZES.MEDIUM,
        fontWeight: "bold",
    },
    messageList: {
        width: "100%",
        height: "70%",
        backgroundColor: COLORS.BACKGROUND,
        paddingLeft: 20,
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        gap: 10,
    },
    avatar: {
        rounded: true,
    },  
    footer: {
        height: "10%",
        width: "100%",
        backgroundColor: COLORS.BACKGROUND,
    },
})

export default MessageListScreen;