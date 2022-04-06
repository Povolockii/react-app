import React from 'react';
import { Loading } from '../Loading';
import { Theme } from '@material-ui/core';
import { ErrorMessage } from '../ErrorMessage';
import { useDevices } from '../../hooks/useDevices';
import { useDeviceRefsByWorkspaceId } from '../../hooks/useDeviceRefsByTestSuiteId';
import { makeStyles, createStyles } from '@material-ui/styles';
import { TableDeviceRefsWidget } from './TableDeviceRefsWidget';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            marginLeft: theme.spacing(3),
            marginRight: theme.spacing(3),
        },
    }),
);

type Props = Readonly<{
    workspaceId: number;
}>;

//export - Таблица псевдонимов устройств
export const DeviceRefsTable = ({ workspaceId }: Props) => {
    const classes = useStyles();

    const devicesStatus = useDevices();
    const deviceRefsStatus = useDeviceRefsByWorkspaceId(workspaceId);

    //Создание таблицы псевдонимов устройств--------------------------
    const tableRefDev = () => {
        if (deviceRefsStatus.error) {
            return <ErrorMessage message={deviceRefsStatus.error.message} />;
        }
        if (devicesStatus.error) {
            return <ErrorMessage message={devicesStatus.error.message} />;
        }
        if (deviceRefsStatus.data && devicesStatus.data) {
            return (
                <TableDeviceRefsWidget
                    workspaceId={workspaceId}
                    deviceRefs={deviceRefsStatus.data}
                    devices={devicesStatus.data}
                />
            );
        }
        return <Loading />;
    };
    //---------------------------------------------------------------------------

    return (
        <div className={classes.margin} style={{ textAlign: 'center' }}>
            {tableRefDev()}
        </div>
    );
};
