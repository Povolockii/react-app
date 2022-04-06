import { IDeviceRefs } from '../support/Interfaces';
import { useGetDataReq } from '../services/useGetDataReq';

export function useDeviceRefsByWorkspaceId(id: number, pollInterval = 1000) {
    const url = `/workspaces/${id}/device-refs`;
    return useGetDataReq<IDeviceRefs>(url, pollInterval);
}
