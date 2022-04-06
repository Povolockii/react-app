import { ITestCase, ITestCaseType, IDeviceRefs, IDevices } from '../../../support/Interfaces';
import { createRequiredDevices } from '../../../support/Interfaces';

export const uiSchema = {
    paramsTest: {
        'ui:title': 'Свойства теста',
        vruParams: {
            'ui:title': 'Свойства ВРУ',
            freqs: {
                'ui:title': 'Список частот',
            },
            tracts: {
                'ui:title': 'Список трактов',
            },
            tone: {
                'ui:title': 'Список тонов',
            },
        },
    },
    deviceRefs: {
        'ui:title': 'Список устройств',
        workspaceDeviceRefId: { 'ui:readonly': 'true' },
    },
};

export const testCaseSchema = (
    testCase: ITestCase,
    testType: ITestCaseType,
    devRefs: IDeviceRefs,
    devices: IDevices,
) => {
    const schema: any = {
        type: 'object',
        properties: {
            nameTest: {
                title: 'Имя теста',
                type: 'string',
                default: testCase?.name,
                minLenght: 1,
            },
            descriptionsTest: {
                title: 'Описание теста',
                type: 'string',
                default: testCase?.description,
            },
            paramsTest: testType.paramsSchema,
            deviceRefs: {
                type: 'array',
                items: createRequiredDevices(testType, devRefs, devices),
            },
        },
        required: ['nameTest'],
    };

    return schema;
};
