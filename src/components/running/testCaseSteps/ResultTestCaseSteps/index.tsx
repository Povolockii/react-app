import React from 'react';
import { Link } from 'react-router-dom';
import { Info } from '@material-ui/icons';
import { TooltipWidget } from '../../../Tooltip';
import { Button, IconButton } from '@material-ui/core';

type Props = Readonly<{
    workspaceId: number;
    testSuiteId: number;
    testSuiteRunId: number;
    testCaseRunId: number;
    wrapped: boolean;
}>;

//export - кнопка перехода к шагам теста
export const ResultTestCaseSteps = ({ workspaceId, testSuiteId, testSuiteRunId, testCaseRunId, wrapped }: Props) => {
    const url = `/workspace/${workspaceId}/test-suite-${testSuiteId}/test-suite-runs/${testSuiteRunId}/test-case-step-${testCaseRunId}`;
    return (
        <div style={{ textAlign: 'center' }}>
            {wrapped ? (
                <Button variant="outlined" color="primary" component={Link} to={url}>
                    Результаты выполнения теста
                </Button>
            ) : (
                <TooltipWidget
                    title={'Результаты выполнения теста'}
                    drawers={
                        <IconButton size="small" component={Link} to={url}>
                            <Info />
                        </IconButton>
                    }
                />
            )}
        </div>
    );
};
