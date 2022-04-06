import { IDeviceType } from '../../../support/Interfaces';

export const uiSchema = {
    propertiesDev: {
        'ui:title': 'Свойства устройства',
    },
};

export const deviceTypeSchema = (typeDevice: IDeviceType) => {
    const schema: any = {
        type: 'object',
        properties: {
            nameDev: {
                title: 'Имя устройства',
                type: 'string',
                default: `Устройство ${typeDevice?.name}`,
                minLenght: 1,
            },
            descriptionsDev: {
                title: 'Описание устройства',
                type: 'string',
            },
            propertiesDev: typeDevice?.propertiesSchema,
        },
        required: ['nameDev'],
    };

    return schema;
};
