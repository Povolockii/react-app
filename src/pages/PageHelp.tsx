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

//export - страница справки
export const PageHelp = () => {
    const classes = useStyles();
    return (
        <div style={{ justifyContent: 'center', textAlign: 'center' }}>
            <div className={classes.welcome}>
                <h2>Система тестирования Гефест</h2>
                <p>Предназначена для тестирования и опроса устройств.</p>
                <p>Все пожелания направляйте в отдел 5733</p>
            </div>
        </div>
    );
};
