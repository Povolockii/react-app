import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { PageDevices } from './PageDevices';
import { PageWorkspaces } from './PageWorkspaces';
import { PageWelcome } from './PageWelcome';
import { AliasBreadcrumbProvider } from '../state/AliasBreadcrumbs';
import { PageHelp } from './PageHelp';

const Main = () => {
    return (
        <AliasBreadcrumbProvider>
            <Switch>
                <Route strict path="/devices/" component={PageDevices} />
                <Route path="/workspace/" component={PageWorkspaces} />
                <Route path="/help/" component={PageHelp} />
                <Route component={PageWelcome} />
            </Switch>
        </AliasBreadcrumbProvider>
    );
};

export default Main;
