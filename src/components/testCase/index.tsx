import React, { useContext, useEffect, useRef } from 'react';
import { Loading } from '../Loading';
import { Theme } from '@material-ui/core';
import { ErrorMessage } from '../ErrorMessage';
import { RouteComponentProps } from 'react-router-dom';
import { TableTestCaseWidget } from './TestCaseWidget';
import { makeStyles, createStyles } from '@material-ui/styles';
import { useTestCasesByTestSuiteId } from '../../hooks/useTestCases';
import { ITestCase, ITestCases } from '../../support/Interfaces';
import { AddAliasAction, DelAliasAction, AliasBreadcrumbContext } from '../../state/AliasBreadcrumbs';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            marginLeft: theme.spacing(3),
            marginRight: theme.spacing(3),
        },
    }),
);

//Поиск текущего теста----------
const findTestCase = (testCaseId: number, testCases: void | ITestCases): ITestCase | undefined => {
    let currTestCase: ITestCase | undefined;
    if (testCases)
        currTestCase = testCases?.find((t: ITestCase) => {
            return t.id === testCaseId;
        });

    return currTestCase;
};
//-------------------------------------------------

//export - компонент теста
export const TestCase = ({
    match,
}: RouteComponentProps<{ workspaceId: string; testSuiteId: string; testCaseId: string }>) => {
    const classes = useStyles();

    //Номер комплекта теста и рабочего места, номер теста
    const workspaceId = Number(match.params.workspaceId);
    const testSuiteId = Number(match.params.testSuiteId);
    const testCaseId = Number(match.params.testCaseId);

    //список тестов
    const requestStatus = useTestCasesByTestSuiteId(testSuiteId);

    //Имя теста
    const currTestCase = findTestCase(testCaseId, requestStatus.data);
    const testCaseName = currTestCase?.name;
    const contextAliasBC = useRef(useContext(AliasBreadcrumbContext));
    //--------------------------------------------------------
    useEffect(() => {
        const currentContex = contextAliasBC.current;
        if (!requestStatus.error && testCaseName && testCaseName?.length > 0) {
            const action: AddAliasAction = {
                type: 'AddAliasAction',
                componentPath: `/workspace/${workspaceId}/test-suite-${testSuiteId}/test-case-${testCaseId}`,
                componentAlias: testCaseName,
            };
            currentContex.dispatch(action);
        }
        return () => {
            if (!requestStatus.error && testCaseName && testCaseName?.length > 0) {
                const action: DelAliasAction = {
                    type: 'DelAliasAction',
                    componentPath: `/workspace/${workspaceId}/test-suite-${testSuiteId}/test-case-${testCaseId}`,
                    componentAlias: testCaseName,
                };
                currentContex.dispatch(action);
            }
        };
    }, [workspaceId, testSuiteId, testCaseId, requestStatus.error, testCaseName]);
    //------------

    //-------------------------
    const testCase = () => {
        if (requestStatus.error) {
            return <ErrorMessage message={requestStatus.error.message} />;
        }
        if (requestStatus.data && currTestCase) {
            return <TableTestCaseWidget testCase={currTestCase} />;
        }
        return <Loading />;
    };
    //--------------------------------------

    return <div className={classes.margin}>{testCase()}</div>;
};
