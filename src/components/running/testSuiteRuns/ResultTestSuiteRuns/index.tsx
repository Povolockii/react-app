import React from 'react';
import { Link } from 'react-router-dom';
import { Beenhere } from '@material-ui/icons';
import { TooltipWidget } from '../../../Tooltip';
import { Button, IconButton } from '@material-ui/core';

type Props = Readonly<{
    workspaceId: number;
    testSuiteId: number;
    wrapped: boolean;
}>;

//export - кнопка перехода к результатам комплектов тестов
export const ResultTestSuiteRuns = ({ workspaceId, testSuiteId, wrapped }: Props) => {
    const url = `/workspace/${workspaceId}/test-suite-${testSuiteId}/test-suite-runs`;
    return (
        <div style={{ textAlign: 'center' }}>
            {wrapped ? (
                <Button variant="outlined" color="primary" component={Link} to={url}>
                    Результаты комплекта тестов
                </Button>
            ) : (
                <TooltipWidget
                    title={'Результаты комплекта тестов'}
                    drawers={
                        <IconButton size="small" component={Link} to={url}>
                            <Beenhere />
                        </IconButton>
                    }
                />
            )}
        </div>
    );
};
