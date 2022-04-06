import React from 'react';
import { Grid } from '@material-ui/core';
import { ChangeTestCase } from './ChangeTestCase';
import { RouteComponentProps } from 'react-router-dom';

//export - Кнопки для работы с тестом
export const ButtonsTestCase = ({ match }: RouteComponentProps<{ workspaceId: string; testCaseId: string }>) => {
    //Номер раб. места
    const workspaceId = Number(match.params.workspaceId);

    //Номер теста
    const testCaseId = Number(match.params.testCaseId);

    return (
        <Grid container spacing={3} direction="row">
            <Grid item>
                <ChangeTestCase workspaceId={workspaceId} testCaseId={testCaseId} />
            </Grid>
        </Grid>
    );
};
