/* eslint-disable space-before-blocks */
import React, { Component, Fragment } from 'react';
import Pagination from '.';

class WithPagination extends Component{
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(page, perPage){
        const { onChange } = this.props;
        onChange({
            pagination: {
                page,
                perPage
            }
        });
    }

    render() {
        const { data, children } = this.props;
        return (
            <Fragment>
                {children}
                <Pagination onChange={this.handleChange} data={data} />
            </Fragment>
        );
    }
}

export default WithPagination;
