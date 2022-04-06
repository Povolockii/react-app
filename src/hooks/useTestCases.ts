import { ITestCases } from '../support/Interfaces';
import { useGetDataReq } from '../services/useGetDataReq';

export function useTestCases(pollInterval = 1000) {
    const url = `/test-cases`;
    return useGetDataReq<ITestCases>(url, pollInterval);
}

export function useTestCasesByTestSuiteId(id: number, pollInterval = 1000) {
    const url = `/test-suites/${id}/test-cases`;
    return useGetDataReq<ITestCases>(url, pollInterval);
}
