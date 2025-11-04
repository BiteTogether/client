import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Icon } from '@rneui/themed';
import { t } from 'i18next';

interface ProfileActionProps {
  type: 'self' | 'user' | 'restaurant';
  onEdit?: () => void;
  onAddFriend?: () => void;
  onMessage?: () => void;
  isFriend?: boolean;
}

const ProfileAction: React.FC<ProfileActionProps> = ({
  type,
  onEdit,
  onAddFriend,
  onMessage,
  isFriend,
}) => {
  if (type === 'self') {
    return (
      <TouchableOpacity style={styles.editBtn} onPress={onEdit}>
        <Icon name="edit" type="feather" size={18} color="#222" style={{marginRight: 6}} />
        <Text style={styles.editText}>{t('edit_profile')}</Text>
      </TouchableOpacity>
    );
  }
  if (type === 'user') {
    return (
      <View style={styles.row}>
        <TouchableOpacity style={[styles.addBtn, isFriend && styles.addedBtn]} onPress={onAddFriend}>
          <Icon name="user-plus" type="feather" size={18} color={isFriend ? '#888' : '#fff'} style={{marginRight: 6}} />
          <Text style={[styles.addText, isFriend && styles.addedText]}>{isFriend ? 'Added' : 'Add friend'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.msgBtn} onPress={onMessage}>
          <Icon name="message-circle" type="feather" size={18} color="#222" style={{marginRight: 6}} />
          <Text style={styles.msgText}>Message</Text>
        </TouchableOpacity>
      </View>
    );
  }
  if (type === 'restaurant') {
    return (
      <View style={styles.row}>
        <TouchableOpacity style={styles.iconBtn}>
          <Icon name="heart" type="feather" size={22} color="#222" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <Icon name="user" type="feather" size={22} color="#222" />
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
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 18,
    alignSelf: 'flex-start',
  },
  editText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD600',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
  },
  addedBtn: {
    backgroundColor: '#F2F2F2',
  },
  addText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
  },
  addedText: {
    color: '#888',
  },
  msgBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  msgText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
  },
  iconBtn: {
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
});

export default ProfileAction;
