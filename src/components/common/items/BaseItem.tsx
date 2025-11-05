import { View } from "react-native"
import { IBaseItem } from "../../../types"
import Avatar from "../Avatar"

export const BaseItem = ({
    imageContent,
    textContent,
} : IBaseItem) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, gap: 8 }}>
                <Avatar
                    uri={imageContent}
                />
            { textContent }
        </View>
    )
}
export default BaseItem;