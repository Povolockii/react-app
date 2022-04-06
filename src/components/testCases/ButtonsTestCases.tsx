import React from 'react';
import { Grid } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import { StartTestSuiteRun } from '../running/testSuiteRun/StartTestSuiteRun';
import { ResultTestSuiteRuns } from '../running/testSuiteRuns/ResultTestSuiteRuns';

//export - Кнопки для работы с тестами
export const ButtonsTestCases = ({
    history,
    match,
}: RouteComponentProps<{ workspaceId: string; testSuiteId: string }>) => {
    //Номер комплекта теста и рабочего места
    const testSuiteId = Number(match.params.testSuiteId);
    const workspaceId = Number(match.params.workspaceId);

    return (
        <Grid container spacing={3} direction="row">
            <Grid item>
                <StartTestSuiteRun
                    workspaceId={workspaceId}
                    testSuiteId={testSuiteId}
                    wrapped={true}
                    history={history}
                />
            </Grid>
            <Grid item>
                <ResultTestSuiteRuns workspaceId={workspaceId} testSuiteId={testSuiteId} wrapped={true} />
            </Grid>
        </Grid>
    );
};
