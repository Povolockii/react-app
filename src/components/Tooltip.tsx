import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Tooltip, Typography } from '@material-ui/core';

const useStyles = makeStyles(() =>
    createStyles({
        tooltip: {
            display: 'contents',
        },
        typography: {
            fontSize: 15,
        },
    }),
);

type TooltipProps = Readonly<{
    title: string;
    drawers: JSX.Element;
}>;

//export - виджет подсказки
export const TooltipWidget = ({ title, drawers }: TooltipProps) => {
    const classes = useStyles();
    return <Tooltip title={<Typography className={classes.typography}>{title}</Typography>}>{drawers}</Tooltip>;
};
