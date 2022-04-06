import { requestPost, requestDelete, requestPatсh } from './RestRequest';

export const sendPostTestCaseByTestSuiteId = async (
    id: number,
    name: string,
    typeId: number,
    description: string,
    params: any,
    deviceRefs: any,
): Promise<void> => {
    const jsonArr: any = { name, typeId, description, params, deviceRefs };
    const json: string = JSON.stringify(jsonArr);
    requestPost(`/test-suites/${id}/add-test-case`, json);
};

export const sendPatchTestCaseById = async (
    id: number,
    name: string,
    description: string,
    params: any,
    deviceRefs: any,
) => {
    const jsonArr: any = { name, description, params, deviceRefs };
    const json: string = JSON.stringify(jsonArr);
    requestPatсh(`/test-cases/${id}`, json);
};

export const sendDelTestCaseById = async (id: number): Promise<void> => {
    requestDelete(`/test-cases/${id}`);
};
