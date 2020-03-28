import React, { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
    FormControl,
    Button,
    TextField,
    Paper,
    Grid,
    Select,
    InputLabel,
    MenuItem
} from '@material-ui/core'

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import clsx from 'clsx';
import produce from "immer"
import QRCode from 'qrcode.react';
import axios from 'axios';

const useStyles = makeStyles((theme) =>
    createStyles({
        textInput: {
            width: '100%',
        },
        formRoot: {
            flexDirection: 'row'
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
    const classes = useStyles();
    const [showEntry, setShowEntry] = useState(true);
    const [inFlight, setInFlight] = useState(false);
    const [url, setUrl] = useState("https://localhost:5678/r/SF5eG7J4");
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        govtIdType: 'aadhar',
        govtId: '',
        dateFrom: '',
        dateTo: '',
        reason: '',
        status: '',
        localBody:'',
        district:'',
        state:'Kerala',
        country:'India',
        numberOfPassengers: 0,
        routes: [
        ]
    })

    const handleSubmit = (evt) => {
        console.log(formData);
        setInFlight(true);

        axios.post('/apiv1/pass/travel-request', formData)
        .then((resp) => {
            resp = resp.data;
            setInFlight(false);
            if(resp && resp.data) {
                setUrl(resp.data.url);
                setShowEntry(false);
            }
        }).catch( ex => {
            alert(ex.message);
        });

        evt.preventDefault();
    }

    const onRouteChange = (evt, idx) => {
        const nextState = produce(formData, draftState => {
            draftState.routes[idx][evt.target.name] = evt.target.value
        });
        setFormData(nextState);
    }

    const removeRoute = (idx) => {
        const nextState = produce(formData, draftState => {
            draftState.routes.splice(idx, 1);
        });
        console.log(nextState);
        setFormData(nextState);
    }

    const handleAddRoute = () => {
        const nextState = produce(formData, draftState => {
            draftState.routes.push({
                locationFrom: null,
                locationTo: null
            });
        });
        setFormData(nextState);
    }

    const onChange = (evt) => {
        const nextState = produce(formData, draftState => {
            draftState[evt.target.name] = evt.target.value;
        });
        setFormData(nextState);
    }

    const saveQRCode = (evt) => {
        const canvas = document.getElementById('generated_qr_code');
        var dataURL = canvas.toDataURL('image/png');
        evt.target.href = dataURL;
    }

    const reasons = [
        'Essential Food Supplies',
        'Medical Checkup',
        'Transportation & Logistics',
        'Chemist',
        'Print & Electronic Media',
        'Bank & ATM',
        'Other'
    ];

    const states = [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal",
        "Andaman and Nicobar Islands",
        "Chandigarh",
        "Dadra and Nagar Haveli and Daman and Diu",
        "Delhi",
        "Jammu and Kashmir",
        "Ladakh",
        "Lakshadweep",
        "Puducherry"
    ];
    return <Paper className="w3-padding-16 w3-white w3-padding">
        <h4>Request for Travel Pass</h4>
        <Grid>
            {showEntry && <form method="POST" onSubmit={handleSubmit}>
                <Grid container spacing={2} className={clsx(classes.formRoot)}>
                    <Grid item {...wrapProps}  >
                        <TextField variant="filled" label="Enter Your name"
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
                    <Grid item {...wrapProps} xs={6}>
                        <FormControl variant="filled" style={{ width: '100%' }}>
                            <InputLabel id={`idLabel`}>Select Govt Photo Id Type</InputLabel>
                            <Select
                                value={formData.govtIdType}
                                labelId={`idLabel`}
                                name="govtIdType"
                                id={`input-idLabel`}
                                onChange={onChange}
                            >
                                <MenuItem value="aadhar">Aadhar</MenuItem>
                                <MenuItem value="driving_licence">Driving License</MenuItem>
                                <MenuItem value="pan_card">PAN Card</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item {...wrapProps} xs={6} >
                        <TextField variant="filled" label="Govt Photo Id Number"
                            value={formData.govtId}
                            required

                            name="govtId"
                            onChange={onChange}
                            className={clsx(classes.root, classes.textInput)}
                        />
                    </Grid>
                    <Grid item container className="w3-padding w3-border-bottom">
                        <Grid xs={12} md={12}>
                            <h6>Routes</h6>
                        </Grid>
                        {formData.routes.map((item, idx) => {
                            return <React.Fragment>
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
                                    <IconButton onClick={() => removeRoute(idx)} aria-label="delete" className={classes.margin}>
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Grid>
                            </React.Fragment>
                        })}
                        {formData.routes.length < 3 &&
                            <Grid item xs={12} md={12} className="w3-padding w3-section"  >
                                <Button classes={{ root: 'w3-padding' }} onClick={handleAddRoute}
                                    className=" w3-border w3-block" secondary> + Add A Route</Button>
                            </Grid>
                        }
                    </Grid>
                    <Grid item {...wrapProps} xs={6}   >
                        <TextField variant="filled" label="From Date"
                            name="dateFrom"
                            type="date"
                            onChange={onChange}
                            InputLabelProps={{ shrink: true }}
                            required
                            className={clsx(classes.root, classes.textInput)}
                        />
                    </Grid>
                    <Grid item {...wrapProps} xs={6}>
                        <TextField variant="filled" label="To Date"
                            name="dateTo"
                            required
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            onChange={onChange}
                            className={clsx(classes.root, classes.textInput)}
                        />
                    </Grid>
                    {/* 
                    <Grid item {...wrapProps} >
                        <TextField variant="filled" label="Counry"
                            name="India"
                            onChange={onChange}
                            className={clsx(classes.root, classes.textInput)}
                        />
                    </Grid> */}
                    <Grid item {...wrapProps} xs={6} > 
                        <FormControl variant="filled" style={{ width: '100%' }}>
                            <InputLabel id={`stateLabel`}>State</InputLabel>
                            <Select
                                value={formData.state}
                                labelId={`stateLabel`}
                                name="state"
                                id={`input-stateLabel`}
                                onChange={onChange}
                            >
                            { states.map(state => <MenuItem value={state}>{state}</MenuItem>) }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item {...wrapProps} xs={6} >
                        <TextField variant="filled" label="District"
                            name="district"
                            required
                            onChange={onChange}
                            className={clsx(classes.root, classes.textInput)}
                        />
                    </Grid>
                    <Grid item {...wrapProps} >
                        <TextField variant="filled" label=" Muncipality / Panchayath / Police Station "
                            name="localBody"
                            required
                            onChange={onChange}
                            className={clsx(classes.root, classes.textInput)}
                        />
                    </Grid>
                    <Grid item {...wrapProps}   >
                        <FormControl variant="filled" style={{ width: '100%' }}>
                            <InputLabel id={`reasonLabel`}>Reason</InputLabel>
                            <Select
                                value={formData.reason}
                                labelId={`reasonLabel`}
                                name="reason"
                                id={`input-reasonLabel`}
                                onChange={onChange}
                            >
                            { reasons.map(reason => <MenuItem value={reason}>{reason}</MenuItem>) }
                            </Select>
                        </FormControl>
                        {/* <TextField variant="filled" label="Reason"
                            name="reason"
                            required
                            multiline
                            onChange={onChange}
                            className={clsx(classes.root, classes.textInput)}
                        /> */}


                    </Grid>
                    <Grid item className="w3-padding w3-section w3-align-right"  >
                        <Button disabled={formData.routes.length == 0}
                            type="submit"
                            variant="contained" size="small" color="primary"
                            className={classes.saveButton} primary>Request Travel Pass</Button>
                    </Grid>

                </Grid>
            </form>}
            {!showEntry && <Grid container spacing={2} justify="center"
                className={clsx(classes.formRoot)}>
                <Grid item className="w3-center">
                    <div className="w3-section w3-left-align">
                        <h4>Your route requests are pending approval.<br />
                            You will get a confirmation SMS in your registerd mobile number after approval.
                    <br />You can show the following QR Code to authorites after you getting the confirmation sms.
                    </h4>
                    </div>
                    <QRCode id="generated_qr_code" size={320}
                        style={{ maxWidth: '320px' }}
                        value={url} />
                    <div className="w3-section">
                        <a className="w3-button w3-deep-orange w3-padding-16 w3-round" href="#"
                            download="route_approval.png" onClick={saveQRCode}>Save QR Code</a>
                    </div>
                </Grid>
            </Grid>}
        </Grid>
    </Paper>
}
