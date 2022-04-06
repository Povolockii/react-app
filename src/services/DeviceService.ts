import { requestPost, requestDelete } from './RestRequest';

export const sendPostDevice = async (
    type: string,
    name: string,
    descriptions: string,
    properties: any,
): Promise<void> => {
    const jsonArr: any = { type, name, descriptions, properties };
    const json: string = JSON.stringify(jsonArr);
    requestPost(`/devices`, json);
};

export const sendDelDeviceById = async (id: number): Promise<void> => {
    requestDelete(`/devices/${id}`);
};
