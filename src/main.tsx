import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import './index.less';

const colors = {
  brand: {
    100: '#E7F5FD',
    300: '#CAECFF',
    500: '#2D9CDB',
    700: '#0099EE',
  },
  green: {
    500: '#56E4A0',
  },
  red: {
    500: '#F36868',
  },
};

const theme = extendTheme({ colors });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
