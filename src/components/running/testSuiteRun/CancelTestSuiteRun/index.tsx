import React, { useState } from 'react';
import { testSuiteSchema, uiSchema } from './Schema';
import { ModalSchemaForm, TypeInput } from '../../../ModalSchemaForm';
import { sendPostCancelTestSuiteRunsById } from '../../../../services/TestSuiteRunService';
import { PauseCircleFilled } from '@material-ui/icons';
import { TooltipWidget } from '../../../Tooltip';
import { Button, IconButton } from '@material-ui/core';

type Props = Readonly<{
    testSuiteRunId: number;
    wrapped: boolean;
}>;

//export - кнопка отмены выполнения теста
export const CancelTestSuiteRun = ({ testSuiteRunId, wrapped }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    //open------------------
    const openForm = () => {
        setIsOpen(true);
    };
    //--------------------------

    //submit----------------
    const onSubmit = () => {
        if (testSuiteRunId >= 0) {
            sendPostCancelTestSuiteRunsById(testSuiteRunId);
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
    schemaMap.set('testSuiteRun', { schema, uiSchema });

    return (
        <div style={{ textAlign: 'center' }}>
            {wrapped ? (
                <Button variant="outlined" color="primary" onClick={openForm}>
                    Отменить выполнение теста
                </Button>
            ) : (
                <div key={testSuiteRunId}>
                    <TooltipWidget
                        title={'Отменить выполнение теста'}
                        drawers={
                            <IconButton size="small" onClick={openForm}>
                                <PauseCircleFilled />
                            </IconButton>
                        }
                    />
                </div>
            )}
            <ModalSchemaForm
                open={isOpen}
                type={TypeInput.Confirm}
                schemaMap={schemaMap}
                onSubmit={onSubmit}
                onClose={onClose}
            />
        </div>
    );
};
