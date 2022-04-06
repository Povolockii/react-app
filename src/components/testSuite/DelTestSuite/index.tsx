import React, { useState } from 'react';
import { Cancel } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { TooltipWidget } from '../../Tooltip';
import { testSuiteSchema, uiSchema } from './Schema';
import { ModalSchemaForm, TypeInput } from '../../ModalSchemaForm';
import { sendDTestSuiteById } from '../../../services/TestSuiteService';

type Props = Readonly<{
    idSuite: number;
}>;

//export - удаление комплекта тестов
export const DelTestSuite = ({ idSuite }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    //open----------------
    const openForm = () => {
        setIsOpen(true);
    };
    //----------------------------

    //submit---------------
    const onSubmit = () => {
        sendDTestSuiteById(idSuite);
        setIsOpen(false);
    };
    //---------------------------

    //close---------------
    const onClose = () => {
        setIsOpen(false);
    };
    //---------------------------

    const schemaMap: Map<string, { schema: any; uiSchema?: any }> = new Map<string, { schema: any; uiSchema?: any }>();

    const schema: any = testSuiteSchema();
    schemaMap.set('testSuite', { schema, uiSchema });

    return (
        <div>
            <TooltipWidget
                title={'Удалить комплект тестов'}
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
