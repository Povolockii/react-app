import React, { useContext, useEffect, useRef } from 'react';
import { Theme } from '@material-ui/core';
import { TestCaseSteps } from '../testCaseSteps';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import { urlTestSuiteRun, urlTestCaseSteps } from '../../../support/Url';
import { TestSuiteCasesRunsWidget } from './TestSuiteCasesRunsWidget';
import { AddAliasAction, DelAliasAction, AliasBreadcrumbContext } from '../../../state/AliasBreadcrumbs';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            marginLeft: theme.spacing(3),
            marginRight: theme.spacing(3),
        },
    }),
);

//export - выполняемый копмлект тестов
export const TestSuiteRun = ({
    match,
}: RouteComponentProps<{ workspaceId: string; testSuiteId: string; testSuiteRunId: string }>) => {
    const classes = useStyles();

    //Номер комплекта теста и рабочего места и номер выполняемого теста
    const workspaceId = Number(match.params.workspaceId);
    const testSuiteId = Number(match.params.testSuiteId);
    const testSuiteRunId = Number(match.params.testSuiteRunId);

    const contextAliasBC = useRef(useContext(AliasBreadcrumbContext));

    //Имя результатов комплекта теста
    const testSuiteRunName = `Запуск №${testSuiteRunId}`;

    //--------------------------------------------------------
    useEffect(() => {
        const currentContex = contextAliasBC.current;
        if (testSuiteRunName) {
            const action: AddAliasAction = {
                type: 'AddAliasAction',
                componentPath: `/workspace/${workspaceId}/test-suite-${testSuiteId}/test-suite-runs/${testSuiteRunId}`,
                componentAlias: testSuiteRunName,
            };
            currentContex.dispatch(action);
        }
        return () => {
            if (testSuiteRunName) {
                const action: DelAliasAction = {
                    type: 'DelAliasAction',
                    componentPath: `/workspace/${workspaceId}/test-suite-${testSuiteId}/test-suite-runs/${testSuiteRunId}`,
                    componentAlias: testSuiteRunName,
                };
                currentContex.dispatch(action);
            }
        };
    }, [workspaceId, testSuiteId, testSuiteRunId, testSuiteRunName]);
    //---------------------------------------------------------------------------

    return (
        <div className={classes.margin}>
            <Switch>
                <Route path={urlTestCaseSteps} component={TestCaseSteps} />
                <Route path={urlTestSuiteRun} component={TestSuiteCasesRunsWidget} />
            </Switch>
        </div>
    );
};
