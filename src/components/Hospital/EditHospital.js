import React, { useState } from 'react';
import {
    Grid,
} from '@material-ui/core'
import produce from "immer"
// import { get } from 'lodash';
import TextArea from '../common/TextArea';
import TextField from '../common/TextField';
import SelectField from '../common/SelectField';
import Button from '../common/Button';
// import { ErrorHelperText } from '../../../../../common/HelperComponents';


export default function EditHospital(props) {
    // const [closeSubmit, setCloseSubmit] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        type: '',
        number: '',
        lat: '',
        long: '',
        state: '',
        district: '',
        taluk: '',
        normalBeds: '',
        icuBeds: '',
        ventilators: '',
        rooms: '',
        generalDocs: '',
        pediatricians: '',
        surgeons: '',
    });

    const handleChange = (evt) => {
        const nextState = produce(formData, draftState => {
            draftState[evt.target.name] = evt.target.value;
        });
        setFormData(nextState);
    }

    const handleSubmit = () => {
        props.handleClose();
    }


    return (
        <Grid container spacing={4}>
            <Grid item xs={6}>
            <TextField
                    label="Health Facility Name"
                    type="text"
                    fullWidth
                    name="name"
                    value={formData.name}
                    required
                    onChange={handleChange}
                    // error={get(errors, 'name')}
                />
            </Grid>
            <Grid item xs={6}>
            <TextArea
                label="Address"
                required
                rows={5}
                // placeholder="Please enter your description here..."
                variant="outlined"
                name="address"
                value={formData.address}
                onChange={handleChange}
                // error={get(errors, 'address', '')}
                // disabled={!isEditable}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
                    label="Landline Number"
                    type="number"
                    fullWidth
                    name="number"
                    value={formData.number}
                    required
                    onChange={handleChange}
                    // error={get(errors, 'number')}
                />
            </Grid>
            <Grid item xs={6}>
            <TextField
                    label="Latitude"
                    type="text"
                    fullWidth
                    name="lat"
                    value={formData.lat}
                    required
                    onChange={handleChange}
                    // error={get(errors, 'lat')}
                />
            </Grid>
            <Grid item xs={6}>
            <TextField
                    label="Longitude"
                    type="text"
                    fullWidth
                    name="long"
                    value={formData.long}
                    required
                    onChange={handleChange}
                    // error={get(errors, 'long')}
                />
            </Grid>
            <Grid item xs={6}>
                <SelectField
                    label="Facility Type"
                    name="type"
                    // options={subsidyOptions && subsidyOptions}
                    required
                    value={formData.type}
                    onChange={handleChange}
                    // error={get(errors, 'type')}
                />
            </Grid>
            <Grid item xs={6}>
            <SelectField
                    label="State"
                    name="state"
                    // options={subsidyOptions && subsidyOptions}
                    required
                    value={formData.state}
                    onChange={handleChange}
                    // error={get(errors, 'state')}
                />
            </Grid>
            <Grid item xs={6}>
            <SelectField
                    label="District"
                    name="district"
                    // options={subsidyOptions && subsidyOptions}
                    required
                    value={formData.district}
                    onChange={handleChange}
                    // error={get(errors, 'district')}
                />
            </Grid>
            <Grid item xs={6}>
            <SelectField
                    label="Taluk"
                    name="taluk"
                    // options={subsidyOptions && subsidyOptions}
                    required
                    value={formData.taluk}
                    onChange={handleChange}
                    // error={get(errors, 'taluk')}
                />
            </Grid>
            <Grid item xs={6}>
            <TextField
                    label="Normal Beds"
                    type="number"
                    fullWidth
                    name="normalBeds"
                    value={formData.normalBeds}
                    required
                    onChange={handleChange}
                    // error={get(errors, 'normalBeds')}
                />
            </Grid>
            <Grid item xs={6}>
            <TextField
                    label="ICU Beds"
                    type="number"
                    fullWidth
                    name="icuBeds"
                    value={formData.icuBeds}
                    required
                    onChange={handleChange}
                    // error={get(errors, 'icuBeds')}
                />
            </Grid>
            <Grid item xs={6}>
            <TextField
                    label="Ventilators"
                    type="number"
                    fullWidth
                    name="ventilators"
                    value={formData.ventilators}
                    required
                    onChange={handleChange}
                    // error={get(errors, 'ventilators')}
                />
            </Grid>

            <Grid item xs={6}>
            <TextField
                    label="Rooms"
                    type="number"
                    fullWidth
                    name="rooms"
                    value={formData.rooms}
                    required
                    onChange={handleChange}
                    // error={get(errors, 'rooms')}
                />
            </Grid>
            <Grid item xs={6}>
            <TextField
                    label="General Doctors"
                    type="number"
                    fullWidth
                    name="generalDocs"
                    value={formData.generalDocs}
                    required
                    onChange={handleChange}
                    // error={get(errors, 'generalDocs')}
                />
            </Grid>
            <Grid item xs={6}>
            <TextField
                    label="Pediatricians"
                    type="number"
                    fullWidth
                    name="pediatricians"
                    value={formData.pediatricians}
                    required
                    onChange={handleChange}
                    // error={get(errors, 'pediatricians')}
                />
            </Grid>
            <Grid item xs={6}>
            <TextField
                    label="Surgeons"
                    type="number"
                    fullWidth
                    name="surgeons"
                    value={formData.surgeons}
                    required
                    onChange={handleChange}
                    // error={get(errors, 'surgeons')}
                />
            </Grid>
            {/* <Grid item xs={12} className="w3-center"><ErrorHelperText error={get(errors, 'api')} /></Grid> */}
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="primary"
                    className="w3-right w3-margin s7t-text-uppercase"
                    onClick={handleSubmit}
                    width="95px"
                >
                    Submit
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    className="w3-right w3-margin s7t-text-uppercase"
                    onClick={props.handleClose}
                    width="95px"
                >
                    Cancel
                </Button>
            </Grid>
        </Grid>
    );
}
