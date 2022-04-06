import React from 'react';
import { Loading } from '../Loading';
import { TestSuite } from '../testSuite';
import { TestSuites } from '../testSuites';
import { ErrorMessage } from '../ErrorMessage';
import { DeviceRefsTable } from '../deviceRefs';
import { Switch, Route } from 'react-router-dom';
import { IWorkspace } from '../../support/Interfaces';
import { Paper, Grid, Theme } from '@material-ui/core';
import { ReqStatus } from '../../services/useGetDataReq';
import { AddRefDevice } from '../deviceRefs/AddRefDevice';
import { makeStyles, createStyles } from '@material-ui/styles';
import { urlTestSuite, urlWorkspace } from '../../support/Url';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        AddDevRefTable: {
            backgroundColor: theme.palette.primary.light,
            marginLeft: theme.spacing(3),
            marginRight: theme.spacing(3),
        },
    }),
);

type Props = Readonly<{
    workspaceId: number;
    workspaceStatus: ReqStatus<IWorkspace>;
}>;

//export - виджет рабочего места
export const WorkspaceWidget = ({ workspaceId, workspaceStatus }: Props) => {
    const classes = useStyles();

    if (workspaceStatus.error) {
        return <ErrorMessage message={workspaceStatus.error.message} />;
    }
    if (workspaceStatus.data) {
        return (
            <Grid container direction="row">
                <Grid item xs>
                    <Switch>
                        <Route path={urlTestSuite} component={TestSuite} />
                        <Route path={urlWorkspace} component={TestSuites} />
                    </Switch>
                </Grid>
                <Grid item>
                    <DeviceRefsTable workspaceId={workspaceId} />
                    <Paper className={classes.AddDevRefTable}>
                        <AddRefDevice workspaceId={workspaceId} wrapped={false} />
                    </Paper>
                </Grid>
            </Grid>
        );
    }
    return <Loading />;
};
