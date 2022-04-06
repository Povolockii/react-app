import { IDeviceTypes } from '../support/Interfaces';
import { useGetDataReq } from '../services/useGetDataReq';

export function useDeviceTypes(pollInterval = 1000) {
    const url = `/device-types`;
    return useGetDataReq<IDeviceTypes>(url, pollInterval);
}
