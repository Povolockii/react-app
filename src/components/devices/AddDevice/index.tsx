import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { deviceTypeSchema, uiSchema } from './Schema';
import { Button, Fab } from '@material-ui/core';
import { ModalSchemaForm, TypeInput } from '../../ModalSchemaForm';
import { sendPostDevice } from '../../../services/DeviceService';
import { useDeviceTypes } from '../../../hooks/useDeviceTypes';

type Props = Readonly<{
    wrapped: boolean;
}>;

//export - добавление устройства
export const AddDevice = ({ wrapped }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const requestStatus = useDeviceTypes();

    //open------------------
    const openForm = () => {
        setIsOpen(true);
    };
    //--------------------------

    //submit-----------------------------------------------------
    const onSubmit = (nameSchema: string, data: any) => {
        const { nameDev, descriptionsDev, propertiesDev } = data;
        sendPostDevice(nameSchema, nameDev, descriptionsDev ?? '', propertiesDev);
        setIsOpen(false);
    };
    //---------------------------------------------------------------------------

    //close---------------
    const onClose = () => {
        setIsOpen(false);
    };
    //--------------------------

    const schemaMap: Map<string, { schema: any; uiSchema?: any }> = new Map<string, { schema: any; uiSchema?: any }>();

    if (!requestStatus.error && requestStatus.data)
        requestStatus.data?.forEach((type) => {
            const schema: any = deviceTypeSchema(type);
            schemaMap.set(type.name, { schema, uiSchema });
        });

    return (
        <div style={{ textAlign: 'center' }}>
            {wrapped ? (
                <Button variant="outlined" color="primary" onClick={openForm}>
                    Добавить устройство
                </Button>
            ) : (
                <Fab size="medium" color="secondary" arial-label="add" style={{ margin: '1em' }} onClick={openForm}>
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
