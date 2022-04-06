import React from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, FormControl, Select, MenuItem, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 200,
        },
    }),
);

type Props = Readonly<{
    value: string;
    values: Array<string>;
    onChange: (newValue: string) => void;
}>;

//export - компонент выбора одного элемента из списка
export const Selection = ({ value, values, onChange }: Props) => {
    const classes = useStyles();
    return (
        <div>
            <Grid container direction="column" justify="center" alignItems="center">
                <FormControl className={classes.formControl}>
                    <Select
                        value={value}
                        onChange={(event: any) => {
                            const val = values.find((v) => v === event.target.value);
                            if (val) {
                                onChange(val);
                            }
                        }}
                    >
                        {values.map((v) => (
                            <MenuItem key={v} value={v}>
                                {v}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </div>
    );
};
