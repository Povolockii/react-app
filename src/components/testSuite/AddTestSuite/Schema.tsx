export const uiSchema = {};

export const testSuiteSchema = () => {
    const schema: any = {
        type: 'object',
        properties: {
            name: {
                title: 'Имя',
                type: 'string',
                minLenght: 1,
            },
            description: {
                title: 'Описание',
                type: 'string',
            },
        },
        required: ['name'],
    };

    return schema;
};
