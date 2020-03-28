import React from 'react';
import Input from '@material-ui/core/Input';
import FieldWrapper from './FieldWrapper';

export const TextField = ({
    label,
    autoFocus,
    name,
    value,
    type = 'text',
    disabled,
    onChange,
    placeholder,
    error,
    onBlur,
    required,
    labelStyle,
    startAdornment,
    ...props
}) => (
    <FieldWrapper
        required={required}
        label={label}
        name={name}
        error={error}
        styles={labelStyle}
    >
        <Input
            id={name}
            type={type}
            name={name}
            value={value}
            autoFocus={!disabled && Boolean(autoFocus)}
            disabled={disabled}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            startAdornment={startAdornment}
            {...props}
        />
    </FieldWrapper>
);

export default TextField;
