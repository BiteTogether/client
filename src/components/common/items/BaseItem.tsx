import { View } from "react-native"
import { IBaseItem } from "../../../types"
import { Avatar } from "@rneui/themed"


export const BaseItem = ({
    imageContent,
    textContent: mainContent,
    itemStyle,
    imageContentStyle
} : IBaseItem) => {
    return (
        <View style={itemStyle}>
            { imageContent ? (
                <Avatar
                    {...imageContentStyle}
                    source={{ uri : imageContent }} />
            ) : null}
            { mainContent }
        </View>
    )
}