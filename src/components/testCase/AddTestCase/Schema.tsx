import { ITestCaseType, IDeviceRefs, IDevices } from '../../../support/Interfaces';
import { createRequiredDevices } from '../../../support/Interfaces';

export const uiSchema = {
    propertiesTest: {
        'ui:title': 'Свойства теста',
        freqs: {
            'ui:title': 'Список частот',
        },
    },
    requiredDevices: {
        'ui:title': 'Список устройств',
    },
};

export const testCaseSchema = (testCaseType: ITestCaseType, devRefs: IDeviceRefs, devices: IDevices) => {
    const schema: any = {
        type: 'object',
        properties: {
            nameTest: {
                title: 'Имя теста',
                type: 'string',
                default: testCaseType?.name,
                minLenght: 1,
            },
            descriptionsTest: {
                title: 'Описание теста',
                type: 'string',
            },
            requiredDevices: {
                type: 'array',
                items: createRequiredDevices(testCaseType, devRefs, devices),
            },
            propertiesTest: testCaseType?.paramsSchema,
        },
        required: ['nameTest'],
    };

    return schema;
};
