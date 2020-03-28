import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Table,
    Paper,
    TableRow,
    TableBody,
    TableCell,
    TableHead,
    Typography
} from '@material-ui/core';
import {
    withStyles,
    withTheme
} from '@material-ui/core/styles';
// import {
//     getPrimaryColor,
//     getSecondaryColor
// } from '../../utils';
import SortHead from './SortHead';
import Loader from './Loader';

const styles = {
    head: {
        fontSize: '16px',
    },
    body: {
        fontSize: '14px'
    }
};

class CommonTable extends Component {
    constructor(args) {
        super(args);

        this.state = {
            activeRow: null
        };

        // this.mouseEntered = this.mouseEntered.bind(this);
        this.rowClicked = this.rowClicked.bind(this);
        // this.mouseLeft = this.mouseLeft.bind(this);
    }

    // mouseEntered(activeRow) {
    //     const {
    //         enableHover
    //     } = this.props;

    //     if (enableHover) {
    //         this.setState({ activeRow });
    //     }
    // }

    // mouseLeft() {
    //     const {
    //         enableHover
    //     } = this.props;

    //     if (enableHover) {
    //         this.setState({ activeRow: null });
    //     }
    // }

    rowClicked(rowData, rowIdx) {
        const {
            onRowClick,
        } = this.props;

        onRowClick(rowData, rowIdx);
    }

    render() {
        const {
            headCellProps,
            bodyCellProps,
            // enableHover,
            bodyRowCls,
            bodyRowCellCls,
            headRowCls,
            tableData,
            tableCls,
            labels,
            noContentText,
            handleSort,
            classes,
            headerPadding
        } = this.props;
        const {
            activeRow
        } = this.state;
        let tableContent = (
            <TableRow key="loader" align="center" className="w3-center s7t-waitlistCard-tableRow">
                <TableCell align="center" colSpan={labels.length}>
                    <Loader />
                </TableCell>
            </TableRow>
        );
        // const borderColor = getPrimaryColor(this.props);
        if (tableData) {
            if (tableData.length) {
                tableContent = (
                    tableData.map((eachRow, rowIdx) => (
                        <TableRow
                            key={`common-table-row-${rowIdx}}`}
                            className={bodyRowCls}
                            style={{ cursor: 'auto' }}
                            // onMouseEnter={() => { this.mouseEntered(rowIdx); }}
                            // onMouseLeave={() => { this.mouseLeft(); }}
                            onClick={() => { this.rowClicked(eachRow, rowIdx); }}
                        >
                            {eachRow.map((eachCell, cellIdx) => {
                                if (cellIdx + 1 > labels.length) {
                                    return;
                                }

                                let cellStyle = {};

                                // if (enableHover && activeRow === rowIdx) {
                                //     if (cellIdx === 0) {
                                //         cellStyle.borderLeft = `2px solid ${borderColor}`;
                                //         cellStyle.borderBottom = cellStyle.borderLeft;
                                //         cellStyle.borderTop = cellStyle.borderLeft;
                                //     } else if (cellIdx === eachRow.length - 1) {
                                //         cellStyle.borderRight = `2px solid ${borderColor}`;
                                //         cellStyle.borderBottom = cellStyle.borderRight;
                                //         cellStyle.borderTop = cellStyle.borderRight;
                                //     } else {
                                //         cellStyle.borderBottom = `2px solid ${borderColor}`;
                                //         cellStyle.borderTop = cellStyle.borderBottom;
                                //     }
                                // }
                                if (bodyCellProps && bodyCellProps.style) {
                                    cellStyle = Object.assign(cellStyle, bodyCellProps.style);
                                    delete bodyCellProps.style;
                                }

                                return (
                                    <TableCell
                                        classes={{
                                            body: classes.body
                                        }}
                                        className={`${bodyRowCellCls} s7t-font-14 s7t-text-no-wrap`}
                                        key={`eachCell-${rowIdx}-${cellIdx}`}
                                        style={cellStyle}
                                        {...bodyCellProps}
                                    >
                                        {eachCell}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    ))
                );
            } else if (tableData.length === 0) {
                tableContent = (
                    <TableRow key="no-content" align="center" className="w3-center s7t-waitlistCard-tableRow">
                        <TableCell align="center" colSpan={labels.length}>
                            <Typography variant="h5" className="w3-center s7t-data-font">{noContentText}</Typography>
                        </TableCell>
                    </TableRow>
                );
            } else {
                tableContent = (
                    <TableRow key="no-content" align="center" className="w3-center s7t-waitlistCard-tableRow">
                        <TableCell align="center" colSpan={labels.length}>
                            <Loader />
                        </TableCell>
                    </TableRow>
                );
            }
        }

        return (
            <Paper elevation={0} className="s7t-overflow s7t-table-overflow">
                <Table className={`s7t-common-table ${tableCls}`}>
                    <TableHead
                        style={{
                            background: '#87CEFA',
                        }}
                    >
                        <TableRow key="common-table-head" className={headRowCls}>
                            {labels.map((eachLabel, idx) => (
                                <TableCell
                                    classes={{
                                        head: classes.head
                                    }}
                                    className={headerPadding}
                                    key={`${eachLabel.title}-${idx}`}
                                    {...headCellProps}
                                >
                                    <SortHead
                                        key={`${eachLabel.title}-${idx}`}
                                        label={eachLabel.title}
                                        active={eachLabel.active}
                                        sortField={eachLabel.sortField}
                                        handleSort={handleSort}
                                    />
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableContent}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

CommonTable.defaultProps = {
    headCellProps: {},
    noContentText: "No Data Found",
    bodyCellProps: {},
    headRowCls: '',
    bodyRowCls: '',
    onRowClick: () => {},
    // enableHover: false,
    tableCls: '',
    tableData: []
};

CommonTable.propTypes = {
    headCellProps: PropTypes.objectOf(PropTypes.string),
    bodyCellProps: PropTypes.shape({
        style: PropTypes.objectOf(PropTypes.string),
    }),
    headRowCls: PropTypes.string,
    bodyRowCls: PropTypes.string,
    tableCls: PropTypes.string,
    // enableHover: PropTypes.bool,
    onRowClick: PropTypes.func,
    labels: PropTypes.arrayOf(PropTypes.shape).isRequired,
    tableData: PropTypes.arrayOf(
        PropTypes.array
    ),
    noContentText: PropTypes.string
};

export default withTheme(
    withStyles(styles)(CommonTable)
);
