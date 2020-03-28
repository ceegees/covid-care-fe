import React from 'react';
import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';
import FieldWrapper from './FieldWrapper';

export const SelectField = ({
    label,
    name,
    value,
    disabled,
    onChange,
    options,
    error,
    onBlur,
    required,
    labelStyle,
    ...props
}) => (
    <FieldWrapper
        required={required}
        label={label}
        name={name}
        error={error}
        styles={labelStyle}
    >
        <Select
            id={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            displayEmpty
            name={name}
            disabled={disabled}
            {...props}
        >
           {options}
            {/* {options.map(eachOption => {
                console.log(eachOption);
                return <MenuItem
                    key={eachOption.ID}
                    value={eachOption.label}
                    disabled={eachOption.disabled}
                >
                    {eachOption.description}
                </MenuItem> */}
        </Select>
    </FieldWrapper>
);

export default SelectField;
