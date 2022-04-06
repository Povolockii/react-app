import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { TooltipWidget } from '../../Tooltip';
import { workspaceSchema, uiSchema } from './Schema';
import { ModalSchemaForm, TypeInput } from '../../ModalSchemaForm';
import { Cancel } from '@material-ui/icons';
import { sendDelWorkspaceById } from '../../../services/WorkspaceService';

type Props = Readonly<{
    id: number;
}>;

//export - удалить рабочее место
export const DelWorkspace = ({ id }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    //open-------------------
    const openForm = () => {
        setIsOpen(true);
    };
    //--------------------------

    //submit---------------
    const onSubmit = () => {
        sendDelWorkspaceById(id);
        setIsOpen(false);
    };
    //---------------------------

    //close----------------
    const onClose = () => {
        setIsOpen(false);
    };
    //---------------------------

    const schemaMap: Map<string, { schema: any; uiSchema?: any }> = new Map<string, { schema: any; uiSchema?: any }>();

    const schema: any = workspaceSchema();
    schemaMap.set('workspace', { schema, uiSchema });

    return (
        <div>
            <TooltipWidget
                title={'Удалить рабочее место'}
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
