import React, { useState } from 'react';
import Ajx from 'ajv';
import { Grid } from '@material-ui/core';
import { Selection } from './Selection';
import { TypeInput } from './ModalSchemaForm';
import { createButtons } from './Buttons';
import { Theme as MuiTheme } from 'rjsf-material-ui';
import { withTheme, AjvError } from 'react-jsonschema-form';

//export - событие с схемы
export enum EventSchemaForm {
    ChangeSelection = 'ChangeSelection',
    ChangeSchema = 'ChangeSchema',
}

//export - свойства схемы
export type SchemaFormProps = Readonly<{
    type: TypeInput;
    schemaMap: Map<string, { schema: any; uiSchema?: any }>;
    onChange?: (nameSchema: string, event: EventSchemaForm, value: any) => void;
    onSubmit: (nameSchema: string, value: any) => void;
    onError?: (e: any) => void;
    onClose: () => void;
}>;

//export - форма схемы
export const SchemaForm = ({
    type,
    schemaMap,
    onChange: handleChange,
    onSubmit: handleSubmit,
    onClose: handleClose,
}: SchemaFormProps) => {
    const ajv = new Ajx();

    //инициализация первичной схемой
    const initKeySchema: string = Array.from(schemaMap.keys())[0];
    const initCurrentSchema = initKeySchema ? schemaMap.get(initKeySchema) : undefined;
    const [currentItem, setCurrentItem] = useState({ key: initKeySchema, value: initCurrentSchema });

    //Событие изменения выбора комбокса------------
    const onChangeSelection = (newKey: string) => {
        let newSchema = initCurrentSchema;
        schemaMap.forEach((value, key) => {
            if (key === newKey) newSchema = value;
        });
        const validateSchema = ajv.validateSchema(newSchema?.schema);
        const validateUiSchema = ajv.validateSchema(newSchema?.uiSchema);
        if (validateSchema && validateUiSchema) setCurrentItem({ key: newKey, value: newSchema });
        else console.error(`Схема - ${newKey} некорректна!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`);
    };
    //-------------------------------------------------------

    //событие изменения схемы-----
    const onChange = (e: any) => {
        if (handleChange) handleChange(currentItem.key, EventSchemaForm.ChangeSchema, e.formData);
    };
    //-------------------------------------------

    //submit----------------------
    const onSubmit = (e: any) => {
        handleSubmit(currentItem.key, e.formData);
    };
    //------------------------------------------

    //перевод текста ошибки для пользователя----------
    const transformErrors = (errors: AjvError[]) => {
        return errors.map((error) => {
            if (error.name === 'required') error.message = 'Поле не должно быть пустым!';
            else if (error.name === 'format') error.message = 'Поле некорректно!';
            return error;
        });
    };
    //----------------------------------------------------------

    //выбор схемы--------------
    const selection = () => {
        if (schemaMap?.size < 2) {
            return <div></div>;
        }
        return (
            <Selection value={currentItem.key} values={Array.from(schemaMap?.keys())} onChange={onChangeSelection} />
        );
    };
    //----------------------------------

    const Form = withTheme(MuiTheme);
    //создание схемы------------
    const schemaForm = () => {
        let form = <div></div>;

        if (currentItem.value !== undefined) {
            form = (
                <Form
                    schema={currentItem.value.schema}
                    uiSchema={currentItem.value.uiSchema}
                    onSubmit={onSubmit}
                    onChange={onChange}
                    transformErrors={transformErrors}
                    liveValidate={true}
                    noHtml5Validate={true}
                    showErrorList={false}
                >
                    <div>{createButtons(type, handleClose)}</div>
                </Form>
            );
        }
        return form;
    };
    //---------------------------------------------------------------

    return (
        <div>
            <Grid container direction="column">
                <Grid item>{selection()}</Grid>
                <Grid item>{schemaForm()}</Grid>
            </Grid>
        </div>
    );
};
