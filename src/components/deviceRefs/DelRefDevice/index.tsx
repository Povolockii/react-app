import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { deviceRefSchema, uiSchema } from './Schema';
import { ModalSchemaForm, TypeInput } from '../../ModalSchemaForm';
import { Cancel } from '@material-ui/icons';
import { sendDelDeviceRefByWorkspaceId } from '../../../services/DeviceRefService';

type Props = Readonly<{
    workspaceId: number;
    deviceRefId: number;
}>;

//export - Удаление псевдонима устройства
export const DelRefDevice = ({ workspaceId, deviceRefId }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    //open------------------
    const openForm = () => {
        setIsOpen(true);
    };
    //---------------------------

    //submit----------------------
    const onSubmit = () => {
        sendDelDeviceRefByWorkspaceId(workspaceId, deviceRefId);
        setIsOpen(false);
    };
    //----------------------------------------

    //close----------------
    const onClose = () => {
        setIsOpen(false);
    };
    //------------------------------

    const schemaMap: Map<string, { schema: any; uiSchema?: any }> = new Map<string, { schema: any; uiSchema?: any }>();

    const schema: any = deviceRefSchema();
    schemaMap.set('refDevice', { schema, uiSchema });

    return (
        <div>
            <IconButton size="small" onClick={openForm}>
                <Cancel />
            </IconButton>
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
