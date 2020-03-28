import React, { Component } from 'react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import {
    Grid,
    InputLabel,
    Select,
    OutlinedInput,
    MenuItem,
} from '@material-ui/core/';

const styles = {
    root: {
        backgroundColor: 'white',
        width: '65px',
        height: '28px',
    },
    select: {
        backgroundColor: 'white',
        border: '1px solid #B3ADAC',
    },
    selectMenu: {
        padding: '0',
        paddingTop: '8px',
        paddingRight: '12px',
        textAlign: 'center'
    }
};

class Pagination extends Component {
    constructor(args) {
        super(args);
        let rowsPerPage = 10;
        let currentPage = 1;

        const { defaultPerPage, currentPage: cPage } = this.props;
        if (defaultPerPage) {
            rowsPerPage = defaultPerPage;
        }

        if (cPage) {
            currentPage = cPage;
        }
        this.state = {
            currentPage,
            rowsPerPage,
        };

        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.renderNavigationBtn = this.renderNavigationBtn.bind(this);
    }

    getPageNumbers() {
        const { rowsPerPage, currentPage } = this.state;
        const { data } = this.props;
        const totalPage = Math.ceil(data.totalCount / rowsPerPage);
        const pageNumbers = [];

        if (totalPage === 0) {
            return [1];
        }

        if (currentPage === 1 && currentPage === totalPage) {
            pageNumbers.push(currentPage);
        } else if (currentPage === totalPage) {
            let tempPage = currentPage;
            let pageLimit = 3;
            while (tempPage >= 1 && pageLimit > 0) {
                pageNumbers.push(tempPage);
                tempPage--;
                pageLimit--;
            }
        } else {
            pageNumbers.push(currentPage);
            if (currentPage > 1) {
                pageNumbers.push(currentPage - 1);
                if (currentPage + 1 <= totalPage) {
                    pageNumbers.push(currentPage + 1);
                }
            } else {
                pageNumbers.push(currentPage + 1);
                if (currentPage + 2 <= totalPage) {
                    pageNumbers.push(currentPage + 2);
                }
            }
        }


        return pageNumbers.sort((a, b) => a - b);
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(newProps) {
        const { defaultPerPage, currentPage } = this.props;

        if (
            defaultPerPage !== newProps.defaultPerPage
            || currentPage !== newProps.currentPage
        ) {
            this.setState({
                rowsPerPage: newProps.defaultPerPage,
                currentPage: newProps.currentPage
            });
        }
    }

    handleChangeRowsPerPage(e) {
        const { onChange } = this.props;
        const { value } = e.target;

        this.setState({
            currentPage: 1,
            rowsPerPage: value
        }, () => {
            const { currentPage, rowsPerPage } = this.state;
            onChange(currentPage, rowsPerPage);
        });
    }

    handleChangePage(evt, action) {
        const { onChange, data } = this.props;
        const { rowsPerPage, currentPage } = this.state;
        let newPage = 1;
        const totalPage = Math.ceil(data.totalCount / rowsPerPage);

        switch (action) {
        case 'prev':
            newPage = currentPage - 1;
            break;

        case 'next':
            newPage = currentPage + 1;
            break;

        case 'last':
            newPage = totalPage;
            break;

        default:
            break;
        }

        this.setState({
            currentPage: newPage
        }, () => onChange(newPage, rowsPerPage));
    }

    goToPage(e, page) {
        const { onChange } = this.props;
        this.setState({
            currentPage: page
        }, () => {
            const { rowsPerPage, currentPage } = this.state;
            onChange(currentPage, rowsPerPage);
        });
    }

    renderNavigationBtn(label, disabled) {
        const { theme } = this.props;
        return (
            <Grid item xs={2} className="w3-center">
                <InputLabel
                    onClick={e => (disabled ? false : this.handleChangePage(e, label.toLowerCase()))}
                    className={`sf-page-nav sf-cursor ${!disabled ? 'sf-cursor' : 'sf-non-clickable'}`}
                    style={{ color: !disabled ? theme.palette.primary.main : '' }}
                >
                    {label}
                </InputLabel>
            </Grid>
        );
    }

    render() {
        const { data, classes, theme } = this.props;
        const totalCount = get(data, 'totalCount', 0);
        if (!totalCount) {
            return null;
        }
        const { rowsPerPage, currentPage } = this.state;
        const totalPage = Math.ceil(totalCount / rowsPerPage);
        const pageNumbers = this.getPageNumbers();
        const firstBtnDisable = currentPage === 1;
        const prevBtnDisable = currentPage - 1 <= 1;
        const nextBtnDisable = currentPage + 1 >= totalPage;
        const lastBtnDisable = totalPage === 0 || currentPage === totalPage;
        const perPageOptions = [10, 25, 50, 100];
        // find the maxRange of total count..
        let maxPageValue;
        if (totalCount < perPageOptions[0]) {
            maxPageValue = perPageOptions[0];
        }
        if (totalCount > perPageOptions[perPageOptions.length - 1]) {
            maxPageValue = perPageOptions[perPageOptions.length - 1];
        }
        if (!maxPageValue) {
            // the max value is in between our options.. so lets find that
            for (let i = 0, length = perPageOptions.length; i < length - 1; i++) {
                const min = perPageOptions[i];
                const max = perPageOptions[i + 1];
                if (totalCount > min && totalCount < max) {
                    maxPageValue = max;
                    break;
                }
            }
        }
        // It should not be the case, if it's true then we are really having some other issue but end-user still can see all the records by using pagination.
        if (!maxPageValue) {
            maxPageValue = perPageOptions[0];
        }
        return (
            <Grid container className="sf-pagination w3-margin-top">
                <Grid item xs={12} md={6}>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <Grid container spacing={1}>
                                <Grid item xs={6} className="sf-auto-margin">
                                    <InputLabel>
                                        Show:
                                    </InputLabel>
                                </Grid>
                                <Grid item xs={6}>
                                    <Select
                                        displayEmpty
                                        classes={{
                                            select: classes.select,
                                            selectMenu: classes.selectMenu,
                                            root: classes.root
                                        }}
                                        disabled={!totalCount}
                                        value={rowsPerPage}
                                        onChange={this.handleChangeRowsPerPage}
                                        input={(
                                            <OutlinedInput
                                                name="rowsPerPage"
                                                labelWidth={0}
                                                id="outlined-rows"
                                            />
                                        )}
                                    >
                                        {perPageOptions.map(perPage => (
                                            <MenuItem
                                                disabled={perPage > maxPageValue}
                                                value={perPage}
                                            >
                                                {perPage}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6} className="sf-auto-margin">
                            <InputLabel className="label">
                                {`${get(data, 'totalLabel', '') || 'Total'}: ${totalCount}`}
                            </InputLabel>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6} md={6} className="sf-auto-margin">
                    <Grid container spacing={2}>
                        {this.renderNavigationBtn('First', firstBtnDisable)}
                        {this.renderNavigationBtn('Prev', prevBtnDisable)}
                        <Grid item xs={4}>
                            <div className="sf-page-no-container">
                                {pageNumbers.map(pageNo => (
                                    <span
                                        key={`page_${pageNo}`}
                                        onKeyDown={undefined}
                                        tabIndex={0}
                                        role="link"
                                        style={{ backgroundColor: currentPage === pageNo ? theme.palette.primary.main : '', margin: 'auto' }}
                                        className={`sf-cursor ${currentPage === pageNo ? 'sf-current-page' : 'sf-page-no'}`}
                                        onClick={e => this.goToPage(e, pageNo)}
                                    >
                                        {pageNo}
                                    </span>
                                ))}
                            </div>
                        </Grid>
                        {this.renderNavigationBtn('Next', nextBtnDisable)}
                        {this.renderNavigationBtn('Last', lastBtnDisable)}
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

Pagination.defaultProps = {
    data: {
        totalCount: 0,
        totalLabel: 'Total'
    }
};

Pagination.propTypes = {
    data: PropTypes.shape({
        totalCount: PropTypes.number.isRequired,
        totalLabel: PropTypes.string
    }),
    onChange: PropTypes.func.isRequired,
};

export default withTheme(
    withStyles(styles)(Pagination)
);
