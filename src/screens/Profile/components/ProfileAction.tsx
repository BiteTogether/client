import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Icon } from '@rneui/themed';
import { t } from 'i18next';
import { COLORS } from 'utils/constants';

interface ProfileActionProps {
  type: 'self' | 'user' | 'restaurant';
  onEdit?: () => void;
  onAddFriend?: () => void;
  onMessage?: () => void;
  onFriends?: () => void;
  onRejectFriendRequest?: () => void;
  isFriend?: boolean;
  hasFriendRequestSent?: boolean;
}

const ProfileAction: React.FC<ProfileActionProps> = ({
  type,
  onEdit,
  onAddFriend,
  onMessage,
  onFriends,
  onRejectFriendRequest,
  isFriend,
  hasFriendRequestSent,
}) => {
  if (type === 'self') {
    return (
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={onEdit}>
          <Icon name="edit" type="feather" size={18} style={{marginRight: 6}} />
          <Text style={styles.text}>{t('edit_profile')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onFriends}>
          <Icon name="users" type="feather" size={18} style={{marginRight: 6}} />
          <Text style={styles.text}>{t('friends')}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  if (type === 'user') {
    let friendBtnText = t('add_friend');
    let friendBtnIcon = 'user-plus';
    let friendBtnStyle = [styles.button, styles.yellowBtn];
    if (isFriend) {
      friendBtnText = t('friends');
      friendBtnIcon = 'users';
      friendBtnStyle = [styles.button];
    } else if (hasFriendRequestSent) {
      friendBtnText = t('request_sent');
      friendBtnIcon = 'clock';
      friendBtnStyle = [styles.button];
    }
    return (
      <View style={styles.row}>
        <TouchableOpacity
          style={friendBtnStyle}
          onPress={(isFriend || hasFriendRequestSent) ? onRejectFriendRequest : onAddFriend}
        >
          <Icon name={friendBtnIcon} type="feather" size={18} style={{marginRight: 6}} />
          <Text style={styles.text}>{friendBtnText}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onMessage}>
          <Icon name="message-circle" type="feather" size={18} style={{marginRight: 6}} />
          <Text style={styles.text}>{t('message')}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  if (type === 'restaurant') {
    return (
      <View style={styles.row}>
        <TouchableOpacity style={styles.button}>
          <Icon name="heart" type="feather" size={22} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon name="user" type="feather" size={22} />
        </TouchableOpacity>
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 18,
    justifyContent: 'center',
    width: '40%',
    backgroundColor: COLORS.GRAY_BUTTON_BG,
  },

  yellowBtn: {
    backgroundColor: COLORS.ACCENT,
  },

  text: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default ProfileAction;
