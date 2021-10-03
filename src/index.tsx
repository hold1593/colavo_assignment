import React from 'react';
import ReactDOM from 'react-dom';
import Routes from "./Routes";
import { ThemeProvider } from "styled-components";
import reportWebVitals from './reportWebVitals';
import GlobalStyle from './styles/global-styles';
import { theme } from './styles/theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Routes />
  </ThemeProvider>,
  document.getElementById('root')
);
reportWebVitals();
