import { IDevices } from '../support/Interfaces';
import { useGetDataReq } from '../services/useGetDataReq';

export function useDevices(pollInterval = 1000) {
    const url = `/devices`;
    return useGetDataReq<IDevices>(url, pollInterval);
}
