import React, { useContext, useEffect, useRef } from 'react';
import { DevicesTable } from '../components/devices';
import { AddAliasAction, DelAliasAction, AliasBreadcrumbContext } from '../state/AliasBreadcrumbs';

//export - страница устройств
export const PageDevices = () => {
    //путь и псевдоним страницы
    const componentPath = '/findBlocks';
    const componentAlias = 'Обзор устройств';
    const contextAliasBC = useRef(useContext(AliasBreadcrumbContext));

    //----------------------------------
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
    //----------------------------------------------------

    return <DevicesTable />;
};
