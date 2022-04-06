export const uiSchema = {};

export const refDeviceSchema = (devices: Map<number, string>) => {
    const keysDev = Array.from(devices.keys());
    const valuesDev = Array.from(devices.values());
    const currKeyDev = keysDev.length > 0 ? keysDev[0] : 0;

    const schema: any = {
        type: 'object',
        properties: {
            refName: {
                title: 'Псевдоним устройства',
                type: 'string',
                minLenght: 1,
            },
            deviceId: {
                title: 'Имя устройства',
                type: 'number',
                default: currKeyDev,
                enum: keysDev,
                enumNames: valuesDev,
            },
        },
        required: ['refName'],
    };

    return schema;
};
