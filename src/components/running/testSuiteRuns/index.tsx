import React, { useContext, useEffect, useRef } from 'react';
import { Loading } from '../../Loading';
import { TestSuiteRun } from '../testSuiteRun';
import { Switch, Route } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';
import { ITestSuite, ITestSuites } from '../../../support/Interfaces';
import { TestSuiteRunsWidget } from './TestSuiteRunsWidget';
import { useTestSuitesByWorkspaceId } from '../../../hooks/useTestSuites';
import { urlTestSuiteRuns, urlTestSuiteRun } from '../../../support/Url';
import { AddAliasAction, DelAliasAction, AliasBreadcrumbContext } from '../../../state/AliasBreadcrumbs';

//Поиск текущего комплекта теста----------
const findTestSuite = (testSuiteId: number, testSuites?: ITestSuites): ITestSuite | undefined => {
    return testSuites?.find((t: ITestSuite) => {
        return t.id === testSuiteId;
    });
};
//----------------------------------------------

//export - запуск копмлектов тестов
export const TestSuiteRuns = ({ match }: RouteComponentProps<{ workspaceId: string; testSuiteId: string }>) => {
    //Номер комплекта теста и рабочего места
    const workspaceId = Number(match.params.workspaceId);
    const testSuiteId = Number(match.params.testSuiteId);

    //Список тестов и комплектов тестов
    const requestStatus = useTestSuitesByWorkspaceId(workspaceId);

    const contextAliasBC = useRef(useContext(AliasBreadcrumbContext));

    //Поиск текущего имени комплекта теста
    const currTestSuite = findTestSuite(testSuiteId, requestStatus?.data);

    //Имя результатов комплекта теста
    const testSuiteRunsName = `Результаты запусков ${currTestSuite?.name}`;

    //--------------------------------------------------------
    useEffect(() => {
        const currentContex = contextAliasBC.current;
        if (!requestStatus.error && testSuiteRunsName && testSuiteRunsName?.length > 0) {
            const action: AddAliasAction = {
                type: 'AddAliasAction',
                componentPath: `/workspace/${workspaceId}/test-suite-${testSuiteId}/test-suite-runs`,
                componentAlias: testSuiteRunsName,
            };
            currentContex.dispatch(action);
        }
        return () => {
            if (testSuiteRunsName && testSuiteRunsName?.length > 0) {
                const action: DelAliasAction = {
                    type: 'DelAliasAction',
                    componentPath: `/workspace/${workspaceId}/test-suite-${testSuiteId}/test-suite-runs`,
                    componentAlias: testSuiteRunsName,
                };
                currentContex.dispatch(action);
            }
        };
    }, [workspaceId, testSuiteId, requestStatus.error, testSuiteRunsName]);
    //---------------------------------------------------------------------------

    return (
        <div>
            {currTestSuite ? (
                <Switch>
                    <Route path={urlTestSuiteRun} component={TestSuiteRun} />
                    <Route exact path={urlTestSuiteRuns} component={TestSuiteRunsWidget} />
                </Switch>
            ) : (
                <Loading />
            )}
        </div>
    );
};
