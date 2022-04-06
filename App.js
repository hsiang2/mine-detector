import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import Navigation from './src/navigation';
import CommentSection from './src/components/CommentSection';

export default function App() {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <Navigation />
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
