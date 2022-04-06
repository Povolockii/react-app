import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { deviceSchema, uiSchema } from './Schema';
import { ModalSchemaForm, TypeInput } from '../../ModalSchemaForm';
import { Cancel } from '@material-ui/icons';
import { sendDelDeviceById } from '../../../services/DeviceService';

type Props = Readonly<{
    deviceId: number;
}>;

//export - удаление устройства
export const DelDevice = ({ deviceId }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    //open-----------------
    const openForm = () => {
        setIsOpen(true);
    };
    //---------------------------

    //submit----------------
    const onSubmit = () => {
        sendDelDeviceById(deviceId);
        setIsOpen(false);
    };
    //--------------------------

    //close----------------
    const onClose = () => {
        setIsOpen(false);
    };
    //-------------------------

    const schemaMap: Map<string, { schema: any; uiSchema?: any }> = new Map<string, { schema: any; uiSchema?: any }>();

    const schema: any = deviceSchema();
    schemaMap.set('device', { schema, uiSchema });

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
