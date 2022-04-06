import React from 'react';
import { Loading } from '../Loading';
import { Grid } from '@material-ui/core';
import { ErrorMessage } from '../ErrorMessage';
import { HyperLinkWidgets } from '../HyperLinkWidget';
import { DelWorkspace } from '../workspace/DelWorkspace';
import { AddWorkspace } from '../workspace/AddWorkspace';
import { useWorkspaces } from '../../hooks/useWorkspaces';
import { IWorkspace, IWorkspaces } from '../../support/Interfaces';

//создание элементов рабочего места--------------------------------
const createWorkspaceElements = (ws: IWorkspaces) => {
    return (
        <HyperLinkWidgets
            hyperLinks={ws.map((w: IWorkspace) => {
                return { key: w.id, name: w.name, toolbar: <DelWorkspace id={w.id} />, url: '/workspace/' };
            })}
            createAddWidget={<AddWorkspace />}
        />
    );
};
//-----------------------------------------------------------------------

//export - виджет списка рабочих мест
export const WorkspacesWidget = () => {
    const requestStatus = useWorkspaces();

    if (requestStatus.error) {
        return <ErrorMessage message={requestStatus.error.message} />;
    }
    if (requestStatus.data) {
        return (
            <Grid container direction="row">
                <Grid item>{createWorkspaceElements(requestStatus.data)}</Grid>
            </Grid>
        );
    }
    return <Loading />;
};
