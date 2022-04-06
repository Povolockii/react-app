import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { TooltipWidget } from '../../Tooltip';
import { testCaseSchema, uiSchema } from './Schema';
import { ModalSchemaForm, TypeInput } from '../../ModalSchemaForm';
import { Cancel } from '@material-ui/icons';
import { sendDelTestCaseById } from '../../../services/TestCaseService';

type Props = Readonly<{
    idTestCase: number;
}>;

//export - удаление теста
export const DelTestCase = ({ idTestCase }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    //open------------------
    const openForm = () => {
        setIsOpen(true);
    };
    //----------------------------

    //submit-----------------
    const onSubmit = () => {
        sendDelTestCaseById(idTestCase);
        setIsOpen(false);
    };
    //-----------------------------

    //close---------------
    const onClose = () => {
        setIsOpen(false);
    };
    //-----------------------------

    const schemaMap: Map<string, { schema: any; uiSchema?: any }> = new Map<string, { schema: any; uiSchema?: any }>();

    const schema: any = testCaseSchema();
    schemaMap.set('testCaseDel', { schema, uiSchema });

    return (
        <div>
            <TooltipWidget
                title={'Удалить тест'}
                drawers={
                    <IconButton size="small" onClick={openForm}>
                        <Cancel />
                    </IconButton>
                }
            />
            <ModalSchemaForm
                open={isOpen}
                type={TypeInput.Delete}
                schemaMap={schemaMap}
                onSubmit={onSubmit}
                onClose={onClose}
            />
        </div>
    );
};
