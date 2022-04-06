import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Button, Fab } from '@material-ui/core';
import { useDevices } from '../../../hooks/useDevices';
import { refDeviceSchema, uiSchema } from './Schema';
import { ModalSchemaForm, TypeInput } from '../../ModalSchemaForm';
import { sendPostDeviceRefByWorkspaceId } from '../../../services/DeviceRefService';

type Props = Readonly<{
    workspaceId: number;
    wrapped: boolean;
}>;

//export - Добавление псевдонима устройства
export const AddRefDevice = ({ workspaceId, wrapped }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const requestStatus = useDevices();

    //open----------------------
    const openForm = () => {
        setIsOpen(true);
    };
    //---------------------------------

    //submit-------------------------------------------
    const onSubmit = (nameSchema: string, data: any) => {
        const { refName, deviceId } = data;
        sendPostDeviceRefByWorkspaceId(workspaceId, refName, deviceId);
        setIsOpen(false);
    };
    //------------------------------------------------------------

    //close----------------------
    const onClose = () => {
        setIsOpen(false);
    };
    //------------------------------------

    const schemaMap: Map<string, { schema: any; uiSchema?: any }> = new Map<string, { schema: any; uiSchema?: any }>();

    const deviceMap: Map<number, string> = new Map<number, string>();
    if (!requestStatus.error && requestStatus.data)
        requestStatus.data.forEach((dev) => {
            deviceMap.set(dev.id, dev.name);
        });
    const schema: any = refDeviceSchema(deviceMap);
    schemaMap.set('refDevice', { schema, uiSchema });

    return (
        <div style={{ textAlign: 'center' }}>
            {wrapped ? (
                <Button variant="outlined" color="primary" onClick={openForm}>
                    Добавить устройство
                </Button>
            ) : (
                <Fab size="small" color="secondary" arial-label="add" style={{ margin: '1em' }} onClick={openForm}>
                    <AddIcon />
                </Fab>
            )}
            <ModalSchemaForm
                open={isOpen}
                type={TypeInput.Insert}
                schemaMap={schemaMap}
                onSubmit={onSubmit}
                onClose={onClose}
            />
        </div>
    );
};
