import React from 'react';
import { Theme } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Home } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            backgroundColor: theme.palette.primary.dark,
        },
    }),
);

const Header = () => {
    const classes = useStyles();
    return (
        <div className={'header-app'}>
            <AppBar className={classes.header} position="static">
                <Tabs value={useLocation().pathname.split('/')[1]} indicatorColor="primary" textColor="primary">
                    <Tab icon={<Home />} value="" component={Link} to="/" />
                    <Tab label="Обзор устройств" value="devices" component={Link} to="/devices/" />
                    <Tab label="Рабочие места" value="workspace" component={Link} to="/workspace/" />
                    <Tab label="Справка" value="help" component={Link} to="/help/" />
                </Tabs>
            </AppBar>
        </div>
    );
};

export default Header;
