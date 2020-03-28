import React from 'react';
import { withTheme } from '@material-ui/core/styles';

const Loader = props => (
    <div className="w3-center w3-padding">
        <span
            // eslint-disable-next-line react/destructuring-assignment
            style={{ ...props.style, borderTop: `6px solid blue` }}
            className="s7t-loader w3-show-inline-block"
        />
    </div>
);

export default withTheme(Loader);
