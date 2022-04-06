export const uiSchema = {};

export const workspaceSchema = () => {
    const schema: any = {
        type: 'object',
        properties: {
            name: {
                title: 'Имя рабочего места',
                type: 'string',
                minLenght: 1,
            },
        },
        required: ['name'],
    };

    return schema;
};
