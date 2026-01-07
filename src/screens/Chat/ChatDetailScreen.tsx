import React, { useState, useCallback, useRef } from "react"
import { View, TextInput, TouchableOpacity, Text } from "react-native"
import { Icon } from "@rneui/themed"
import { COLORS, FONTS } from "../../utils/constants"
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import PlaneIcon from '@assets/icons/PlaneIcon';
import PlusIcon from '@assets/icons/PlusIcon';
import styled from 'styled-components/native';
import { SendMessageRequest, Messages, Message } from "types/chat";
import Container from "components/layout/Container";
import Header from 'components/common/Header';
import { FlatList } from 'react-native-gesture-handler';
import { getMessages, sendMessage } from "services/api/chatApi";
import Toast from 'react-native-toast-message';
import { useAppSelector } from '../../hooks/redux';
import Avatar from "components/common/Avatar";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types';
import FullScreenLoader from "components/common/FullScreenLoader";






const Section = styled.View`
  margin-horizontal: 16px;
  padding-bottom: 32px;
  flex: 1;
`;

const EmptyText = styled.Text`
  color: #888;
  font-size: ${FONTS.SIZES.MEDIUM}px;
  margin-top: 50%;
  text-align: center;
`;

const CommentInputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: ${FONTS.SIZES.MEDIUM}px;
  background-color: ${COLORS.GRAY_BUTTON_BG};
  border-radius: 25px;
  min-height: 40px;
  padding: 12px;
  flex: 1;
`;

const CommentBox = styled.View`
  padding-top: 8px;
  border-top-width: 1px;
  border-top-color: ${COLORS.BORDER};
  bottom: 3%;
  background-color: #fff;
`;

const CommentInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-horizontal: 12px;
  gap: 8px;
`;

const IconCircleWrapper = styled.View`
  background-color: ${COLORS.GRAY_BUTTON_BG};
  padding: 12px;
  border-radius: 50%;
  min-height: 40px;
  min-width: 40px;
`;

const TabBarHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.BORDER};
`;

const Row = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
`;

const ArrowIcon = styled(Icon).attrs({
  name: 'chevron-right',
  type: 'feather',
  size: 22,
  color: '#bbb',
})``;

const TitleBox = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 12px;
  padding-bottom: 16px;
`;


const SentMessageContainer = styled.View`
    align-self: flex-end;
    background-color: #000000;
    border-radius: 20px;
    margin-vertical: 10px;
    max-width: 70%;
    max-height: 100%;
    padding: 12px;
`;

const ReceivedMessageContainer = styled.View`
    background-color: ${COLORS.GRAY_BUTTON_BG};
    border-radius: 20px;
    margin-vertical: 10px;
    max-width: 70%;
    max-height: 100%;
    padding: 12px;
