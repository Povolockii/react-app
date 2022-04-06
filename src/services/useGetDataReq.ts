import { useEffect, useState } from 'react';
import { useAxiosRequest, CachePolicy } from 'use-axios-request';
import { deepEquals } from 'react-jsonschema-form/lib/utils';

export type ReqStatus<Data> = {
    error?: Error;
    data?: Data;
};

export function useGetDataReq<Data>(url: string, pollInterval = 1000) {
    const [state, setState] = useState<ReqStatus<Data>>({});

    const { error, data } = useAxiosRequest<Data>(`/api${url}`, {
        cache: CachePolicy.CacheFirst,
        pollInterval: pollInterval,
    });

    useEffect(() => {
        const newState = {};
        if (data) {
            Object.assign(newState, { data });
        } else if (error) {
            Object.assign(newState, { error });
        }

        if (!deepEquals(newState, state)) {
            setState(newState);
        }
    }, [url, error, data, state]);

    return state;
}
