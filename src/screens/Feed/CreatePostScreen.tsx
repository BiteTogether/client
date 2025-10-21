import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import Header from '../../components/common/Header';
import { Icon } from "@rneui/themed"
import Container from "components/layout/Container";
import { NewPostForm } from "./components/CreatePostForm";
import * as Yup from 'yup';
import Avatar from "components/common/Avatar";
import * as ImagePicker from 'expo-image-picker';
import ThreeDotsIcon from "@assets/icons/ThreeDotsIcon";
import { LocationInputInline } from "./components/LocationInputInline";
import { CheckboxGroup } from "./components/CheckboxGroup";
import { CreatePostOptions } from "utils/constants/ui";


const CreatePost: React.FC = () => {
  const [showLocationInput, setShowLocationInput] = useState(false);
  const locationInputRef = useRef<TextInput>(null);

  const initialValues = {
    topic: '',
    text: '',
    images: [],
    place: undefined,
    postOption: 'Your followers',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const validationSchema = Yup.object({});

  const onSubmit = (values: any) => {
    console.log(values);
  };

  const pickImages = async (setFieldValue: (field: string, value: any) => void, current: any[]) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.warn('Permission denied');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });

      if (result.canceled) return;

      const images = (result.assets || []).map((a: any) => ({
        uri: a.uri,
        fileName: a.fileName ?? a.uri?.split('/').pop(),
        type: a.type ?? 'image',
      }));

      setFieldValue('images', [...(current || []), ...images]);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Container style={styles.container}>
        <Header
          title="New Post"
          leftIcon={<Icon name="close" color="#000" />}
          rightIcons={[
            <Icon name="documents" type="ionicon" />,
            <ThreeDotsIcon />
          ]}
        />

        <NewPostForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formikProps) => (
            <View style={styles.formWrapper}>
              <ScrollView
                style={styles.content}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.userRow}>
                  <Avatar />
                  <View style={styles.userContent}>
                    <View style={styles.topRow}>
                      <Text style={styles.username}>username</Text>
                      <Icon name="chevron-forward" type="ionicon" size={12} color="#999" style={styles.arrowIcon} />
                      <TextInput
                        style={styles.topicInput}
                        placeholder="Add a topic"
                        placeholderTextColor="#999"
                        {...formikProps.getFieldProps('topic')}
                      />
                    </View>
                    <TextInput
                      style={styles.textInput}
                      placeholder="What's new?"
                      placeholderTextColor="#999"
                      {...formikProps.getFieldProps('text')}
                      multiline
                    />

                    <View style={styles.iconRow}>
                      <TouchableOpacity onPress={() => pickImages(formikProps.setFieldValue, formikProps.values.images ?? [])}>
                        <Icon name="image-outline" type="ionicon" size={24} color="#999" />
                      </TouchableOpacity>
                      
                      {!showLocationInput ? (
                        <TouchableOpacity 
                          style={{ marginLeft: 16 }} 
                          onPress={() => {
                            setShowLocationInput(true);
                            setTimeout(() => locationInputRef.current?.focus(), 100);
                          }}
                        >
                          <Icon 
                            name="location" 
                            type="ionicon" 
                            size={24} 
                          />
                        </TouchableOpacity>
                      ) : (
                        <View style={{ flex: 1, marginLeft: 16 }}>
                          <LocationInputInline
                            ref={locationInputRef}
                            icon={<Icon name="location" type="ionicon" size={20} color="#999" />}
                            value={formikProps.values.place}
                            onChange={(place) => {
                              formikProps.setFieldValue('place', place);
                              if (place) setShowLocationInput(false);
                            }}
                            onBlur={() => {
                              setTimeout(() => setShowLocationInput(false), 150);
                            }}
                            placeholder="Search location..."
                          />
                        </View>
                      )}
                    </View>

                    {(formikProps.values.images?.length ?? 0) > 0 && (
                      <ScrollView horizontal style={styles.imageRow} showsHorizontalScrollIndicator={false}>
                        {(formikProps.values.images ?? []).map((img: any, idx: number) => (
                          <Image key={idx} source={{ uri: img.uri }} style={styles.thumb} />
                        ))}
                      </ScrollView>
                    )}

                    {formikProps.values.place && !showLocationInput && (
                      <View style={styles.selectedLocation}>
                        <Icon name="location" type="ionicon" size={16} color="#0095f6" />
                        <Text style={styles.selectedLocationText}>{formikProps.values.place.name}</Text>
                        <TouchableOpacity 
                          onPress={() => {
                            formikProps.setFieldValue('place', null);
                            setShowLocationInput(false);
                          }}
                          style={styles.removeLocation}
                        >
                          <Icon name="close-circle" type="ionicon" size={18} color="#999" />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
              </ScrollView>

              <View style={styles.footer}>
                <CheckboxGroup
                  label="Who can reply & quote your post?"
                  options={CreatePostOptions}
                  value={formikProps.values.postOption}
                  onChange={(next) => formikProps.setFieldValue('postOption', next)}
                  maxSelect={1}
                />
                <TouchableOpacity style={styles.postButton} onPress={() => formikProps.handleSubmit()}>
                  <Text style={styles.postButtonText}>Post</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </NewPostForm>
      </Container>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formWrapper: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  userRow: {
    flexDirection: 'row',
    marginTop: 16,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userContent: {
    flex: 1,
    marginLeft: 16,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: 15,
    paddingBottom: 2,
    fontWeight: '600',
    color: '#000',
  },
  arrowIcon: {
    marginLeft: 2, 
    marginRight: 2, 
  },
  topicInput: {
    flex: 1,
    fontSize: 14,
    color: '#999',
    paddingVertical: 0,
  },
  textInput: {
    fontSize: 15,
    color: '#000',
    minHeight: 60,
    paddingVertical: 0,
  },
  iconRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  imageRow: {
    marginTop: 12,
  },
  thumb: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
  },
  locationPreview: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  addToThread: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  addToThreadText: {
    fontSize: 14,
    color: '#999',
    marginLeft: 8,
  },
  postButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginLeft: 12,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  selectedLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    padding: 10,
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0095f6',
  },
  selectedLocationText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#000',
  },
  removeLocation: {
    padding: 4,
  },
});

export default CreatePost;