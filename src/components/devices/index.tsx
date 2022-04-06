import React from 'react';
import { Loading } from '../Loading';
import { AddDevice } from './AddDevice';
import { Theme, Grid, Paper } from '@material-ui/core';
import { TableDevicesWidget } from './TableDevicesWidget';
import { makeStyles, createStyles } from '@material-ui/styles';
import { useDevices } from '../../hooks/useDevices';
import { ErrorMessage } from '../ErrorMessage';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            marginTop: theme.spacing(3),
            marginLeft: theme.spacing(3),
            marginRight: theme.spacing(3),
        },
        buttonsPaper: {
            backgroundColor: theme.palette.secondary.main,
            minHeight: '4em',
        },
        AddDevTable: {
            backgroundColor: theme.palette.primary.light,
        },
    }),
);

//export - Таблица устройств
export const DevicesTable = () => {
    const classes = useStyles();
    const requestStatus = useDevices();

    //Создание таблицы устройств---------
    const tableDev = () => {
        if (requestStatus.error) {
            return <ErrorMessage message={requestStatus.error.message} />;
        }
        if (requestStatus.data) {
            return (
                <Grid item container direction="column">
                    <Grid item>
                        <TableDevicesWidget devices={requestStatus.data} />
                    </Grid>
                    <Grid item>
                        <Paper className={classes.AddDevTable}>
                            <AddDevice wrapped={false} />
                        </Paper>
                    </Grid>
                </Grid>
            );
        }
        return <Loading />;
    };
    //--------------------------------------------------

    return (
        <div className={classes.margin} style={{ textAlign: 'center' }}>
            {tableDev()}
        </div>
    );
};
