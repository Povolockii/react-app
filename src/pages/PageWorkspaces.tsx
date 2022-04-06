import React, { useContext, useEffect, useRef } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Workspaces } from '../components/workspaces';
import { Workspace } from '../components/workspace';
import { AddAliasAction, DelAliasAction, AliasBreadcrumbContext } from '../state/AliasBreadcrumbs';

//export - страница рабочих мест
export const PageWorkspaces = () => {
    //путь и псевдоним страницы
    const componentPath = '/workspace';
    const componentAlias = 'Рабочие места';
    const contextAliasBC = useRef(useContext(AliasBreadcrumbContext));

    //-----------------------------------------------------
    useEffect(() => {
        const currentContex = contextAliasBC.current;
        const action: AddAliasAction = {
            type: 'AddAliasAction',
            componentPath: componentPath,
            componentAlias: componentAlias,
        };
        currentContex.dispatch(action);
        return () => {
            const action: DelAliasAction = {
                type: 'DelAliasAction',
                componentPath: componentPath,
                componentAlias: componentAlias,
            };
            currentContex.dispatch(action);
        };
    }, []);
    //--------------------------------------------------------------

    return (
        <Switch>
            <Route exact path="/workspace" component={Workspaces} />
            <Route path="/workspace/:workspaceId" component={Workspace} />
        </Switch>
    );
};
