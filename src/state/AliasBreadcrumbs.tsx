import React, { useReducer } from 'react';

//export - событие добавления псевдонима
export type AddAliasAction = {
    type: 'AddAliasAction';
    componentPath: string;
    componentAlias: string;
};

//export - событие удаления псевдонима
export type DelAliasAction = {
    type: 'DelAliasAction';
    componentPath: string;
    componentAlias: string;
};

//export - событие псевдонима хлебных крошек
export type AliasAction = AddAliasAction | DelAliasAction;

//Обработка события изменения контекста хлебных крошек-------------------------
const AliasBreadcrumbReducer = (aliasMap: Map<string, string>, action: AliasAction) => {
    const newAliasMap = new Map(aliasMap);
    switch (action.type) {
        case 'AddAliasAction':
            return newAliasMap.set(action.componentPath, action.componentAlias);
        case 'DelAliasAction':
            if (newAliasMap.delete(action.componentPath)) {
                return newAliasMap;
            }
    }
    return aliasMap;
};
//-----------------------------------------------------------------------------------------

//Конекст хлебных крошек
const AliasBreadcrumbContext = React.createContext<{
    aliasMap: Map<string, string>;
    dispatch: React.Dispatch<AliasAction>;
}>({ aliasMap: new Map<string, string>(), dispatch: () => null });

//Провайдер хлебных крошек-----------------------------------
const AliasBreadcrumbProvider: React.FC = (props: any) => {
    const [aliasMap, dispatch] = useReducer(AliasBreadcrumbReducer, new Map<string, string>());

    return (
        <AliasBreadcrumbContext.Provider value={{ aliasMap: aliasMap, dispatch: dispatch }}>
            {props.children}
        </AliasBreadcrumbContext.Provider>
    );
};
//---------------------------------------------------------------------------------------

//export - ...
export { AliasBreadcrumbContext, AliasBreadcrumbReducer, AliasBreadcrumbProvider };
