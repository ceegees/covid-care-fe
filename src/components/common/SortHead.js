import React from 'react';
import {
    Grid,
    TableSortLabel,
    Tooltip
} from '@material-ui/core';

const SortHead = ({
    label,
    sortField,
    active,
    handleSort,
    // cdnUrl,
}) => (
    <>
        {sortField ? (
            <TableSortLabel>
                <Grid container direction="column" style={{ width: 'auto', padding: '1px' }}>
                    <Tooltip
                        title="ascending"
                        enterDelay={300}
                    >
                        <img
                            alt=""
                            aria-label="button"
                            role="presentation"
                            // src={`${cdnUrl}/common/${active === 'asc' ? 'up.svg' : 'arrow_up.png'} `}
                            className="s7t-sort-icon"
                            onClick={() => handleSort(sortField, 'asc')}
                        />
                    </Tooltip>
                    <Tooltip
                        title="descending"
                        enterDelay={300}
                    >
                        <img
                            alt=""
                            aria-label="button"
                            role="presentation"
                            // src={`${cdnUrl}/common/${active === 'desc' ? 'down.svg' : 'arrow_down.png'} `}
                            className="sf-sort-icon"
                            onClick={() => handleSort(`-${sortField}`, 'desc')}
                        />
                    </Tooltip>
                </Grid>
                <span style={{ width: 'max-content' }}>{label}</span>
            </TableSortLabel>
        ) : label}
    </>
);


export default SortHead;
