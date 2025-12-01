import React from 'react';
import SlideModal from 'components/common/SlideModal';
import CommentsScreen from '../CommentsScreen';
import { Post } from 'types/feed';

type CommentModalProps = {
  modalVisible: boolean;
  setCommentModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onCloseModal: () => void;
  postItem?: Post;
};
const CommentModal: React.FC<CommentModalProps> = ({
  modalVisible,
  setCommentModalVisible,
  onCloseModal,
  postItem,
}) => {
  return (
    <SlideModal modalVisible={modalVisible} onCloseModal={onCloseModal} style={{ minHeight: '70%' }}>
      <CommentsScreen postItem={postItem} setCommentModalVisible={setCommentModalVisible} />
    </SlideModal>
  );
};

export default CommentModal;
