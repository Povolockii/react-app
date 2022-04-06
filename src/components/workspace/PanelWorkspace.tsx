import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { RouterBreadcrumbs } from '../Breadcrumbs';
import { Grid, Paper, Theme } from '@material-ui/core';
import { ButtonsTestCase } from '../testCase/ButtonsTestCase';
import { urlTestCase, urlTestSuite } from '../../support/Url';
import { makeStyles, createStyles } from '@material-ui/styles';
import { ButtonsTestCases } from '../testCases/ButtonsTestCases';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        buttonsPaper: {
            marginTop: theme.spacing(4),
            marginLeft: theme.spacing(3),
            marginRight: theme.spacing(3),
            marginBottom: theme.spacing(3),
            backgroundColor: theme.palette.secondary.main,
            minHeight: '4em',
        },
        buttonsGrid: {
            marginRight: theme.spacing(3),
        },
        breadcrumbGrid: {
            marginLeft: theme.spacing(1),
        },
    }),
);

//export - панель раб. места
export const PanelWorkspace = () => {
    const classes = useStyles();
    return (
        <Paper className={classes.buttonsPaper} elevation={9}>
            <Grid className={classes.breadcrumbGrid} container spacing={3} direction="row" wrap={'nowrap'}>
                <Grid item>
                    <RouterBreadcrumbs />
                </Grid>
                <Grid className={classes.buttonsGrid} item xs container spacing={3} direction="row" justify="flex-end">
                    <Grid item>
                        <Switch>
                            <Route exact path={urlTestCase} component={ButtonsTestCase} />
                            <Route exact path={urlTestSuite} component={ButtonsTestCases} />
                        </Switch>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};
