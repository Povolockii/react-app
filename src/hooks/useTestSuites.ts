import { ITestSuites } from '../support/Interfaces';
import { useGetDataReq } from '../services/useGetDataReq';

export function useTestSuitesByWorkspaceId(id: number, pollInterval = 1000) {
    const url = `/workspaces/${id}/test-suites`;
    return useGetDataReq<ITestSuites>(url, pollInterval);
}
