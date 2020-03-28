import React from 'react';
import { TextField } from '@material-ui/core';
import FieldWrapper from './FieldWrapper';

export const TextArea = ({
    label,
    autoFocus,
    name,
    value,
    disabled,
    onChange,
    placeholder,
    error,
    onBlur,
    required,
    labelStyle,
    rows,
    rowsMax,
    ...props
}) => (
    <FieldWrapper
        required={required}
        label={label}
        name={name}
        error={error}
        styles={labelStyle}
    >
        <TextField
            id={name}
            type="text"
            name={name}
            value={value}
            autoFocus={!disabled && Boolean(autoFocus)}
            disabled={disabled}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            multiline
            fullWidth
            rows={rows}
            rowsMax={rowsMax}
            {...props}
        />
    </FieldWrapper>
);

export default TextArea;
