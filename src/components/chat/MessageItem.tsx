import React from "react";

import { IBaseItem } from "../../types";
import { BaseItem } from "../common/items/BaseItem";

export const MessageItem = ({
    imageContent,
    textContent,
    itemStyle,
    imageContentStyle
} : IBaseItem) => {
    return (
        <BaseItem
            imageContent={imageContent}
            textContent={textContent}
            itemStyle={itemStyle}
            imageContentStyle={imageContentStyle} />
    )
}