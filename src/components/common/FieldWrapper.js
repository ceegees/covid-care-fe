import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import InfoIcon from '@material-ui/icons/Info';
import { Tooltip, Typography } from '@material-ui/core';
import { StyledField } from './style';

export default ({
    required,
    name,
    label,
    error,
    styles,
    children,
    hint
}) => (
    <StyledField required={required} data-field={name}>
        {label && (
            <InputLabel htmlFor={name} style={styles}>
                <Typography variant="subtitle2" gutterBottom>{label}</Typography>
                {
                    hint && (
                        <Tooltip title={hint}>
                            <InfoIcon />
                        </Tooltip>
                    )
                }
            </InputLabel>
        )}
        {children}
        <Grid item xs={12} data-error>
        <Typography variant="subtitle2" gutterBottom color="error">{error}</Typography>
        </Grid>
    </StyledField>
);
