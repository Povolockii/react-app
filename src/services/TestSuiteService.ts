import { requestPost, requestDelete } from './RestRequest';

export const sendPostTestSuiteByWorkspaceId = async (id: number, name: string, description: string): Promise<void> => {
    const jsonArr: any = { name, description };
    const json: string = JSON.stringify(jsonArr);
    requestPost(`/workspaces/${id}/add-test-suite`, json);
};

export const sendDTestSuiteById = async (id: number): Promise<void> => {
    requestDelete(`/test-suites/${id}`);
};
