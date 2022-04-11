import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider, extendTheme } from 'native-base';
import Navigation from './src/navigation';
import CommentSection from './src/components/CommentSection';

const config = {
    useSystemColorMode: false,
    initialColorMode: "dark"
}
const customTheme = extendTheme({config});

export default function App() {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider theme={customTheme}>
        <Navigation />
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
