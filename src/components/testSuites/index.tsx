import React from 'react';
import * as H from 'history';
import { Loading } from '../Loading';
import { ErrorMessage } from '../ErrorMessage';
import { HyperLinkWidgets } from '../HyperLinkWidget';
import { RouteComponentProps } from 'react-router-dom';
import { AddTestSuite } from '../testSuite/AddTestSuite';
import { DelTestSuite } from '../testSuite/DelTestSuite';
import { useTestSuitesByWorkspaceId } from '../../hooks/useTestSuites';
import { ITestSuite, ITestSuites } from '../../support/Interfaces';
import { StartTestSuiteRun } from '../running/testSuiteRun/StartTestSuiteRun';
import { ResultTestSuiteRuns } from '../running/testSuiteRuns/ResultTestSuiteRuns';

//создание вспомогательных компонентов-------------------
const createToolBar = (id: number, workspaceId: number, history: H.History) => {
    return (
        <div>
            <DelTestSuite idSuite={id} />
            <StartTestSuiteRun workspaceId={workspaceId} testSuiteId={id} wrapped={false} history={history} />
            <ResultTestSuiteRuns workspaceId={workspaceId} testSuiteId={id} wrapped={false} />
        </div>
    );
};
//----------------------------------------------------------------------

//создание элементов комплектов тестов--------------------------------
const createTestSuiteElements = (tss: ITestSuites, workspaceId: number, history: H.History) => {
    return (
        <HyperLinkWidgets
            hyperLinks={tss.map((ts: ITestSuite) => {
                return {
                    key: ts.id,
                    name: ts.name,
                    descriptions: ts.description,
                    toolbar: createToolBar(ts.id, workspaceId, history),
                    url: `/workspace/${workspaceId}/test-suite-`,
                };
            })}
            createAddWidget={<AddTestSuite workspaceId={workspaceId} />}
        />
    );
};
//-----------------------------------------------------------------------

//export - Список копмлектов тестов
export const TestSuites = ({ history, match }: RouteComponentProps<{ workspaceId: string }>) => {
    //номер раб. места
    const workspaceId = Number(match.params.workspaceId);

    //список комплектов тестов
    const requestStatus = useTestSuitesByWorkspaceId(workspaceId);

    if (requestStatus.error) {
        return <ErrorMessage message={requestStatus.error.message} />;
    }
    if (requestStatus.data) {
        return createTestSuiteElements(requestStatus.data, workspaceId, history);
    }
    return <Loading />;
};
