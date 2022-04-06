import React from 'react';
import { Info } from '@material-ui/icons';
import { TooltipWidget } from '../../Tooltip';
import { Button, IconButton } from '@material-ui/core';

type Props = Readonly<{
    wrapped: boolean;
}>;

//export - кнопка информации о шаге теста
export const ButtonInfoTestCaseStep = ({ wrapped }: Props) => {
    return (
        <div style={{ textAlign: 'center' }}>
            {wrapped ? (
                <Button variant="outlined" color="primary">
                    Информация о шаге выполнения теста
                </Button>
            ) : (
                <TooltipWidget
                    title={'Информация о шаге выполнения теста'}
                    drawers={
                        <IconButton size="small">
                            <Info />
                        </IconButton>
                    }
                />
            )}
        </div>
    );
};
