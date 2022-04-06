import React, { useContext, useEffect, useRef } from 'react';
import { Loading } from '../Loading';
import { TestSuiteWidget } from './TestSuiteWidget';
import { ITestSuite } from '../../support/Interfaces';
import { useTestSuitesByWorkspaceId } from '../../hooks/useTestSuites';
import { AddAliasAction, DelAliasAction, AliasBreadcrumbContext } from '../../state/AliasBreadcrumbs';

//export - копмлект тестов
export const TestSuite = (props: any) => {
    //Номер комплекта теста и рабочего места
    const workspaceId = Number(props.match.params.workspaceId);
    const testSuiteId = Number(props.match.params.testSuiteId);

    //Список тестов и комплектов тестов
    const requestStatus = useTestSuitesByWorkspaceId(workspaceId);

    const contextAliasBC = useRef(useContext(AliasBreadcrumbContext));

    //Поиск текущего имени комплекта теста
    let currTestSuite: ITestSuite | undefined;
    if (requestStatus.data)
        currTestSuite = requestStatus.data.length
            ? requestStatus.data?.find((t: ITestSuite) => {
                  return t.id === testSuiteId;
              })
            : undefined;

    //Имя комплекта теста
    const testSuiteName = currTestSuite?.name;

    //--------------------------------------------------------
    useEffect(() => {
        const currentContex = contextAliasBC.current;
        if (!requestStatus.error && testSuiteName && testSuiteName?.length > 0) {
            const action: AddAliasAction = {
                type: 'AddAliasAction',
                componentPath: `/workspace/${workspaceId}/test-suite-${testSuiteId}`,
                componentAlias: testSuiteName,
            };
            currentContex.dispatch(action);
        }
        return () => {
            if (testSuiteName && testSuiteName?.length > 0) {
                const action: DelAliasAction = {
                    type: 'DelAliasAction',
                    componentPath: `/workspace/${workspaceId}/test-suite-${testSuiteId}`,
                    componentAlias: testSuiteName,
                };
                currentContex.dispatch(action);
            }
        };
    }, [workspaceId, testSuiteId, requestStatus.error, testSuiteName]);
    //---------------------------------------------------------------------------

    return currTestSuite ? <TestSuiteWidget /> : <Loading />;
};
