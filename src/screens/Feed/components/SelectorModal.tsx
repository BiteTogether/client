import React from 'react';
import styled from 'styled-components/native';
import { FONTS, COLORS } from 'utils/constants/ui';
import { useTranslation } from 'react-i18next';
import { Icon } from '@rneui/themed';
import SlideModal from 'components/common/SlideModal';

const OptionButton = styled.TouchableOpacity`
  padding: 18px 24px;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const OptionText = styled.Text`
  font-size: ${FONTS.SIZES.XLARGE}px;
  text-align: left;
`;

export type SelectorModalProps = {
  modalVisible: boolean;
  onCloseModal: () => void;
  onEditPost: () => void;
  onDeletePost: () => void;
};

const SelectorModal: React.FC<SelectorModalProps> = ({
  modalVisible,
  onCloseModal,
  onEditPost,
  onDeletePost,
}) => {
  const { t } = useTranslation();

  return (
    <SlideModal
      modalVisible={modalVisible}
      onCloseModal={onCloseModal}
    >
      <OptionButton
        onPress={onEditPost}
        style={{ borderBottomWidth: 1, borderBottomColor: COLORS.BORDER }}
      >
        <Icon name="edit" type="feather" size={24} color="black" />
        <OptionText>{t('edit_post')}</OptionText>
      </OptionButton>

      <OptionButton onPress={onDeletePost}>
        <Icon name="trash-2" type="feather" size={24} color="red" />
        <OptionText style={{ color: 'red' }}>{t('delete_post')}</OptionText>
      </OptionButton>

      <OptionButton onPress={onCloseModal}>
        <Icon name="x" type="feather" size={24} color="black" />
        <OptionText>{t('cancel')}</OptionText>
      </OptionButton>
    </SlideModal>
  );
};

export default SelectorModal;
