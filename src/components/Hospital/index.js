import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
    FormControl,
    Button,
    TextField,
    Paper,
    Grid,
    Select,
    InputLabel,
    MenuItem,
    Typography,
    Container
} from '@material-ui/core'
import { get } from 'lodash';
import SelectField from '../common/SelectField';
import produce from "immer"
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CommonTable from '../common/Table';
// const useStyles = makeStyles((theme) =>
//     createStyles({
//         root: {
//             '& > *': {
//                 margin: theme.spacing(1),
//             },
//         },
//     }),
// );

export default function Hospital() {
    // const classes = useStyles();
    const [disableDistrict, setDisableDistrict] = useState(true);
    const [filterData, setFilterData] = useState({
        state: '',
        district: '',
    })

    const handleSelectChange = (evt) => {
        const nextState = produce(filterData, draftState => {
            draftState[evt.target.name] = evt.target.value;
        });
        setFilterData(nextState);
        if(nextState.state) {
            setDisableDistrict(false);
        } 
    }
    let statesData = [];
    statesData = [
        {
            ID: 1,
            label: 'Kerala',
            districts: [
                {
                    stateID: 1,
                    ID: 1,
                    label: 'Kannur',
                },
                {
                    stateID: 1,
                    ID: 2,
                    label: 'Kozhikode',
                }
            ]
            
        },
        {
            ID: 2,
            label: 'Karnataka',
            districts: [
                {
                    stateID: 2,
                    ID: 1,
                    label: 'Bengaluru Rural',
                },
                {   
                    stateID: 2,
                    ID: 2,
                    label: 'Mysuru',
                }
            ]
        },
    ];
    let filterDistrictData = [];
    const districtData = statesData.map(item => item.districts);
    filterDistrictData = districtData.filter((item, idx) => item[idx].stateID === filterData.state);


    const tableHeads = [
        {
            title: 'Subsidy Name',
        },
        {
            title: 'Type',
        },
        {
            title: 'Amount',
        },
        {
            title: 'From',
        },
        {
            title: 'To',
        },
        {
            title: 'Status',
        },
        {
            title: 'Created by',
        }
    ];
// console.log("statesData", get(filterDistrictData, 'length') && filterDistrictData[0].map(item => item.ID));
    return (
    <Container fixed padding={2}>
        <Grid container className="w3-margin">
            <Grid item xs={12}>
                <Typography variant="h4">Hospitals</Typography>
            </Grid>
        </Grid>
        <Grid container className="w3-margin" spacing={4}>
            <Grid item xs={3}>
                <SelectField
                    label="State"
                    name="state"
                    value={filterData.state}
                    onChange={handleSelectChange}
                    options={
                        statesData.map(eachOption => (
                            <MenuItem
                                key={eachOption.ID}
                                value={eachOption.ID}
                            >
                                {eachOption.label}
                            </MenuItem> 
                        ))
                    }
                />     
             </Grid>
             <Grid item xs={3}>
                <SelectField
                    label="District"
                    name="district"
                    value={filterData.district}
                    onChange={handleSelectChange}
                    disabled={disableDistrict}
                    options={
                        get(filterDistrictData, 'length') && filterDistrictData[0].map(eachOption => (
                            <MenuItem
                                key={eachOption.ID}
                                value={eachOption.ID}
                            >
                                {eachOption.label}
                            </MenuItem> 
                        ))
                    }
                />     
            </Grid>
        </Grid>
        <Grid container className="w3-margin">
            <CommonTable
                headRowCls=""
                bodyRowCls="w3-padding"
                labels={tableHeads}
                // tableData={tableData}
                noContentText=""
            />
        </Grid>
    </Container>
    );
}
