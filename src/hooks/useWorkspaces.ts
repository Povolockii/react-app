import { IWorkspace, IWorkspaces } from '../support/Interfaces';
import { useGetDataReq } from '../services/useGetDataReq';

export function useWorkspaces(pollInterval = 1000) {
    const url = `/workspaces`;
    return useGetDataReq<IWorkspaces>(url, pollInterval);
}

export function useWorkspaceById(id: number, pollInterval = 1000) {
    const url = `/workspaces/${id}`;
    return useGetDataReq<IWorkspace>(url, pollInterval);
}
