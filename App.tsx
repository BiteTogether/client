import React from 'react';
import './src/utils/i18n';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, ActivityIndicator } from 'react-native';
import { store, persistor } from './src/store';
import RootNavigator from './src/navigation';
import Toast from 'react-native-toast-message';
import { COLORS } from './src/utils/constants/ui';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate 
        loading={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={COLORS.ACCENT} />
          </View>
        } 
        persistor={persistor}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <RootNavigator />
          <StatusBar style="auto" />
        </GestureHandlerRootView>
        <Toast />
      </PersistGate>
    </Provider>
  );
}
