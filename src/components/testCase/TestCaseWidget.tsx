import React from 'react';
import { ITestCase } from '../../support/Interfaces';
import { Theme, Paper, Grid } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        name: {
            fontSize: 25,
            alignItems: 'center',
            justifyItems: 'center',
            margin: theme.spacing(1),
            color: theme.palette.primary.contrastText,
        },
        description: {
            fontSize: 20,
            margin: theme.spacing(1),
            color: theme.palette.secondary.contrastText,
        },
        params: {
            fontSize: 19,
            margin: theme.spacing(1),
            color: theme.palette.secondary.contrastText,
        },
        paper: {
            backgroundColor: theme.palette.primary.light,
        },
    }),
);

type Props = Readonly<{
    testCase: ITestCase;
}>;

//export - создание таблицы теста
export const TableTestCaseWidget = ({ testCase }: Props) => {
    const classes = useStyles();

    //-----------------------------
    const createName = () => {
        const name = `Тест: ${testCase?.name}`;
        return <div className={classes.name}>{name}</div>;
    };
    //-----------------------------------------------

    //-------------------------------
    const createDescription = () => {
        const description = `Описание: ${testCase?.description}`;
        return testCase?.description ? <div className={classes.description}>{description}</div> : <></>;
    };
    //--------------------------------------------------

    //----------------------------------
    //TODO: refactoring in the future
    const createParams = () => {
        //формирование списка параметров
        const fillParams = (anyParams: any, result: Array<JSX.Element>) => {
            for (const param in anyParams) {
                let value = anyParams[param];
                if (Array.isArray(value)) {
                    value = value.map((v) => {
                        return ` ${v}`;
                    });
                } else if (Object.keys(value)?.length > 1 && typeof value !== 'string') {
                    fillParams(value, result);
                    continue;
                }
                result.push(<div className={classes.params}>{`${param}: ${value}`}</div>);
            }
        };

        const jsxParams: Array<JSX.Element> = [];
        fillParams(testCase?.params, jsxParams);
        return jsxParams;
    };
    //----------------------------------------------------------

    return (
        <Paper className={classes.paper}>
            <Grid key={0} container direction="column">
                <Grid item>{createName()}</Grid>
                <Grid item>{createDescription()}</Grid>
                <Grid item>
                    <div className={classes.description}>Параметры: </div>
                    {createParams()}
                </Grid>
            </Grid>
        </Paper>
    );
};
