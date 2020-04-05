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
} from '@material-ui/core'

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import clsx from 'clsx';
import produce from "immer"
import axios from 'axios';
import RemoteSelect from '../common/RemoteSelect';
import PassInfo from './PassInfo';
 
const useStyles = makeStyles((theme) =>
    createStyles({
        textInput: {
            width: '100%',
        },
        formRoot: {
            flexDirection: 'row'
        },
        captalize: {
            textTransform: 'capitalize'
        },
        formControlRoot: {
            padding: `0px ${theme.spacing(1)}px`
        },
        saveButton: {
            padding: theme.spacing(1),
        },
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    }),
);

const wrapProps = {
    item: true,
    xs: 12,
    md: 6,
    lg: 6
};

export default function TravelPass() {

    const reasons = [
        'Essential Food Supplies',
        'Medical Checkup',
        'Transportation & Logistics',
        'Volunteer',
        'Chemist',
        'Print & Electronic Media',
        'Bank & ATM',
        'Other'
    ];
    const states = [
        { "name": "ANDAMAN AND NICOBAR ISLANDS", "code": "35" },
        { "name": "ANDHRA PRADESH", "code": "28" },
        { "name": "ARUNACHAL PRADESH", "code": "12" },
        { "name": "ASSAM", "code": "18" },
        { "name": "BIHAR", "code": "10" },
        { "name": "CHHATTISGARH", "code": "22" },
        { "name": "DADRA AND NAGAR HAVELI", "code": "26" },
        { "name": "DAMAN AND DIU", "code": "25" },
        { "name": "DELHI", "code": "7" },
        { "name": "GOA", "code": "30" },
        { "name": "GUJARAT", "code": "24" },
        { "name": "HARYANA", "code": "6" },
        { "name": "HIMACHAL PRADESH", "code": "2" },
        { "name": "JAMMU AND KASHMIR", "code": "1" },
        { "name": "JHARKHAND", "code": "20" },
        { "name": "KARNATAKA", "code": "29" },
        { "name": "KERALA", "code": "32" },
        { "name": "LADAKH", "code": "37" },
        { "name": "LAKSHADWEEP", "code": "31" },
        { "name": "MADHYA PRADESH", "code": "23" },
        { "name": "MAHARASHTRA", "code": "27" },
        { "name": "MANIPUR", "code": "14" },
        { "name": "MEGHALAYA", "code": "17" },
        { "name": "MIZORAM", "code": "15" },
        { "name": "NAGALAND", "code": "13" },
        { "name": "ODISHA", "code": "21" },
        { "name": "PUDUCHERRY", "code": "34" },
        { "name": "PUNJAB", "code": "3" },
        { "name": "RAJASTHAN", "code": "8" },
        { "name": "SIKKIM", "code": "11" },
        { "name": "TAMIL NADU", "code": "33" },
        { "name": "TELANGANA", "code": "36" },
        { "name": "TRIPURA", "code": "16" },
        { "name": "UTTARAKHAND", "code": "5" },
        { "name": "UTTAR PRADESH", "code": "9" },
        { "name": "WEST BENGAL", "code": "19" }
    ];

    const classes = useStyles(); 
    const [inFlight, setInFlight] = useState(false); 
    const [lbLoadConfig, setLbLoadConfig] = useState({ params: { category: "village", pId: "0" } })
    const [distLoadConfig, setDistLoadConfig] = useState({ params: { category: "district", pCode: "32" } })
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        requestAt: new Date().getTime(),
        govtIdType: 'Driving Licence',
        govtId: '',
        dateFrom: '',
        dateTo: '',
        reason: '',
        status: '',
        timeFrom:'',
        timeTo:'',
        information:'',
        localBody: null,
        token: null,
        district: null,
        state: 'KERALA',
        country: 'India',
        numberOfPassengers: 0,
        routes: [
            {
                locationFrom: '',
                locationTo: ''
            } 
        ]
    });
    const [respData,setRespData] = useState(null);
    
    const onFormSubmit = (evt) => {
        evt.preventDefault();
        setInFlight(true);

        if (!formData.token) {
            axios.post('/apiv1/pass/otp-request', {
                phoneNumber: formData.phoneNumber
            }).then((resp) => {
                const nextState = produce(formData, draftState => {
                    draftState.token = resp.data.data.token
                });
                setFormData(nextState);
                setInFlight(false);
            }).catch(ex => {
                alert(ex.message);
            });
            return;
        }

        axios.post('/apiv1/pass/travel-request',
            formData
        ).then((resp) => {
            setInFlight(false);
            resp = resp.data;
            if (!resp.meta.success){
                alert(resp.meta.message);
                return
            }
            if (resp && resp.data) { 
                setRespData(resp.data);
            }
        }).catch(ex => {
            setInFlight(false)
            alert(ex.message);
        });
    }

    const onRouteChange = (evt, idx) => {
        const nextState = produce(formData, draftState => {
            draftState.routes[idx][evt.target.name] = evt.target.value
        });
        setFormData(nextState);
    }

    const onRemoveRoute = (idx) => {
        const nextState = produce(formData, draftState => {
            draftState.routes.splice(idx, 1);
        }); 
        setFormData(nextState);
    }

    const onAddRoute = () => {
        const nextState = produce(formData, draftState => {
            draftState.routes.push({
                locationFrom: '',
                locationTo: ''
            });
        });
        setFormData(nextState);
    }

    const onAcChange = (name, obj) => {
        const nextState = produce(formData, draftState => {
            draftState[name] = obj;
        });
        setFormData(nextState);
    }

    const onChange = (evt) => {
        const nextState = produce(formData, draftState => {
            draftState[evt.target.name] = evt.target.value;
        });
        setFormData(nextState);
    }

    useEffect(() => {
        const st = states.find(item => item.name === formData.state);
        if (st) {
            const nextState = produce(formData, draftState => {
                draftState.district = null;
            });
            setFormData(nextState);
            setDistLoadConfig({ params: { category: "district", pCode: st.code } });
        }
    }, [formData.state])

    useEffect(() => {
        const nextState = produce(formData, draftState => {
            draftState.localBody = null;
        });
        setFormData(nextState);
        if (formData.district) {
            setLbLoadConfig({ params: { pId: formData.district.id } });
        } else {
            // setLbLoadConfig({ params: { pId: "--"} });
        }
    }, [formData.district]);

    return <Paper className="w3-padding-16 w3-white w3-padding">
        {/* <h4>CoronaSafe Network Curfew Pass</h4> */}
        <Grid>
            {!respData && <form method="POST" onSubmit={onFormSubmit}>
                <Grid container spacing={2} className={clsx(classes.formRoot)}>
                    <Grid item {...wrapProps}  >
                        <TextField variant="filled" label="Your name as In Govt Id"
                            value={formData.name}
                            required
                            name="name"
                            onChange={onChange}
                            className={clsx(classes.root, classes.textInput)}
                        />
                    </Grid>
                    <Grid item {...wrapProps}  >
                        <TextField variant="filled" label="Enter Your Mobile Number"
                            value={formData.phoneNumber}
                            name="phoneNumber"
                            required
                            onChange={onChange} 
                            className={clsx(classes.root, classes.textInput)}
                        />
                    </Grid>
                    <Grid item {...wrapProps} >
                        <FormControl variant="filled" style={{ width: '100%' }}>
                            <InputLabel id={`idLabel`}>Select Govt Photo Id Type</InputLabel>
                            <Select
                                value={formData.govtIdType}
                                labelId={`idLabel`}
                                name="govtIdType"
                                id={`input-idLabel`}
                                onChange={onChange}
                            > 
                                <MenuItem value="Driving Licence">Driving Licence</MenuItem>
                                <MenuItem value="Pan Card">PAN Card</MenuItem>
                                <MenuItem value="Voter Id">Voter Id</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item {...wrapProps}  >
                        <TextField variant="filled" label="Govt Photo Id Number"
                            value={formData.govtId}
                            required
                            name="govtId"
                            onChange={onChange}
                            className={clsx(classes.root, classes.textInput)}
                        />
                    </Grid>
                    <Grid item xs={7} md={3}   >
                        <TextField variant="filled" label="From Date"
                            name="dateFrom"
                            type="date"
                            onChange={onChange}
                            InputLabelProps={{ shrink: true }}
                            required
                            className={clsx(classes.root, classes.textInput)}
                        />
                    </Grid>
                    <Grid item   xs={5} md={3}     >
                        <TextField variant="filled" label="From Time"
                            name="timeFrom"
                            type="time"
                            onChange={onChange}
                            InputLabelProps={{ shrink: true }}
                            required
                            className={clsx(classes.root, classes.textInput)}
                        />
                    </Grid>
                    <Grid item  xs={7} md={3} >
                        <TextField variant="filled" label="End Date"
                            name="dateTo"
                            required
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            onChange={onChange}
                            className={clsx(classes.root, classes.textInput)}
                        />
                    </Grid>
                    <Grid item  xs={5} md={3}  >
                        <TextField variant="filled" label="End Time"
                            name="timeTo"
                            required
                            type="time"
                            InputLabelProps={{ shrink: true }}
                            onChange={onChange}
                            className={clsx(classes.root, classes.textInput)}
                        />
                    </Grid>
                    <Grid item {...wrapProps}  >
                        <FormControl variant="filled" style={{ width: '100%' }}>
                            <InputLabel id={`stateLabel`}>State &amp; Union Territories</InputLabel>
                            <Select
                                value={formData.state}
                                className={classes.captalize}
                                labelId={`stateLabel`}
                                name="state"
                                id={`input-stateLabel`}
                                onChange={onChange}
                            >
                                {states.map((state,idx) => <MenuItem key={`option_${idx}`} className={classes.captalize} value={state.name}>{state.name.toLowerCase()}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item {...wrapProps}  >
                        <RemoteSelect
                            required={true}
                            onChange={(e, val) => onAcChange('district', val)}
                            name="disrtict"
                            value={formData.district}
                            url="/apiv1/geo/locations" label="District"
                            config={distLoadConfig} />
                    </Grid>
                    <Grid item {...wrapProps} >
                        <RemoteSelect
                            required={true}
                            onChange={(e, val) => onAcChange('localBody', val)}
                            name="village"
                            value={formData.localBody || {}}
                            url="/apiv1/geo/locations" label="Village / Muncipality / Police Station"
                            config={lbLoadConfig} />
                    </Grid>
                    <Grid item {...wrapProps}   >
                        <FormControl variant="filled" style={{ width: '100%' }}>
                            <InputLabel id={`reasonLabel`}>Rquest Category</InputLabel>
                            <Select
                                value={formData.reason}
                                labelId={`reasonLabel`}
                                name="reason"
                                id={`input-reasonLabel`}
                                onChange={onChange}
                            >
                                {reasons.map((reason,idx) => <MenuItem key={`reason_${idx}`} value={reason}>{reason}</MenuItem>)}
                            </Select>
                        </FormControl>
                        
                    </Grid>

                    <Grid item sm={12} xs={12}   >
                         <TextField variant="filled" label="Declaration"
                            name="information"
                            value={formData.information} 
                            multiline
                            onChange={onChange}
                            helperText="if you can mention why this request is important"
                            className={clsx(classes.root, classes.textInput)}
                        /> 
                    </Grid>
                    <Grid item container className="w3-padding w3-border-bottom">
                        <Grid item xs={12} md={12}>
                            <h6>Routes</h6>
                        </Grid>
                        {formData.routes.map((item, idx) => {
                            return <React.Fragment key={`route_item_${idx}`}>
                                <Grid item xs={12} sm={5} >
                                    <TextField variant="filled" label="Enter From"
                                        name="locationFrom"
                                        value={item.locationFrom}
                                        required
                                        onChange={(evt) => onRouteChange(evt, idx)}
                                        className={clsx(classes.root, classes.textInput)}
                                    />
                                </Grid>
                                <Grid item xs={10} sm={5}  >
                                    <TextField variant="filled" label="Enter To"
                                        name="locationTo"
                                        required
                                        value={item.locationTo}
                                        onChange={(evt) => onRouteChange(evt, idx)}
                                        className={clsx(classes.root, classes.textInput)}
                                    />
                                </Grid>
                                <Grid item xs={2} sm={2} className="w3-padding">
                                    {formData.routes.length > 1 && <IconButton onClick={() => onRemoveRoute(idx)} aria-label="delete" className={classes.margin}>
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>}
                                </Grid>
                            </React.Fragment>
                        })}
                        {formData.routes.length < 3 &&
                            <Grid item xs={12} md={12} className="w3-padding w3-section"  >
                                <Button classes={{ root: 'w3-padding' }} onClick={onAddRoute}
                                    className=" w3-border w3-block" color="default">
                                    {formData.routes.length === 0 && <span>+ Add A Route</span>}
                                    {formData.routes.length > 0 && <span>Add a new route in addition to the above route.</span>}
                                </Button>
                            </Grid>
                        }
                    </Grid>
                    <Grid container item justify="flex-end">
                        {formData.token && <Grid item >
                            <TextField variant="filled" label="Enter OTP"
                                name="otp"
                                required
                                type="number"

                                onChange={onChange}
                                className={clsx(classes.root, classes.textInput)}
                            />
                        </Grid>}
                        <Grid item className="w3-padding-16"  >
                            <Button disabled={formData.routes.length === 0 || inFlight}
                                type="submit"
                                variant="contained" size="small" color="primary"
                                className={classes.saveButton} >
                                {formData.token ? 'Request Travel Pass' : 'Get Verification OTP '}</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>}
            {respData && <PassInfo
                classes={classes}
                data={respData}  
            />}
        </Grid>
    </Paper>
}
