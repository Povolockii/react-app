import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { TooltipWidget } from '../../Tooltip';
import { TypeInput } from '../../ModalSchemaForm';
import { testCaseSchema, uiSchema } from './Schema';
import { useDevices } from '../../../hooks/useDevices';
import { ModalSchemaForm } from '../../ModalSchemaForm';
import { IDeviceRef } from '../../../support/Interfaces';
import { useDeviceRefsByWorkspaceId } from '../../../hooks/useDeviceRefsByTestSuiteId';
import { sendPostTestCaseByTestSuiteId } from '../../../services/TestCaseService';
import { useTestCaseTypes } from '../../../hooks/useTestCaseTypes';
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
    testSuiteId: number;
}>;

//export - добавление теста
export const AddTestCase = ({ workspaceId, testSuiteId }: Props) => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);

    const deivcesStatus = useDevices();
    const testCaseTypesStatus = useTestCaseTypes();
    const deviceRefsStatus = useDeviceRefsByWorkspaceId(workspaceId);

    //open------------------
    const openForm = () => {
        setIsOpen(true);
    };
    //---------------------------------

    //submit--------------------------------------------
    const onSubmit = (nameSchema: string, data: any) => {
        if (!testCaseTypesStatus.error && testCaseTypesStatus.data) {
            const testCaseType = testCaseTypesStatus.data.find((t) => t.name === nameSchema);
            const deviceRefs = deviceRefsStatus.data;
            if (testCaseType && deviceRefs) {
                const { nameTest, descriptionsTest, propertiesTest, requiredDevices } = data;
                requiredDevices?.map((dev: any, index: number) => {
                    dev.name = testCaseType.requiredDevices[index]?.name;
                    const devRef = deviceRefs.find((d: IDeviceRef) => {
                        return d.name === dev?.workspaceDeviceRefId;
                    });
                    if (devRef && dev?.workspaceDeviceRefId) dev.workspaceDeviceRefId = devRef.id;
                });
                sendPostTestCaseByTestSuiteId(
                    testSuiteId,
                    nameTest,
                    testCaseType.id,
                    descriptionsTest,
                    propertiesTest,
                    requiredDevices,
                );
            }
        }
        setIsOpen(false);
    };
    //-----------------------------------------------------------------------

    //close---------------
    const onClose = () => {
        setIsOpen(false);
    };
    //--------------------------------

    const schemaMap: Map<string, { schema: any; uiSchema?: any }> = new Map<string, { schema: any; uiSchema?: any }>();

    //TestTypes schema
    if (!testCaseTypesStatus.error && !deviceRefsStatus.error && !deivcesStatus.error)
        if (testCaseTypesStatus.data && deviceRefsStatus.data && deivcesStatus.data) {
            const testCaseTypes = testCaseTypesStatus.data;
            const deviceRefs = deviceRefsStatus.data;
            const devices = deivcesStatus.data;
            testCaseTypes.forEach((type) => {
                const schema: any = testCaseSchema(type, deviceRefs, devices);
                schemaMap.set(type.name, { schema, uiSchema });
            });
        }

    return (
        <div style={{ textAlign: 'center' }}>
            <TooltipWidget
                title={'Добавить тест'}
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
