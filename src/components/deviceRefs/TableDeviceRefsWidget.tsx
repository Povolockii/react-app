import React from 'react';
import { Lens } from '@material-ui/icons';
import { DelRefDevice } from './DelRefDevice';
import { makeStyles, createStyles } from '@material-ui/styles';
import { IDeviceRef, IDeviceRefs, IDevices } from '../../support/Interfaces';
import { Theme, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {
            backgroundColor: theme.palette.primary.light,
        },
        ok: {
            color: theme.palette.success.main,
        },
        error: {
            color: theme.palette.error.main,
        },
    }),
);

type Props = Readonly<{
    workspaceId: number;
    deviceRefs: IDeviceRefs;
    devices: IDevices;
}>;

//export - создание таблицы псевданимов устройств
export const TableDeviceRefsWidget = ({ workspaceId, deviceRefs, devices }: Props) => {
    const classes = useStyles();

    //cортировка по типу устройства
    const sortedDeviceRefs: IDeviceRefs =
        deviceRefs.length > 0
            ? deviceRefs.sort((obj1: IDeviceRef, obj2: IDeviceRef) => {
                  return obj1.name.localeCompare(obj2.name);
              })
            : [];

    //Создание заголовка-------------------------
    const createHeader = () => {
        return (
            <TableHead>
                <TableRow>
                    <TableCell align="center">Псевдоним устройства</TableCell>
                    <TableCell align="center">Имя устройства</TableCell>
                    <TableCell align="center">Тип устройства</TableCell>
                    <TableCell align="center">Состояние</TableCell>
                    <TableCell align="center"></TableCell>
                </TableRow>
            </TableHead>
        );
    };
    //-------------------------------------------------------

    //Создание строки----------------------------
    const createRow = (ref: IDeviceRef) => {
        const dev = devices?.find((d) => {
            return d.id === ref.deviceId;
        });
        return (
            <TableRow key={ref.id}>
                <TableCell align="center">{ref.name}</TableCell>
                <TableCell align="center">{dev?.name}</TableCell>
                <TableCell align="center">{dev?.type}</TableCell>
                <TableCell align="center">
                    <Lens className={dev?.status === 'available' ? classes.ok : classes.error} />
                </TableCell>
                <TableCell align="center">
                    <DelRefDevice workspaceId={workspaceId} deviceRefId={ref.id} />
                </TableCell>
            </TableRow>
        );
    };
    //------------------------------------------------------------

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table" className={classes.table}>
                {createHeader()}
                <TableBody>{sortedDeviceRefs.map(createRow)}</TableBody>
            </Table>
        </TableContainer>
    );
};
