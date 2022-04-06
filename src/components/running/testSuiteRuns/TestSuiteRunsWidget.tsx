import React from 'react';
import { Loading } from '../../Loading';
import { Grid } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import { HyperLinkWidgets } from '../../HyperLinkWidget';
import { useTestSuiteRuns } from '../../../hooks/useTestSuiteRuns';
import { DelTestSuiteRun } from '../testSuiteRun/DelTestSuiteRun';
import { CancelTestSuiteRun } from '../testSuiteRun/CancelTestSuiteRun';
import {
    ITestSuiteRun,
    ITestSuiteRuns,
    TestRunState,
    convertStatus,
    createColorRun,
} from '../../../support/Interfaces';
import { ErrorMessage } from '../../ErrorMessage';

//создание вспомогательных компонентов-------------------
const createToolbar = (id: number, state: TestRunState) => {
    return (
        <div>
            <DelTestSuiteRun testSuiteRunId={id} wrapped={false} />
            {state !== TestRunState.finshed ? <CancelTestSuiteRun testSuiteRunId={id} wrapped={false} /> : <div></div>}
        </div>
    );
};
//----------------------------------------------------------------------

//создание элементов выполняемых тестов комплекта тестов--------------------------------
const createTestSuiteRunElements = (workspaceId: number, testSuiteId: number, findTSIdRs: ITestSuiteRuns) => {
    const hyperLinks = findTSIdRs.map((tsR: ITestSuiteRun) => {
        const name = `Запуск №${String(tsR.id)}`;
        const descriptionsFinish = `Тест выполнялся ${tsR.finishTime - tsR.startTime} мс. ${convertStatus(tsR.status)}`;
        const descriptions = tsR.state === TestRunState.finshed ? descriptionsFinish : '';
        const color = createColorRun(tsR.status, tsR.state);
        return {
            key: tsR.id,
            name: name,
            descriptions: descriptions,
            color: color,
            toolbar: createToolbar(tsR.id, tsR.state),
            url: `/workspace/${workspaceId}/test-suite-${testSuiteId}/test-suite-runs/`,
        };
    });

    return <HyperLinkWidgets hyperLinks={hyperLinks} />;
};
//-----------------------------------------------------------------------

//Пустой результат выполнения комплекта теста
const EmptyTestSuiteRuns = () => {
    return (
        <div style={{ justifyContent: 'center', textAlign: 'center' }}>
            <h3>Результатов тестирования не обнаружено</h3>
        </div>
    );
};

type Props = Readonly<{
    data: ITestSuiteRuns;
    workspaceId: number;
    testSuiteId: number;
}>;

const TestSuiteRunList = ({ data, workspaceId, testSuiteId }: Props) => {
    if (data.length) {
        const findTSIdRs = data.filter((tsR) => tsR.testSuiteId === testSuiteId);

        if (findTSIdRs.length === 0) {
            return <EmptyTestSuiteRuns />;
        }

        return (
            <Grid container direction="row">
                <Grid item>
                    <div>{createTestSuiteRunElements(workspaceId, testSuiteId, findTSIdRs)}</div>
                </Grid>
            </Grid>
        );
    } else {
        return <EmptyTestSuiteRuns />;
    }
};

//export - виджет комплекта теста
export const TestSuiteRunsWidget = ({ match }: RouteComponentProps<{ workspaceId: string; testSuiteId: string }>) => {
    //Номер комплекта теста и рабочего места
    const workspaceId = Number(match.params.workspaceId);
    const testSuiteId = Number(match.params.testSuiteId);

    //Список выполняемых комплектов тестов
    const requestStatus = useTestSuiteRuns();

    if (requestStatus.error) {
        return <ErrorMessage message={requestStatus.error.message} />;
    }
    if (requestStatus.data) {
        return <TestSuiteRunList data={requestStatus.data} workspaceId={workspaceId} testSuiteId={testSuiteId} />;
    }
    return <Loading />;
};
