import React from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { ButtonInfoTestCaseStep } from '../testCaseStep/ButtonInfoTestCaseSteps';
import { Theme, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import {
    ITestCaseStep,
    ITestCaseSteps,
    convertState,
    createColorRun,
    convertStatus,
} from '../../../support/Interfaces';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {
            backgroundColor: theme.palette.primary.light,
        },
    }),
);

//Создание заголовка таблицы тестов---
const createHeader = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell align="center">Номер шага</TableCell>
                <TableCell align="center">Время выполнения</TableCell>
                <TableCell align="center">Состояние</TableCell>
                <TableCell align="center">Статус</TableCell>
                <TableCell align="center">Инфо</TableCell>
            </TableRow>
        </TableHead>
    );
};
//------------------------------------------------

//Создание строки теста-----------------
const createRow = (test: ITestCaseStep) => {
    const timeTestCase = test.finishTime - test.startTime;
    return (
        <TableRow key={test.id}>
            <TableCell align="center">{test.num}</TableCell>
            <TableCell align="center">{(timeTestCase > 0 ? timeTestCase : 0) + ' мс.'}</TableCell>
            <TableCell align="center">{convertState(test.state)}</TableCell>
            <TableCell
                align="center"
                style={{
                    color: createColorRun(test.status, test.state),
                }}
            >
                {convertStatus(test.status)}
            </TableCell>
            <TableCell align="center">{<ButtonInfoTestCaseStep wrapped={false} />}</TableCell>
        </TableRow>
    );
};
//--------------------------------------------------------

type Props = Readonly<{
    testCaseSteps: ITestCaseSteps;
}>;

//export - виджет выполняемых этапов теста
export const TestCaseStepsWidget = ({ testCaseSteps }: Props) => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table" className={classes.table}>
                {createHeader()}
                <TableBody>{testCaseSteps.map(createRow)}</TableBody>
            </Table>
        </TableContainer>
    );
};
