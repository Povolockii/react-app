import React from 'react';
import { Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import { WorkspacesWidget } from './WorkspacesWidget';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        widgetWorkspaces: {
            marginTop: theme.spacing(3),
        },
    }),
);

//export - компонент списка рабочих мест
export const Workspaces = () => {
    const classes = useStyles();
    return (
        <div className={classes.widgetWorkspaces}>
            <WorkspacesWidget />
        </div>
    );
};
