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

//export - пустая страница
export const PageNotFound = () => {
    const classes = useStyles();
    return (
        <div style={{ justifyContent: 'center', textAlign: 'center' }}>
            <div className={classes.welcome}>
                <h3>Ошибка 404. Что-то пошло не так.</h3>
                <p>По техническим причинам страница временно недоступна.</p>
                <p>Попробуйте повторить попытку позже.</p>
            </div>
        </div>
    );
};
