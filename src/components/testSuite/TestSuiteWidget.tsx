import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { TestCase } from '../testCase';
import { TestCases } from '../testCases';
import { Grid } from '@material-ui/core';
import { TestSuiteRuns } from '../running/testSuiteRuns';
import { urlTestCase, urlTestSuite, urlTestSuiteRuns } from '../../support/Url';

//export - виджет комплекта теста
export const TestSuiteWidget = () => {
    //создание рабочего места-----
    return (
        <Grid container direction="row">
            <Grid item xs>
                <Switch>
                    <Route exact path={urlTestCase} component={TestCase} />
                    <Route exact path={urlTestSuite} component={TestCases} />
                    <Route path={urlTestSuiteRuns} component={TestSuiteRuns} />
                </Switch>
            </Grid>
        </Grid>
    );
};
