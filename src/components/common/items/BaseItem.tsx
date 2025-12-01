import { View } from 'react-native';
import { IBaseItem } from '../../../types';
import Avatar from '../Avatar';
import styled from 'styled-components/native';
import { COLORS, FONTS } from 'utils/constants/ui';

const RowText = styled.View`
  justify-content: center;
  flex-direction: column;
  gap: 4px;
  margin-top: 2px;
`;

const RowTitle = styled.Text`
  font-size: ${FONTS.SIZES.LARGE}px;
  font-weight: ${FONTS.WEIGHTS.SEMIBOLD};
`;

const RowSubtitle = styled.Text<{ colorText?: string }>`
  font-size: ${FONTS.SIZES.LARGE}px;
  color: ${({ colorText }) => colorText || COLORS.TEXT.LIGHT};
`;

export const BaseItem = ({
  imageContent,
  rowTitle,
  rowSubtitle,
  contentInput,
  colorText
}: IBaseItem) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
      <Avatar uri={imageContent} />

      <RowText>
        <RowTitle>{rowTitle}</RowTitle>
        {rowSubtitle && <RowSubtitle colorText={colorText}>{rowSubtitle}</RowSubtitle>}
        {contentInput}
      </RowText>
    </View>
  );
};
export default BaseItem;