`;

const ChatDetailScreen: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { t } = useTranslation();
    const route = useRoute();
    const { id } = (route.params ?? {}) as { id?: string };

    const [messageCreate, setMessageCreate] = useState<SendMessageRequest>({
        roomId: String(id),
        content: '',
        type: 'TEXT',
    });
    const [messages, setMessages] = useState<Messages>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const ownProfile = useAppSelector((state) => state.user.profile);
    const [loadingMessages, setLoadingMessages] = useState(false);

    const flatListRef = useRef<FlatList>(null);

    const handleSendMessage = async () => {
        if (isSubmitting) return; // avoid double click
        setIsSubmitting(true);
    
        // if (isEditMode && selectedComment) {
        //     // Update comment
        //     try {
        //     const response = await editComment(selectedComment.id, commentCreate);
        //     if (response.status === 200) {
        //         setComments(prev => prev.map(c => c.id === selectedComment.id ? { ...c, content: commentCreate.content } : c));
        //         setIsEditMode(false);
        //         setSelectedComment(undefined);
        //         setCommentCreate(prev => ({ ...prev, content: '', parentCommentId: undefined }));
        //         setReplyTo(undefined);
        //     } else {
        //         Toast.show({ type: 'error', text1: response.message });
        //     }
        //     } catch (error) {
        //     console.error('Error editing comment:', error);
        //     } finally {
        //     setIsSubmitting(false);
        //     }
        // } else {

            // Send new message
            try {
            const response = await sendMessage(messageCreate);

            if (response.data) {
                setMessages(prev => [...prev, response.data as Message]);
                setMessageCreate(prev => ({ ...prev, content: '' }));
                // setReplyTo(undefined);
            } else {
                Toast.show({
                type: 'error',
                text1: response.message,
                });
            }
            } catch (error) {
                console.error('Error sending message:', error);
            } finally {
                setIsSubmitting(false);
            }
        // }
    };

    

    useFocusEffect(
        useCallback(() => {
            const handleGetMessages = async () => {
                setLoadingMessages(true);
                try {
                    const response = await getMessages(String(id));
                    if (response.data) {
                        setMessages(response.data);
                    }
                } catch (error) {
                    console.error('Error getting messages:', error);
                } finally {
                    setLoadingMessages(false);
                }
            };
            handleGetMessages();
        }, [id])
    );

    if (loadingMessages) return <FullScreenLoader />;

    return (
        <Container>
            <Header
                leftIcon={
                    <Icon
                    name="arrow-left"
                    type="feather"
                    size={24}
                    color="black"
                    />
                }
                onLeftPress={() => navigation.goBack()}

                // leftTitle={currentProfile.username}
            />

            {messages && messages.length > 0 ? (
            <Section>
                <FlatList
                    ref={flatListRef}
                    onContentSizeChange={() => {
                        flatListRef.current?.scrollToEnd({ animated: false });
                    }}
                    // inverted
                    data={messages}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        // <Row key={item.id} onPress={() => handleStartChat(undefined, undefined, item.id)}>
                        //     <BaseItem
                        //     imageContent={item.avatar}
                        //     rowTitle={item.name}
                        //     // rowSubtitle={item.username}
                        //     />
                        // </Row>
                        <>
                            {item.sender.id !== ownProfile?.id ? (
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('Main', { screen: 'Profile', params: { id: String(item.id) } })}>
                                        <Avatar uri={item.sender.avatar} />
                                    </TouchableOpacity>
                                    <ReceivedMessageContainer>
                                        <Text>{item.content}</Text>
                                    </ReceivedMessageContainer>
                                </View>
                            ) : (
                                <SentMessageContainer>
                                    <Text style={{color: '#FFFFFF'}}>{item.content}</Text>
                                </SentMessageContainer>
                            )}
                        </>
                    )}
                />
            </Section>
            ) : (
                <View style={{ flex: 1 }}>
                    <EmptyText>{t('no_messages')}</EmptyText>
                </View>
            )}
        
            <CommentBox>
            {/* {(isEditMode && selectedComment) ? (
                <TitleBox>
                <Text style={{ color: '#888' }}>
                    {t('edit_comment')}
                </Text>
                <TouchableOpacity onPress={() => {
                    setIsEditMode(false);
                    setSelectedComment(undefined);
                    setCommentCreate(prev => ({ ...prev, content: '', parentCommentId: undefined }));
                    setReplyTo(undefined);
                }}>
                    <Icon name="x" type="feather" size={20} color="#888" />
                </TouchableOpacity>
                </TitleBox>
            ) : replyTo ? (
                <TitleBox>
                <Text numberOfLines={1} style={{ color: '#888' }}>{replyTo.user.fullName}: {replyTo.content}</Text>
                <TouchableOpacity onPress={() => {
                    setReplyTo(undefined);
                    setCommentCreate(prev => ({ ...prev, parentCommentId: undefined, content: '' }));
                }}>
                    <Icon name="x" type="feather" size={20} color="#888" />
                </TouchableOpacity>
                </TitleBox>
            ) : null} */}

            <CommentInputContainer>
                <IconCircleWrapper>
                <PlusIcon />
                </IconCircleWrapper>
                <CommentInputWrapper>
                <TextInput
                    placeholder="send a message..."
                    style={{ fontSize: FONTS.SIZES.MEDIUM, flex: 1, padding: 0, margin: 0 }}
                    multiline
                    value={messageCreate.content}
                    onChangeText={(text) => setMessageCreate(prev => ({ ...prev, content: text }))}
                    placeholderTextColor="#888"
                    autoCapitalize="none"
                />
                {messageCreate.content.trim().length === 0 ? null : (
                    <TouchableOpacity onPress={handleSendMessage}>
                    <PlaneIcon />
                    </TouchableOpacity>
                )}
                </CommentInputWrapper>
            </CommentInputContainer>
            </CommentBox>


        </Container>
    )
}

export default ChatDetailScreen;