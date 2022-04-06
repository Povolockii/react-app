import React, { useContext, useEffect, useRef } from 'react';
import { PanelWorkspace } from './PanelWorkspace';
import { WorkspaceWidget } from './WorkspaceWidget';
import { RouteComponentProps } from 'react-router-dom';
import { useWorkspaceById } from '../../hooks/useWorkspaces';
import { AddAliasAction, DelAliasAction, AliasBreadcrumbContext } from '../../state/AliasBreadcrumbs';

//export - компонент рабочего места
export const Workspace = ({ match }: RouteComponentProps<{ workspaceId: string }>) => {
    //Номер раб. места
    const workspaceId = Number(match.params.workspaceId);

    //список раб. мест от сервера
    const requestStatus = useWorkspaceById(workspaceId);

    //контекст на псевдонимы хлебных крошек
    const contextAliasBC = useRef(useContext(AliasBreadcrumbContext));

    //Имя комплекта теста
    const testSuiteName = requestStatus.data ? requestStatus.data?.name : '';

    //-----------------------------------
    useEffect(() => {
        const currentContex = contextAliasBC.current;
        if (!requestStatus.error && testSuiteName && testSuiteName.length > 0) {
            const action: AddAliasAction = {
                type: 'AddAliasAction',
                componentPath: `/workspace/${workspaceId}`,
                componentAlias: testSuiteName,
            };
            currentContex.dispatch(action);
        }
        return () => {
            if (testSuiteName && testSuiteName?.length > 0) {
                const action: DelAliasAction = {
                    type: 'DelAliasAction',
                    componentPath: `/workspace/${workspaceId}`,
                    componentAlias: testSuiteName,
                };
                currentContex.dispatch(action);
            }
        };
    }, [workspaceId, requestStatus, testSuiteName]);
    //--------------------------------------------------------------------

    return (
        <div>
            <PanelWorkspace />
            <WorkspaceWidget workspaceId={workspaceId} workspaceStatus={requestStatus} />
        </div>
    );
};
