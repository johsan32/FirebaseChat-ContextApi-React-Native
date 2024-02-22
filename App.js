import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ContextProvider from './src/context';
import MyStack from './src/navigation/stackNav';
import ToastManager from 'toastify-react-native';

function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
      <ToastManager />
    </ContextProvider>
  );
}
export default App;
