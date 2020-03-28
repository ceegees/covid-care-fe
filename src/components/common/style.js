import styled from 'styled-components';

export const StyledField = styled.div`
    width: 100%;
    padding: 15px 0;

    & .MuiFormLabel-root {
        display: flex;
        align-items: center;
        & span {
            color: #717171;
        }

        & .MuiSvgIcon-root {
            margin-left: 5px;
        }
    }

    & .MuiInput-root {
        width: 100%;
    }

    & .MuiInput-input::placeholder {
        color: #dadada;
    }

    & [data-error] {
        clear: both;
    }

    ${(props) => {
        if (props.required) {
            return `
            & .MuiFormLabel-root {
                & span {
                    &:after {
                        content: "*";
                        color: #c80000;
                        padding-left: 3px;
                    }
                }
            }`;
        }
    }}
`;