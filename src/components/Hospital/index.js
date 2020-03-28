import React, { useState } from 'react';
import {
    Grid,
    MenuItem,
    Typography,
    Container
} from '@material-ui/core'
import { get } from 'lodash';
import SelectField from '../common/SelectField';
import produce from "immer"
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CommonTable from '../common/Table';
import Loader from '../common/Loader';
import Pagination from '../common/Pagination';
import Dialog from '../common/Modal';
import EditHospital from './EditHospital';

export default function Hospital() {
    const [disableDistrict, setDisableDistrict] = useState(true);
    const [showEdit, setShowEdit] = useState(false);
    const [filterData, setFilterData] = useState({
        state: '',
        district: '',
        pagination: {
            page: 1,
            perPage: 10
        },
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

    const handlePagination = (pageNo, perPage) => {
        console.log(filterData.pagination.page);
        filterData.pagination.page = parseInt(pageNo, 10);
        filterData.pagination.perPage = parseInt(perPage, 10);
        setFilterData(filterData.pagination);
    }

    const closeSubsidyCreate = () => {
        setShowEdit(false);
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
            title: 'Health Facility Name',
        },
        {
            title: 'Address',
        },
        {
            title: 'Landline Number',
        },
        {
            title: 'Latitude',
        },
        {
            title: 'Longitude',
        },
        {
            title: 'Facility Type',
        },
        {
            title: 'State',
        },
        {
            title: 'District'
        },
        {
            title: 'Taluk'
        },
        {
            title: 'Normal Beds'
        },
        {
            title: 'ICU Beds'
        },
        {
            title: 'Ventilators'
        },
        {
            title: 'Rooms'
        },
        {
            title: 'General Doctors'
        },
        {
            title: 'Pediatricians'
        },
        {
            title: 'Surgeons'
        },
        {
            title: ''
        }
    ];

    let tableData = <Loader />;

    tableData = ([
        [
        'CMH Hospital',
        <span>1, 1, Chinmaya Mission Hospital Rd<br /> Opp. Krishna Temple<br />  Defence Colony<br />  560038</span>,
        '080 2528 0461',
        '12.9780° N',
        '77.6462° E',
        'Hospital',
        'Karnataka',
        'Bengaluru Rural',
        'Indiranagar',
        '200',
        '10',
        '5',
        '150',
        '50',
        '10',
        '5',
        <IconButton edge="start" color='primary' aria-label="edit" onClick={() => setShowEdit(true)}>
            <EditIcon />
        </IconButton>
        ]
    ]);
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
        <Grid container className="w3-padding">
            <Grid item xs={12}>
                <CommonTable
                    headRowCls=""
                    bodyRowCls="w3-padding"
                    labels={tableHeads}
                    tableData={tableData}
                    noContentText="No Hospital Data Found"
                />
            </Grid>
            <Grid item xs={12}>
                <Pagination
                    data={{ totalCount: 25 }}
                    onChange={handlePagination}
                    defaultPerPage={10}
                    currentPage={1}
                />
            </Grid>
        </Grid>
        {showEdit && (
             <Dialog
                isOpen
                maxWidth="md"
                fullWidth
                dialogTitle="Edit Hospital Record"
                dialogContent={(
                    <EditHospital
                        handleClose={closeSubsidyCreate}
                    />
                )}
                hideBtns
                showClose
                onClose={closeSubsidyCreate}
            />
        )
        }
    </Container>
    );
}
