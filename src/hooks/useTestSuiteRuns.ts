import { ITestSuiteRun, ITestSuiteRuns } from '../support/Interfaces';
import { useGetDataReq } from '../services/useGetDataReq';

export function useTestSuiteRunById(id: number, pollInterval = 1000) {
    const url = `/test-suite-runs/${id}`;
    return useGetDataReq<ITestSuiteRun>(url, pollInterval);
}

export function useTestSuiteRuns(pollInterval = 1000) {
    const url = `/test-suite-runs`;
    return useGetDataReq<ITestSuiteRuns>(url, pollInterval);
}
