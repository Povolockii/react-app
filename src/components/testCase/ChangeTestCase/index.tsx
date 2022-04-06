import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { testCaseSchema, uiSchema } from './Schema';
import { useDevices } from '../../../hooks/useDevices';
import { useTestCases } from '../../../hooks/useTestCases';
import { ModalSchemaForm, TypeInput } from '../../ModalSchemaForm';
import { sendPatchTestCaseById } from '../../../services/TestCaseService';
import { useTestCaseTypes } from '../../../hooks/useTestCaseTypes';
import { useDeviceRefsByWorkspaceId } from '../../../hooks/useDeviceRefsByTestSuiteId';

type Props = Readonly<{
    workspaceId: number;
    testCaseId: number;
}>;

//export - редактирование теста
export const ChangeTestCase = ({ workspaceId, testCaseId }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    //список устройств и псевдонимов
    const deivcesStatus = useDevices();
    const deviceRefsStatus = useDeviceRefsByWorkspaceId(workspaceId);

    //список тестов и типов тестов
    const testCasesStatus = useTestCases();
    const testCaseTypesStatus = useTestCaseTypes();

    //open------------------
    const openForm = () => {
        setIsOpen(true);
    };
    //----------------------------

    //submit-----------------
    const onSubmit = (nameSchema: string, data: any) => {
        if (!testCaseTypesStatus.error && testCaseTypesStatus.data)
            if (!deviceRefsStatus.error && deviceRefsStatus.data) {
                const resDeviceRefs = deviceRefsStatus.data;
                const testCaseType = testCaseTypesStatus.data.find((t) => t.name === nameSchema);
                if (testCaseType) {
                    const { nameTest, descriptionsTest, paramsTest, deviceRefs } = data;
                    deviceRefs?.map((dev: any, index: number) => {
                        dev.name = testCaseType.requiredDevices[index]?.name;
                        const devRef = resDeviceRefs.find((d) => {
                            return d.name === dev?.workspaceDeviceRefId;
                        });
                        if (devRef && dev?.workspaceDeviceRefId) dev.workspaceDeviceRefId = devRef.id;
                    });
                    sendPatchTestCaseById(testCaseId, nameTest, descriptionsTest, paramsTest, deviceRefs);
                }
            }
        setIsOpen(false);
    };
    //-----------------------------

    //close---------------
    const onClose = () => {
        setIsOpen(false);
    };
    //-----------------------------

    const schemaMap: Map<string, { schema: any; uiSchema?: any }> = new Map<string, { schema: any; uiSchema?: any }>();
    if (!deviceRefsStatus.error && !deivcesStatus.error && !testCasesStatus.error && !testCaseTypesStatus.error)
        if (deviceRefsStatus.data && testCasesStatus.data && testCaseTypesStatus.data && deivcesStatus.data) {
            const test = testCasesStatus.data.find((test) => test.id === testCaseId);
            if (test) {
                const type = testCaseTypesStatus.data.find((type) => test.typeId === type.id);
                if (type) {
                    const schema: any = testCaseSchema(test, type, deviceRefsStatus.data, deivcesStatus.data);
                    schemaMap.set(test.name, { schema, uiSchema });
                }
            }
        }

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={openForm}>
                Изменить тест
            </Button>
            <ModalSchemaForm
                open={isOpen}
                type={TypeInput.Update}
                schemaMap={schemaMap}
                onSubmit={onSubmit}
                onClose={onClose}
            />
        </div>
    );
};
