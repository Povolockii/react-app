import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { TooltipWidget } from '../../Tooltip';
import { testSuiteSchema, uiSchema } from './Schema';
import { ModalSchemaForm, TypeInput } from '../../ModalSchemaForm';
import { sendPostTestSuiteByWorkspaceId } from '../../../services/TestSuiteService';
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

type Props = Readonly<{
    workspaceId: number;
}>;

//export - добавление копмлекта тестов
export const AddTestSuite = ({ workspaceId }: Props) => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);

    //open------------------
    const openForm = () => {
        setIsOpen(true);
    };
    //------------------------------

    //submit-----------------------------------------
    const onSubmit = (nameSchema: string, data: any) => {
        const { name, description } = data;
        sendPostTestSuiteByWorkspaceId(workspaceId, name, description);
        setIsOpen(false);
    };
    //---------------------------------------------------------

    //close----------------
    const onClose = () => {
        setIsOpen(false);
    };
    //---------------------------

    const schemaMap: Map<string, { schema: any; uiSchema?: any }> = new Map<string, { schema: any; uiSchema?: any }>();
    const schema: any = testSuiteSchema();
    schemaMap.set('testSuite', { schema, uiSchema });

    return (
        <div style={{ textAlign: 'center' }}>
            <TooltipWidget
                title={'Добавить комплект тестов'}
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
