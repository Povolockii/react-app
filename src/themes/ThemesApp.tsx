import { createMuiTheme, Theme } from '@material-ui/core';
import { red, yellow, lightBlue, green } from '@material-ui/core/colors';

export const ThemeApp: Theme = createMuiTheme({
    palette: {
        type: 'dark',
        error: red,
        warning: yellow,
        info: lightBlue,
        success: green,
        primary: {
            light: '#555555',
            main: '#29b6f6',
            dark: '#707070',
            contrastText: '#fff',
        },
        secondary: {
            light: '#707070',
            main: '#555555',
            dark: '#1976d2',
            contrastText: '#fff',
        },
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            'Raleway',
        ].join(','),
    },
    overrides: {},
});
