import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Container from 'components/layout/Container';
import Header from 'components/common/Header';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import { TouchableOpacity, Text, View, Alert } from 'react-native';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { logoutUser } from 'store/slices/authSlice';
import { deleteUserAccount } from 'store/slices/userSlice';
import { ScrollView } from 'react-native-gesture-handler';
import { COLORS } from 'utils/constants';
import Toast from 'react-native-toast-message';

const Section = styled.View`
  margin: 16px;
`;

const SectionTitle = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: #888;
  margin-bottom: 10px;
`;

const Row = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 16px 0;
  background-color: #fff;
`;

const RowIcon = styled.View`
  width: 28px;
  align-items: center;
  margin-right: 16px;
`;

const RowText = styled.View`
  flex: 1;
`;

const RowTitle = styled.Text`
  font-size: 16px;
  color: #222;
`;

const RowSubtitle = styled.Text`
  font-size: 13px;
  color: #888;
  margin-top: 2px;
`;

const Arrow = styled(Icon).attrs({
  name: 'chevron-right',
  type: 'feather',
  size: 22,
  color: '#bbb',
})``;

const Settings: React.FC = () => {
  const { i18n: i18nextInstance } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const profile = useAppSelector(state => state.user.profile);
  const { t } = useTranslation();

  const confirmDeleteAccount = () => {
    Alert.alert(
      t('delete_account'),
      t('delete_account_confirmation'),
      [
        { text: t('cancel'), style: 'cancel' },
        { text: t('delete'), style: 'destructive', onPress: handleDeleteAccount },
      ],
    );
  };

  const handleDeleteAccount = async () => {
    try {
      if (profile?.id) {
        const result = await dispatch(deleteUserAccount(profile.id));
        if (deleteUserAccount.fulfilled.match(result)) {
          Toast.show({
            type: 'success',
            text1: result.payload.message,
          });
          dispatch(logoutUser());
        } else {
          Toast.show({
            type: 'error',
            text1: typeof result.payload === 'string' ? result.payload : JSON.stringify(result.payload),
          });
        }
      }
    } catch (e) {
      console.error('Error deleting account:', e);
    }
  };

  const confirmLogout = () => {
    Alert.alert(
      t('logout'),
      t('logout_confirmation'),
      [
        { text: t('cancel'), style: 'cancel' },
        { text: t('logout'), style: 'destructive', onPress: handleLogout },
      ],
    );
  };

  const handleLogout = async () => {
    try {
      const result = await dispatch(logoutUser());
      if (logoutUser.fulfilled.match(result)) {
        Toast.show({
          type: 'success',
          text1: result.payload.message,
        });
      } else {
        console.error('Logout failed:', result.payload);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Section configs
  const [showLangPicker, setShowLangPicker] = useState(false);
  const currentLang = i18nextInstance.language === 'vi' ? t('vietnamese') : t('english');
  const howYouUse: { icon: React.ReactNode; title: string; subtitle?: string; onPress: () => void }[] = [
    {
      icon: <Icon name="bookmark" type="feather" size={22} />, title: t('saved') || 'Saved',
      onPress: () => {},
    },
    {
      icon: <Icon name="rotate-ccw" type="feather" size={22} />, title: t('archive') || 'Archive',
      onPress: () => {},
    },
    {
      icon: <Icon name="activity" type="feather" size={22} />, title: t('your_activity') || 'Your activity',
      onPress: () => {},
    },
    {
      icon: <Icon name="bell" type="feather" size={22} />, title: t('notifications') || 'Notifications',
      onPress: () => {},
    },
    {
      icon: <Icon name="clock" type="feather" size={22} />, title: t('time_management') || 'Time management',
      onPress: () => {},
    },
    {
      icon: <Icon name="globe" type="feather" size={22} />, title: t('language') || 'Language',
      subtitle: currentLang,
      onPress: () => setShowLangPicker(true),
    },
  ];

  const whoCanSee: { icon: React.ReactNode; title: string; subtitle?: string; onPress: () => void }[] = [
    {
      icon: <Icon name="lock" type="feather" size={22} />, title: t('account_privacy') || 'Account privacy',
      subtitle: t('private') || 'Private',
      onPress: () => {},
    },
    {
      icon: <Icon name="star" type="feather" size={22} />, title: t('close_friends') || 'Close Friends',
      subtitle: '0',
      onPress: () => {},
    },
    {
      icon: <Icon name="copy" type="feather" size={22} />, title: t('crossposting') || 'Crossposting',
      subtitle: undefined,
      onPress: () => {},
    },
    {
      icon: <Icon name="slash" type="feather" size={22} />, title: t('blocked') || 'Blocked',
      subtitle: '0',
      onPress: () => {},
    },
    {
      icon: <Icon name="eye-off" type="feather" size={22} />, title: t('story_and_location') || 'Story and location',
      subtitle: undefined,
      onPress: () => {},
    },
    {
      icon: <Icon name="users" type="feather" size={22} />, title: t('activity_in_friends_tab') || 'Activity in Friends tab',
      subtitle: undefined,
      onPress: () => {},
    },
  ];

  const howOthersInteract: { icon: React.ReactNode; title: string; subtitle?: string; onPress: () => void }[] = [
    {
      icon: <Icon name="message-circle" type="feather" size={22} />, title: t('messages_and_story_replies') || 'Messages and story replies',
      subtitle: undefined,
      onPress: () => {},
    },
  ];

  return (
    <Container>
      <Header
        leftIcon={[
          <Icon
            key="arrow"
            name="arrow-left"
            type="feather"
            size={24}
            color="black"
            onPress={() => navigation.goBack()}
          />
        ]}
        leftTitle={t('settings')}
      />

      <ScrollView>
      {/* How you use */}
      <Section>
        <SectionTitle>{t('how_you_use_app') || 'How you use app'}</SectionTitle>
        <View style={{backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden'}}>
          {howYouUse.map((item, idx) => (
            <Row key={item.title} onPress={item.onPress} style={idx === howYouUse.length - 1 ? {borderBottomWidth: 0} : {}}>
              <RowIcon>{item.icon}</RowIcon>
              <RowText><RowTitle>{item.title}</RowTitle>{item.subtitle && <RowSubtitle>{item.subtitle}</RowSubtitle>}</RowText>
              <Arrow />
            </Row>
          ))}
        </View>
      </Section>

      {/* Who can see your content */}
      <Section>
        <SectionTitle>{t('who_can_see_your_content') || 'Who can see your content'}</SectionTitle>
        <View style={{backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden'}}>
          {whoCanSee.map((item, idx) => (
            <Row key={item.title} onPress={item.onPress} style={idx === whoCanSee.length - 1 ? {borderBottomWidth: 0} : {}}>
              <RowIcon>{item.icon}</RowIcon>
              <RowText><RowTitle>{item.title}</RowTitle>{item.subtitle && <RowSubtitle>{item.subtitle}</RowSubtitle>}</RowText>
              <Arrow />
            </Row>
          ))}
        </View>
      </Section>

      {/* How others can interact */}
      <Section>
        <SectionTitle>{t('how_others_can_interact_with_you') || 'How others can interact with you'}</SectionTitle>
        <View style={{backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden'}}>
          {howOthersInteract.map((item, idx) => (
            <Row key={item.title} onPress={item.onPress} style={idx === howOthersInteract.length - 1 ? {borderBottomWidth: 0} : {}}>
              <RowIcon>{item.icon}</RowIcon>
              <RowText><RowTitle>{item.title}</RowTitle>{item.subtitle && <RowSubtitle>{item.subtitle}</RowSubtitle>}</RowText>
              <Arrow />
            </Row>
          ))}
        </View>
      </Section>

      {/* Logout row at bottom */}
      <Section>
        <View style={{backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden'}}>
          <Row onPress={confirmDeleteAccount} style={{borderBottomWidth: 0}}>
            <RowIcon>
              <Icon name="user-x" type="feather" size={22} color={COLORS.ERROR} />
            </RowIcon>
            <RowText><RowTitle style={{color: COLORS.ERROR}}>{t('delete_account')}</RowTitle></RowText>
          </Row>

          <Row onPress={confirmLogout} style={{borderBottomWidth: 0}}>
            <RowIcon>
              <Icon name="log-out" type="feather" size={22} color={COLORS.ERROR} />
            </RowIcon>
            <RowText><RowTitle style={{color: COLORS.ERROR}}>{t('logout')}</RowTitle></RowText>
          </Row>
        </View>
      </Section>
      </ScrollView>

      {/* Language picker modal with overlay */}
      {showLangPicker && (
        <>
          {/* Overlay */}
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setShowLangPicker(false)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.3)',
              zIndex: 99,
            }}
          />
          {/* Modal */}
          <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: '#fff', borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 24, zIndex: 100}}>
            <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 16}}>{t('select_language')}</Text>
            <TouchableOpacity onPress={() => {i18nextInstance.changeLanguage('en'); setShowLangPicker(false);}} style={{padding: 14, borderRadius: 8, backgroundColor: i18nextInstance.language === 'en' ? '#f0f0f0' : '#fff', marginBottom: 8}}>
              <Text style={{fontSize: 16}}>{t('english')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {i18nextInstance.changeLanguage('vi'); setShowLangPicker(false);}} style={{padding: 14, borderRadius: 8, backgroundColor: i18nextInstance.language === 'vi' ? '#f0f0f0' : '#fff'}}>
              <Text style={{fontSize: 16}}>{t('vietnamese')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowLangPicker(false)} style={{marginTop: 16, alignItems: 'center'}}>
              <Text style={{color: COLORS.ERROR, fontWeight: 'bold'}}>{t('cancel')}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </Container>
  );
};

export default Settings;
