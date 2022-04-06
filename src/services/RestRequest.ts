export const requestPost = async (path: string, props: any) => {
    await fetch(`/api${path}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        body: props,
        method: 'POST',
    });
};

export const requestPatсh = async (path: string, props: any) => {
    await fetch(`/api${path}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        body: props,
        method: 'PATCH',
    });
};

export const requestGet = async (path: string) => {
    const response = await fetch(`/api${path}`, { method: 'GET' });
    return response;
};

export const requestDelete = async (path: string) => {
    await fetch(`/api${path}`, { method: 'DELETE' });
};
