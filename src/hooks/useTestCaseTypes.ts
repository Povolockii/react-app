import { ITestCaseTypes } from '../support/Interfaces';
import { useGetDataReq } from '../services/useGetDataReq';

export function useTestCaseTypes(pollInterval = 1000) {
    const url = `/test-case-types`;
    return useGetDataReq<ITestCaseTypes>(url, pollInterval);
}
