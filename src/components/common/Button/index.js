import React from 'react';
import { StyledButton, Loading } from './style';
import { withTheme } from '@material-ui/core';


export const Button = ({
    children,
    loading,
    ...props
}) => (
    <StyledButton disabled={loading} color="primary" variant="contained" {...props}>
        {children} {loading && <Loading />}
    </StyledButton>
);

export default withTheme(Button);
