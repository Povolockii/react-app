import React from 'react';
import Main from './pages/Main';
import Header from './pages/Header';
import { ThemeApp } from './themes/ThemesApp';
import { MuiThemeProvider } from '@material-ui/core';

const App = () => {
    return (
        <MuiThemeProvider theme={ThemeApp}>
            <Header />
            <Main />
        </MuiThemeProvider>
    );
};

export default App;
