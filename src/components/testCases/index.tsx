import React from 'react';
import { Loading } from '../Loading';
import { ErrorMessage } from '../ErrorMessage';
import { HyperLinkWidgets } from '../HyperLinkWidget';
import { DelTestCase } from '../testCase/DelTestCase';
import { AddTestCase } from '../testCase/AddTestCase';
import { RouteComponentProps } from 'react-router-dom';
import { ITestCase, ITestCases } from '../../support/Interfaces';
import { useTestCasesByTestSuiteId } from '../../hooks/useTestCases';

//создание элементов тестов--------------------------------
const createTestCaseElements = (workspaceId: number, testSuiteId: number, tcs: ITestCases) => {
    return (
        <HyperLinkWidgets
            hyperLinks={tcs.map((tc: ITestCase) => {
                return {
                    key: tc.id,
                    name: tc.name,
                    descriptions: tc.description,
                    toolbar: <DelTestCase idTestCase={tc.id} />,
                    url: `/workspace/${workspaceId}/test-suite-${testSuiteId}/test-case-`,
                };
            })}
            createAddWidget={<AddTestCase workspaceId={workspaceId} testSuiteId={testSuiteId} />}
        />
    );
};
//-----------------------------------------------------------------------

//export - Список копмлектов тестов
export const TestCases = ({ match }: RouteComponentProps<{ workspaceId: string; testSuiteId: string }>) => {
    //Номер комплекта теста и рабочего места
    const workspaceId = Number(match.params.workspaceId);
    const testSuiteId = Number(match.params.testSuiteId);

    //Список тестов
    const requestStatus = useTestCasesByTestSuiteId(testSuiteId);

    if (requestStatus.error) {
        return <ErrorMessage message={requestStatus.error.message} />;
    }
    if (requestStatus.data) {
        return requestStatus.data ? createTestCaseElements(workspaceId, testSuiteId, requestStatus.data) : <div></div>;
    }
    return <Loading />;
};
