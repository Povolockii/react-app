import React from 'react';
import { Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        welcome: {
            marginTop: theme.spacing(12),
        },
    }),
);

//export - страница входа
export const PageWelcome = () => {
    const classes = useStyles();
    return (
        <div style={{ justifyContent: 'center', textAlign: 'center' }}>
            <div className={classes.welcome}>
                <h2>Добро пожаловать в систему тестирования Гефест!</h2>
            </div>
        </div>
    );
};
