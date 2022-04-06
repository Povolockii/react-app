import React from 'react';

export type ErrorMessageProps = Readonly<{
    message: string;
}>;

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
    return (
        <div style={{ justifyContent: 'center', textAlign: 'center' }}>
            <h2>
                <div>{message}</div>
            </h2>
        </div>
    );
};
