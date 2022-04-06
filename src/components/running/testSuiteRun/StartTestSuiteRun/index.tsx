import React, { useState } from 'react';
import { PlayCircleFilled } from '@material-ui/icons';
import { TooltipWidget } from '../../../Tooltip';
import { testSuiteSchema, uiSchema } from './Schema';
import { Button, IconButton } from '@material-ui/core';
import { ModalSchemaForm, TypeInput } from '../../../ModalSchemaForm';
import { sendPostRunTestSuiteRunsById } from '../../../../services/TestSuiteRunService';

type Props = Readonly<{
    workspaceId: number;
    testSuiteId: number;
    wrapped: boolean;
    history: any;
}>;

//export - запуск комплекта тестов
export const StartTestSuiteRun = ({ workspaceId, testSuiteId, wrapped, history }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    //open------------------
    const openForm = () => {
        setIsOpen(true);
    };
    //--------------------------

    //submit----------------
    const onSubmit = () => {
        if (testSuiteId >= 0) {
            sendPostRunTestSuiteRunsById(testSuiteId);
            history.push(`/workspace/${workspaceId}/test-suite-${testSuiteId}/test-suite-runs`);
        }
        setIsOpen(false);
    };
    //--------------------------------------

    //close----------------
    const onClose = () => {
        setIsOpen(false);
    };
    //---------------------------

    const schemaMap: Map<string, { schema: any; uiSchema?: any }> = new Map<string, { schema: any; uiSchema?: any }>();
    const schema: any = testSuiteSchema();
    schemaMap.set('testSuite', { schema, uiSchema });

    return (
        <div style={{ textAlign: 'center' }}>
            {wrapped ? (
                <Button variant="outlined" color="primary" onClick={openForm}>
                    Запустить комплект тестов
                </Button>
            ) : (
                <TooltipWidget
                    title={'Запустить комплект тестов'}
                    drawers={
                        <IconButton size="small" onClick={openForm}>
                            <PlayCircleFilled />
                        </IconButton>
                    }
                />
            )}
            <ModalSchemaForm
                open={isOpen}
                type={TypeInput.ToRun}
                schemaMap={schemaMap}
                onSubmit={onSubmit}
                onClose={onClose}
            />
        </div>
    );
};
