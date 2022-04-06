import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Dialog, DialogContent } from '@material-ui/core';
import { SchemaForm, SchemaFormProps } from './SchemaForm';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeApp } from '../themes/ThemesApp';

export enum TypeInput {
    Insert = 'Добавить',
    Update = 'Обновить',
    Delete = 'Удалить',
    ToRun = 'Запустить',
    Confirm = 'Подтвердить',
}

type Props = Readonly<
    {
        open: boolean;
    } & SchemaFormProps
>;

//export - модальная форма схемы
export const ModalSchemaForm = ({ open, type, schemaMap, onChange, onSubmit, onError, onClose }: Props) => {
    const modal = document.createElement('modalSchemaForm');
    const rootModal = document.getElementById('rootModal');

    //----------------------------
    const createSchemaForm = () => {
        let form = <div></div>;
        try {
            form = (
                <SchemaForm
                    type={type}
                    schemaMap={schemaMap}
                    onChange={onChange}
                    onSubmit={onSubmit}
                    onError={onError}
                    onClose={onClose}
                />
            );
        } catch (e) {
            console.error(e);
        }
        return form;
    };
    //--------------------------------

    //----------------------------
    const createDialog = () => {
        return (
            <MuiThemeProvider theme={ThemeApp}>
                <Dialog open={open} onClose={onClose} arial-labeledby="form-dialog-title">
                    <DialogContent dividers={true}>{createSchemaForm()}</DialogContent>
                </Dialog>
            </MuiThemeProvider>
        );
    };
    //--------------------------------------------

    //------------------
    useEffect(() => {
        if (rootModal) {
            rootModal.appendChild(modal);
            ReactDOM.render(createDialog(), modal);
        }
        return () => {
            if (rootModal) {
                ReactDOM.render(<></>, modal);
                if (rootModal.contains(modal)) rootModal.removeChild(modal);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);
    //-----------------------------------------------------

    return null;
};
