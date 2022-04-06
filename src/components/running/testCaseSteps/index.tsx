import React, { useContext, useEffect, useRef } from 'react';
import { Loading } from '../../Loading';
import { ErrorMessage } from '../../ErrorMessage';
import { RouteComponentProps } from 'react-router-dom';
import { ITestCaseRun } from '../../../support/Interfaces';
import { TestCaseStepsWidget } from './TestCaseStepsWidget';
import { useTestCaseSteps } from '../../../hooks/useTestCaseSteps';
import { useTestCaseRunById } from '../../../hooks/useTestCasesRuns';
import { AddAliasAction, DelAliasAction, AliasBreadcrumbContext } from '../../../state/AliasBreadcrumbs';

//export - Виджет шагов теста
export const TestCaseSteps = ({
    match,
}: RouteComponentProps<{
    workspaceId: string;
    testSuiteId: string;
    testSuiteRunId: string;
    testCaseRunId: string;
}>) => {
    //Номер комплекта теста, рабочего места, номер выполняемого теста, номер выполняемого теста
    const workspaceId = Number(match.params.workspaceId);
    const testSuiteId = Number(match.params.testSuiteId);
    const testSuiteRunId = Number(match.params.testSuiteRunId);
    const testCaseRunId = Number(match.params.testCaseRunId);

    //объект запущенного теста
    const testCaseRunStatus = useTestCaseRunById(testCaseRunId);

    //объект выполняемых шагов теста
    const testCaseStepsStatus = useTestCaseSteps();

    const contextAliasBC = useRef(useContext(AliasBreadcrumbContext));

    //псевдоним выполняемого теста
    let testCaseRun: ITestCaseRun | undefined;
    if (testCaseRunStatus.data) testCaseRun = testCaseRunStatus.data;
    const nameAliasTestCaseRun = testCaseRun?.name;

    //--------------------------------------------------------
    useEffect(() => {
        const currentContex = contextAliasBC.current;
        if (!testCaseStepsStatus.error && testCaseStepsStatus.data) {
            const action: AddAliasAction = {
                type: 'AddAliasAction',
                componentPath: `/workspace/${workspaceId}/test-suite-${testSuiteId}/test-suite-runs/${testSuiteRunId}/test-case-step-${testCaseRunId}`,
                componentAlias: `Этапы ${nameAliasTestCaseRun}`,
            };
            currentContex.dispatch(action);
        }
        return () => {
            if (testCaseStepsStatus.data) {
                const action: DelAliasAction = {
                    type: 'DelAliasAction',
                    componentPath: `/workspace/${workspaceId}/test-suite-${testSuiteId}/test-suite-runs/${testSuiteRunId}/test-case-step-${testCaseRunId}`,
                    componentAlias: `Этапы ${nameAliasTestCaseRun}`,
                };
                currentContex.dispatch(action);
            }
        };
    }, [
        workspaceId,
        testSuiteId,
        testSuiteRunId,
        testCaseRunId,
        nameAliasTestCaseRun,
        testCaseStepsStatus.error,
        testCaseStepsStatus.data,
    ]);
    //---------------------------------------------------------------------------

    if (testCaseStepsStatus.error) {
        return <ErrorMessage message={testCaseStepsStatus.error.message} />;
    }
    if (testCaseStepsStatus.data) {
        const testCaseSteps = testCaseStepsStatus.data.filter((tcS) => tcS.testCaseRunId === testCaseRunId);
        return <TestCaseStepsWidget testCaseSteps={testCaseSteps} />;
    }
    return <Loading />;
};
