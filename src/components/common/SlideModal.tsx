import React from 'react';
import { Animated } from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';

const ModalContent = styled(Animated.View)`
  background-color: #fff;
  overflow: hidden;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  min-height: 180px;
`;

export type SlideModalProps = {
  modalVisible: boolean;
  onCloseModal: () => void;
  children: React.ReactNode;
  style?: object;
};

const SlideModal: React.FC<SlideModalProps> = ({
  modalVisible,
  onCloseModal,
  children,
  style,
}) => {

  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={onCloseModal}
      // onSwipeComplete={onCloseModal}
      // swipeDirection="down"
      style={{ justifyContent: 'flex-end', margin: 0 }}
      useNativeDriver
    >
      <ModalContent style={style}>
        {children}
      </ModalContent>
    </Modal>
  );
};

export default SlideModal;
