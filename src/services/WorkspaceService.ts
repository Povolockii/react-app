import { requestPost, requestDelete } from './RestRequest';

export const sendPostWorkspace = async (name: string): Promise<void> => {
    const jsonArr: any = { name };
    const json: string = JSON.stringify(jsonArr);

    requestPost(`/workspaces`, json);
};

export const sendDelWorkspaceById = async (id: number): Promise<void> => {
    requestDelete(`/workspaces/${id}`);
};
