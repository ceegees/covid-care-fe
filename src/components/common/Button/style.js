import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

export const StyledButton = styled(Button)`
    text-transform: capitalize;
    font-size: 16px;
    font-weight: 500;
    box-shadow: ${props => (props.variant !== 'text' ? '0 1px 2px 0 #dadada' : '')};
    min-width: ${props => (!props.fullWidth ? props.width : 'auto')};
    border-radius: 3px;

    &.MuiButton-contained.Mui-disabled {
        background-color: ${props => props.theme.palette.primary.main};
        color: #fff;
        opacity: 0.49; 
    }

    &.MuiButton-outlined.Mui-disabled {
        color: ${props => props.theme.palette.primary.main};
        border: 1px solid ${props => props.theme.palette.primary.main};
        opacity: 0.49;
    }

    ${(props) => {
        if (props.variant === 'outlined') {
            return `
                border: 1px solid ${props.theme.palette.primary.main};
            `;
        }
    }}
`;

export const Loading = styled(CircularProgress)`
    width: 20px !important;
    height: 20px !important;
    margin-left: 10px;
    color: ${props => props.theme.palette.text.disabled}
    
`;
