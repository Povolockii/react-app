//
export class IDeviceType {
    name = '';
    descriptions = '';
    propertiesSchema: any;
}
export type IDeviceTypes = Array<IDeviceType>;

//
export class IDevice {
    id = -1;
    type = '';
    name = '';
    descriptions = '';
    properties: Record<string, any> = Object;
    status = '';
    addedByUser = false;
}
export type IDevices = Array<IDevice>;

//
export class IDeviceRef {
    id = -1;
    name = '';
    deviceId = -1;
    workspaceId = -1;
}
export type IDeviceRefs = Array<IDeviceRef>;

//
export class IWorkspace {
    id = -1;
    name = '';
}
export type IWorkspaces = Array<IWorkspace>;

//
export class ITestCaseType {
    id = -1;
    name = '';
    description = '';
    paramsSchema: any;
    resultSchema: any;
    requiredDevices: any;
}
export type ITestCaseTypes = Array<ITestCaseType>;

//
export class ITestSuite {
    id = -1;
    name = '';
    description = '';
}
export type ITestSuites = Array<ITestSuite>;

//
export enum TestRunState {
    pending = 'pending',
    running = 'running',
    finshed = 'finshed',
}

//
export enum TestRunStatus {
    passed = 'passed',
    failed = 'failed',
    broken = 'broken',
    cancelled = 'cancelled',
    skipped = 'skipped',
}

//
export class ITestSuiteRun {
    id = -1;
    testSuiteId = -1;
    startTime = -1;
    finishTime = -1;
    state: TestRunState = TestRunState.pending;
    status: TestRunStatus = TestRunStatus.failed;
}
export type ITestSuiteRuns = Array<ITestSuiteRun>;

//
export class ITestCase {
    id = -1;
    name = '';
    typeId = -1;
    description = '';
    params: any;
    num = -1;
    deviceRefs: any;
}
export type ITestCases = Array<ITestCase>;

//
export class ITestCaseRun {
    id = -1;
    testSuiteRunId = -1;
    typeId = -1;
    num = -1;
    name = '';
    description = '';
    params: any;
    startTime = -1;
    finishTime = -1;
    state: TestRunState = TestRunState.pending;
    status: TestRunStatus = TestRunStatus.failed;
    errorString = '';
}
export type ITestCaseRuns = Array<ITestCaseRun>;

//
export class ITestCaseStep {
    id = -1;
    testCaseRunId = -1;
    tag: Array<string> = [];
    comment = '';
    num = -1;
    startTime = -1;
    finishTime = -1;
    state: TestRunState = TestRunState.pending;
    status: TestRunStatus = TestRunStatus.failed;
    params: any;
    result: any;
    errorString = '';
}
export type ITestCaseSteps = Array<ITestCaseStep>;

//конвертирование из состояния в текст--------------------
export const convertState = (state: TestRunState) => {
    switch (state) {
        case TestRunState.pending:
            return 'Ожидание';
        case TestRunState.running:
            return 'Запущен';
        case TestRunState.finshed:
            return 'Выполнен';
        default:
            return '';
    }
};
//--------------------------------------------------------------------

//конвертирование из статуса в текст--------------------
export const convertStatus = (status: TestRunStatus) => {
    switch (status) {
        case TestRunStatus.passed:
            return 'Пройден';
        case TestRunStatus.failed:
            return 'Не пройден';
        case TestRunStatus.broken:
            return 'Аварийно завершен';
        case TestRunStatus.cancelled:
            return 'Отменен';
        case TestRunStatus.skipped:
            return 'Пропущен';
        default:
            return '';
    }
};
//--------------------------------------------------------------------

//создание цвета по состоянию-----------------------------------
export const createColorRun = (status: TestRunStatus, state: TestRunState) => {
    let color = '#d32f2f';
    if (state === TestRunState.finshed) {
        if (status === TestRunStatus.passed) color = '#388e3c';
    } else if (state === TestRunState.running) {
        color = '#f57c00';
    } else if (state === TestRunState.pending) color = '';
    return color;
};
//--------------------------------------------------------------------

//Получить список доступных имен псевдонимов блоков--------------
export const avalibleDevRefNames = (devRefs: IDeviceRefs, devices: IDevices, posibleDeviceTypes: Array<string>) => {
    const allAvalibleDevRefNames = new Array<string>();
    for (const devType of posibleDeviceTypes) {
        const avalibleDevs = devices.filter((dev: IDevice) => {
            return dev.id >= 0 && devType === dev.type;
        });

        const isAvalibleDevRef = (ref: IDeviceRef) => {
            return avalibleDevs.find((dev) => dev.id === ref.deviceId);
        };

        const avalibleDevRefNames = devRefs.filter(isAvalibleDevRef).map((ref) => ref.name);
        allAvalibleDevRefNames.push(...avalibleDevRefNames);
    }
    return allAvalibleDevRefNames;
};
//--------------------------------------------------------------------

//Создать схему с данными для RequiredDevices--------------
export const createRequiredDevices = (testCaseType: ITestCaseType, devRefs: IDeviceRefs, devices: IDevices) => {
    return testCaseType?.requiredDevices?.map((item: any) => {
        const result = {
            type: 'object',
            properties: {
                workspaceDeviceRefId: {
                    title: item?.name,
                    type: 'string',
                    enum: avalibleDevRefNames(devRefs, devices, item?.posibleDeviceTypes),
                },
            },
            required: ['workspaceDeviceRefId'],
        };
        return result;
    });
};
//--------------------------------------------------------------------
