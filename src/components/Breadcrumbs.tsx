import React, { useContext } from 'react';
import { Route } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AliasBreadcrumbContext } from '../state/AliasBreadcrumbs';
import { Link, Breadcrumbs, Theme, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing(1),
    },
    lists: {
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing(1),
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

const LinkRouter = (props: any) => <Link {...props} component={RouterLink} />;

//export - хлебные крошки
export const RouterBreadcrumbs = () => {
    const classes = useStyles();

    //контекст на псевдонимы хлебных
    const context = useContext(AliasBreadcrumbContext);

    return (
        <div className={classes.root}>
            <Route>
                {({ location }) => {
                    const pathnames = location.pathname.split('/').filter((x) => x);

                    return (
                        <Breadcrumbs aria-label="breadcrumb">
                            {pathnames.map((value, index) => {
                                let to = value;
                                const url = `/${pathnames.slice(0, index + 1).join('/')}`;
                                context.aliasMap.forEach((v, k) => {
                                    if (url === k) to = v;
                                });
                                const isLast = index === pathnames.length - 1;
                                return isLast ? (
                                    <div key={0}>{to}</div>
                                ) : (
                                    <LinkRouter color="inherit" to={url} key={url}>
                                        <Typography color="textPrimary">{to}</Typography>
                                    </LinkRouter>
                                );
                            })}
                        </Breadcrumbs>
                    );
                }}
            </Route>
        </div>
    );
};
