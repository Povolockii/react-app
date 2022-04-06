import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { TypeInput } from './ModalSchemaForm';

type ButtonsProps = Readonly<{
    nameButton: string;
    onClose: () => void;
}>;

//export - унифицированные кнопки
export const Buttons = ({ nameButton, onClose }: ButtonsProps) => {
    //Cоздание кнопки----------------
    const create = () => {
        return (
            <Grid container spacing={4} direction="row" justify="center" alignItems="center">
                <Grid item>
                    <Button variant="outlined" color="primary" type="submit">
                        {nameButton}
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined" color="primary" onClick={onClose}>
                        Отменить
                    </Button>
                </Grid>
            </Grid>
        );
    };
    //-------------------------------------------

    return create();
};

type Props = Readonly<{
    onClose: () => void;
}>;

export const InsertButtons = ({ onClose }: Props) => {
    return <Buttons nameButton={'Добавить'} onClose={onClose} />;
};

export const UpdateButtons = ({ onClose }: Props) => {
    return <Buttons nameButton={'Обновить'} onClose={onClose} />;
};

export const DeleteButtons = ({ onClose }: Props) => {
    return <Buttons nameButton={'Удалить'} onClose={onClose} />;
};

export const ToRunButtons = ({ onClose }: Props) => {
    return <Buttons nameButton={'Запустить'} onClose={onClose} />;
};

export const ConfirmButtons = ({ onClose }: Props) => {
    return <Buttons nameButton={'Подтвердить'} onClose={onClose} />;
};

export const createButtons = (type: TypeInput, onClose: () => void) => {
    switch (type) {
        case TypeInput.Insert:
            return (
                <div>
                    <InsertButtons onClose={onClose} />
                </div>
            );
        case TypeInput.Update:
            return (
                <div>
                    <UpdateButtons onClose={onClose} />
                </div>
            );
        case TypeInput.Delete:
            return (
                <div>
                    <DeleteButtons onClose={onClose} />
                </div>
            );
        case TypeInput.ToRun:
            return (
                <div>
                    <ToRunButtons onClose={onClose} />
                </div>
            );
        case TypeInput.Confirm:
            return (
                <div>
                    <ConfirmButtons onClose={onClose} />
                </div>
            );
        default:
            throw new Error();
    }
};
