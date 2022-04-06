import React from 'react';
import { DelDevice } from './DelDevice';
import { Lens } from '@material-ui/icons';
import { SortedTable, HeadCellSortedTable } from '../TableSorted'
import { makeStyles, createStyles } from '@material-ui/styles';
import { IDevice, IDevices } from '../../support/Interfaces';
import { Theme, TableCell, TableHead, TableRow } from '@material-ui/core';

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

//Создание заголовка-------------------------
const headCells: HeadCellSortedTable[] = [
    { id: 'nameDevice', numeric: true, disablePadding: true, label: 'Имя устройства' },
    { id: 'descriptionDevice', numeric: false, disablePadding: false, label: 'Описание устройства' },
    { id: 'typeDevice', numeric: true, disablePadding: false, label: 'Тип устройства' },
    { id: 'addrDevice', numeric: false, disablePadding: false, label: 'Адрес устройства' },
    { id: 'portDevice', numeric: false, disablePadding: false, label: 'Порт устройства' },
    { id: 'stateDevice', numeric: true, disablePadding: false, label: '' },
  ];

type Props = Readonly<{
    devices: IDevices;
}>;

//export - Создание таблицы устройств
export const TableDevicesWidget = ({ devices }: Props) => {
    const classes = useStyles();

    //сортировка по типу устройства
    const sortedDevices: IDevices =
        devices.length > 0
            ? devices.sort((obj1: IDevice, obj2: IDevice) => {
                  return obj1.type.localeCompare(obj2.type);
              })
            : [];

    //Создание строки----------------------------
    const rows: DaSortedTable[] = 

;

    //Создание строки----------------------------
    const createRow = (device: IDevice) => {
        return (
            { headId: 'nameDevice', numeric: true, disablePadding: true, label: 'Имя устройства' },
            { headId: 'descriptionDevice', numeric: false, disablePadding: false, label: 'Описание устройства' },
            { headId: 'typeDevice', numeric: true, disablePadding: false, label: 'Тип устройства' },
            { headId: 'addrDevice', numeric: false, disablePadding: false, label: 'Адрес устройства' },
            { headId: 'portDevice', numeric: false, disablePadding: false, label: 'Порт устройства' },
            { headId: 'stateDevice', numeric: true, disablePadding: false, label: '' },
        )

        return (
            <TableRow key={device.id}>
                <TableCell align="right">
                    <Lens className={device.status === 'available' ? classes.ok : classes.error} />
                </TableCell>
                <TableCell align="left">{device.name}</TableCell>
                <TableCell align="center">{device.descriptions.length !== 0 ? device.descriptions : '...'}</TableCell>
                <TableCell align="center">{device.type}</TableCell>
                <TableCell align="center">{device.properties?.hostAddress}</TableCell>
                <TableCell align="center">{device.properties?.iceObjectPort}</TableCell>
                <TableCell align="center">
                    <DelDevice deviceId={device.id} />
                </TableCell>
            </TableRow>
        );
    };
    //------------------------------------------------------------

    return (
        <SortedTable head={headCells} />
    );
};
