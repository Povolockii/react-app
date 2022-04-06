import React from 'react';
import { Paper, Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        buttonsPaper: {
            margin: theme.spacing(3),
            backgroundColor: theme.palette.secondary.main,
            minHeight: '4em',
        },
        buttonsGrid: {
            marginRight: theme.spacing(3),
        },
    }),
);

//export - панель раб. мест
export const PanelWorkspaces = () => {
    const classes = useStyles();
    return <Paper className={classes.buttonsPaper} elevation={9}></Paper>;
};
