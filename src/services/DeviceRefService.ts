import { requestPost, requestDelete } from './RestRequest';

export const sendPostDeviceRefByWorkspaceId = async (id: number, refName: string, deviceId: number) => {
    const jsonArr: any = { refName, deviceId };
    const json: string = JSON.stringify(jsonArr);
    requestPost(`/workspaces/${id}/add-device-ref`, json);
};

export const sendDelDeviceRefByWorkspaceId = async (id: number, idRef: number) => {
    requestDelete(`/workspaces/${id}/device-refs/${idRef}`);
};
