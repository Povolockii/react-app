import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { TooltipWidget } from '../../Tooltip';
import { workspaceSchema, uiSchema } from './Schema';
import { sendPostWorkspace } from '../../../services/WorkspaceService';
import { ModalSchemaForm, TypeInput } from '../../ModalSchemaForm';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

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
    }),
);

//export - добавить рабочее место
export const AddWorkspace = () => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);

    //open------------------
    const openForm = () => {
        setIsOpen(true);
    };
    //----------------------------

    //submit--------------------------------
    const onSubmit = (nameSchema: string, data: any) => {
        const { name } = data;
        sendPostWorkspace(name);
        setIsOpen(false);
    };
    //------------------------------------------------

    //close------------------
    const onClose = () => {
        setIsOpen(false);
    };
    //------------------------------

    const schemaMap: Map<string, { schema: any; uiSchema?: any }> = new Map<string, { schema: any; uiSchema?: any }>();

    const schema: any = workspaceSchema();
    schemaMap.set('workspace', { schema, uiSchema });

    return (
        <div>
            <TooltipWidget
                title={'Добавить рабочее место'}
                drawers={
                    <Button className={classes.button} variant="contained" color="secondary" onClick={openForm}>
                        <AddIcon fontSize="large" />
                    </Button>
                }
            />
            <ModalSchemaForm
                open={isOpen}
                type={TypeInput.Insert}
                schemaMap={schemaMap}
                onSubmit={onSubmit}
                onClose={onClose}
            />
        </div>
    );
};
