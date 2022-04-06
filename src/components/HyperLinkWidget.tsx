import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Grid, Paper, Box, Button, Typography } from '@material-ui/core';

const sizeSquare = '25vh';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            minWidth: sizeSquare,
            maxWidth: sizeSquare,
            minHeight: sizeSquare,
            maxHeight: sizeSquare,
            backgroundColor: theme.palette.primary.dark,
        },
        buttonsGrid: {
            marginLeft: theme.spacing(2),
        },
        buttonPaper: {
            backgroundColor: theme.palette.secondary.main,
        },
        buttonName: {
            fontSize: 20,
        },
        buttonDescriptions: {
            fontSize: 14,
        },
    }),
);

//export - интерфейс элемента
export interface IHyperLinkWidget {
    key: number;
    name: string;
    descriptions?: string;
    color?: string;
    url: string;
    toolbar: JSX.Element;
}
export type IHyperLinkWidgets = Array<IHyperLinkWidget>;

type Props = Readonly<{
    hyperLinks: IHyperLinkWidgets;
    createAddWidget?: JSX.Element;
}>;

//export - виджет списка элементов
export const HyperLinkWidgets = ({ hyperLinks, createAddWidget }: Props) => {
    const classes = useStyles();

    //сортировка по ключу
    const sortedHyperLinkWidgets: IHyperLinkWidgets =
        hyperLinks.length > 0
            ? hyperLinks.sort((link1: IHyperLinkWidget, link2: IHyperLinkWidget) => {
                  return link2.key - link1.key;
              })
            : [];

    //---------------------
    const createWidgetHL = (w: JSX.Element | undefined, key: number) => {
        return (
            <Grid item key={key}>
                <Paper className={classes.buttonPaper}>{w}</Paper>
            </Grid>
        );
    };
    //------------------------------------

    //создание элемента--------------------------------
    const createHyperLink = (hl: IHyperLinkWidget) => {
        const hyperLink = (
            <Grid item container direction="row">
                <Grid item>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="secondary"
                        style={{ backgroundColor: hl.color }}
                        component={Link}
                        to={hl.url + hl.key}
                    >
                        <Grid item container spacing={3} alignItems="center" direction="column">
                            <Grid item>
                                <Typography className={classes.buttonName} color="textPrimary">
                                    {hl.name}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography className={classes.buttonDescriptions} color="textSecondary">
                                    {hl.descriptions}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Button>
                </Grid>
                <Grid item>
                    <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
                        {hl.toolbar}
                    </Box>
                </Grid>
            </Grid>
        );
        return createWidgetHL(hyperLink, hl.key);
    };
    //-----------------------------------------------------------------------

    //создание списка элементов-------------------------------------
    const createHyperLinks = () => {
        return (
            <div>
                <Grid className={classes.buttonsGrid} item container spacing={3} direction="row">
                    {sortedHyperLinkWidgets.map(createHyperLink)}
                    {createWidgetHL(createAddWidget, sortedHyperLinkWidgets.length)}
                </Grid>
            </div>
        );
    };
    //---------------------------------------------------------------------------

    return createHyperLinks();
};
