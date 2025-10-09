import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { checkAuthToken } from '../store/slices/authSlice';
import { loadCachedProfile } from '../store/slices/userSlice';
import { RootStackParamList } from '../types';

import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Only check auth token if we have a persisted token but not authenticated
    // This handles edge cases where token exists but state is inconsistent
    if (token && !isAuthenticated) {
      dispatch(checkAuthToken()).then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          dispatch(loadCachedProfile());
        }
      });
    } else if (isAuthenticated && token) {
      // If already authenticated (from persist), load cached profile
      dispatch(loadCachedProfile());
    }
  }, [dispatch, isAuthenticated, token]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={MainNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
