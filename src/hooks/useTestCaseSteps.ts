import { ITestCaseSteps } from '../support/Interfaces';
import { useGetDataReq } from '../services/useGetDataReq';

export function useTestCaseSteps(pollInterval = 1000) {
    const url = `/test-case-steps`;
    return useGetDataReq<ITestCaseSteps>(url, pollInterval);
}

export function useTestCaseStepsById(id: number, pollInterval = 1000) {
    const url = `/test-case-steps/${id}`;
    return useGetDataReq<ITestCaseSteps>(url, pollInterval);
}
