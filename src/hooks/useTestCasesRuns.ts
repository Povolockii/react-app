import { ITestCaseRun, ITestCaseRuns } from '../support/Interfaces';
import { useGetDataReq } from '../services/useGetDataReq';

export function useTestCasesRuns(pollInterval = 1000) {
    const url = `/test-case-runs`;
    return useGetDataReq<ITestCaseRuns>(url, pollInterval);
}

export function useTestCaseRunById(id: number, pollInterval = 1000) {
    const url = `/test-case-runs/${id}`;
    return useGetDataReq<ITestCaseRun>(url, pollInterval);
}
