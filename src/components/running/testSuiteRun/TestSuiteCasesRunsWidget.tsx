import React from 'react';
import { Loading } from '../../Loading';
import { ErrorMessage } from '../../ErrorMessage';
import { RouteComponentProps } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/styles';
import { useTestCasesRuns } from '../../../hooks/useTestCasesRuns';
import { useTestSuiteRunById } from '../../../hooks/useTestSuiteRuns';
import { ResultTestCaseSteps } from '../testCaseSteps/ResultTestCaseSteps';
import {
    ITestCaseRun,
    ITestCaseRuns,
    convertState,
    createColorRun,
    convertStatus,
    ITestSuiteRun,
} from '../../../support/Interfaces';
import { Theme, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

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
                <TableCell align="center">Имя теста</TableCell>
                <TableCell align="center">Описание теста</TableCell>
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
const createRow = (workspaceId: number, testSuiteId: number, testSuiteRunId: number, test: ITestCaseRun) => {
    const timeTestCase = test.finishTime - test.startTime;
    return (
        <TableRow key={test.id}>
            <TableCell align="center">{test.name}</TableCell>
            <TableCell align="center">{test.description}</TableCell>
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
            <TableCell align="center">
                <ResultTestCaseSteps
                    workspaceId={workspaceId}
                    testSuiteId={testSuiteId}
                    testSuiteRunId={testSuiteRunId}
                    testCaseRunId={test.id}
                    wrapped={false}
                />
            </TableCell>
        </TableRow>
    );
};
//--------------------------------------------------------

type Props = Readonly<{
    workspaceId: number;
    testSuiteId: number;
    testSuiteRunId: number;
    testSuiteRun: ITestSuiteRun;
    testCasesRuns: ITestCaseRuns;
}>;

//-----------------
const TestCasesRunList = ({ workspaceId, testSuiteId, testSuiteRunId, testSuiteRun, testCasesRuns }: Props) => {
    const classes = useStyles();
    const timeSuiteRun = testSuiteRun.finishTime - testSuiteRun.startTime;

    const testCasesRunList = testCasesRuns.filter((tcR) => tcR.testSuiteRunId === testSuiteRunId);

    return (
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="simple table" className={classes.table}>
                    {createHeader()}
                    <TableBody>
                        {testCasesRunList.map((tcRs) => createRow(workspaceId, testSuiteId, testSuiteRunId, tcRs))}
                    </TableBody>
                </Table>
            </TableContainer>
            <h4>{`Время выполнения комплекта тестов ${timeSuiteRun > 0 ? timeSuiteRun : 0} мс.`}</h4>
        </div>
    );
};
//------------------------------------------

//export - виджет выполняемых тестов комплекта
export const TestSuiteCasesRunsWidget = ({
    match,
}: RouteComponentProps<{ workspaceId: string; testSuiteId: string; testSuiteRunId: string }>) => {
    //Номер комплекта теста и рабочего места и номер выполняемого теста
    const workspaceId = Number(match.params.workspaceId);
    const testSuiteId = Number(match.params.testSuiteId);
    const testSuiteRunId = Number(match.params.testSuiteRunId);

    //объект запущенного теста
    const testSuiteRunStatus = useTestSuiteRunById(testSuiteRunId);

    //Список выполняемых тестов
    const testCasesRunsStatus = useTestCasesRuns();

    if (testCasesRunsStatus.error) {
        return <ErrorMessage message={testCasesRunsStatus.error.message} />;
    }
    if (testSuiteRunStatus.error) {
        return <ErrorMessage message={testSuiteRunStatus.error.message} />;
    }
    if (testCasesRunsStatus.data && testSuiteRunStatus.data) {
        return (
            <TestCasesRunList
                workspaceId={workspaceId}
                testSuiteId={testSuiteId}
                testSuiteRunId={testSuiteRunId}
                testSuiteRun={testSuiteRunStatus.data}
                testCasesRuns={testCasesRunsStatus.data}
            />
        );
    }
    return <Loading />;
};
