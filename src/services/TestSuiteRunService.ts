import { requestPost, requestDelete } from './RestRequest';

export const sendPostRunTestSuiteRunsById = async (id: number): Promise<void> => {
    const jsonArr: any = { testSuiteId: id };
    const json: string = JSON.stringify(jsonArr);
    requestPost(`/test-suite-runs/start`, json);
};

export const sendDelTestSuiteRunsById = async (id: number): Promise<void> => {
    requestDelete(`/test-suite-runs/${id}`);
};

export const sendPostCancelTestSuiteRunsById = async (id: number): Promise<void> => {
    requestPost(`/test-suite-runs/${id}/cancel`, '');
};
