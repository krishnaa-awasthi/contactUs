// App.js - Main component
import React from 'react';
import { ThemeProvider } from 'styled-components';
import ContactForm from './components/ContactForm';
import GlobalStyle from './styles/GlobalStyle';
import { theme } from './styles/Theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ContactForm />
    </ThemeProvider>
  );
}

export default App;
