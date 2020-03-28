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

// const useStyles = makeStyles((theme) =>
//     createStyles({
//         textInput: {
//             width: '100%',
//         },
//         formRoot: {
//             flexDirection: 'row'
//         },
//         formControlRoot: {
//             padding: `0px ${theme.spacing(1)}px`
//         },
//         saveButton: {
//             padding: theme.spacing(1),
//         },
//         root: {
//             '& > *': {
//                 margin: theme.spacing(1),
//             },
//         },
//     }),
// );

// const wrapProps = {
//     item: true,
//     xs: 12,
//     md: 6,
//     lg: 6
// };


export default function Hospital() {
//     const classes = useStyles();
//     const [showEntry, setShowEntry] = useState(true);
//     const [inFlight, setInFlight] = useState(false);
//     const [url, setUrl] = useState("https://localhost:5678/r/SF5eG7J4");
//     const [formData, setFormData] = useState({
//         name: '',
//         phoneNumber: '',
//         govtIdType: 'aadhar',
//         govtId: '',
//         dateFrom: '',
//         dateTo: '',
//         reason: '',
//         status: '',
//         localBody:'',
//         district:'',
//         state:'Kerala',
//         country:'India',
//         numberOfPassengers: 0,
//         routes: [
//         ]
//     })

//     const handleSubmit = (evt) => {
//         console.log(formData);
//         setInFlight(true);

//         axios.post('/apiv1/pass/travel-request', formData)
//         .then((resp) => {
//             resp = resp.data;
//             setInFlight(false);
//             if(resp && resp.data) {
//                 setUrl(resp.data.url);
//                 setShowEntry(false);
//             }
//         }).catch( ex => {
//             alert(ex.message);
//         });

//         evt.preventDefault();
//     }

//     const onRouteChange = (evt, idx) => {
//         const nextState = produce(formData, draftState => {
//             draftState.routes[idx][evt.target.name] = evt.target.value
//         });
//         setFormData(nextState);
//     }

//     const removeRoute = (idx) => {
//         const nextState = produce(formData, draftState => {
//             draftState.routes.splice(idx, 1);
//         });
//         console.log(nextState);
//         setFormData(nextState);
//     }

//     const handleAddRoute = () => {
//         const nextState = produce(formData, draftState => {
//             draftState.routes.push({
//                 locationFrom: null,
//                 locationTo: null
//             });
//         });
//         setFormData(nextState);
//     }

//     const onChange = (evt) => {
//         const nextState = produce(formData, draftState => {
//             draftState[evt.target.name] = evt.target.value;
//         });
//         setFormData(nextState);
//     }

//     const saveQRCode = (evt) => {
//         const canvas = document.getElementById('generated_qr_code');
//         var dataURL = canvas.toDataURL('image/png');
//         evt.target.href = dataURL;
//     }

//     const reasons = [
//         'Essential Food Supplies',
//         'Medical Checkup',
//         'Transportation & Logistics',
//         'Chemist',
//         'Print & Electronic Media',
//         'Bank & ATM',
//         'Other'
//     ];

//     const states = [
//         "Andhra Pradesh",
//         "Arunachal Pradesh",
//         "Assam",
//         "Bihar",
//         "Chhattisgarh",
//         "Goa",
//         "Gujarat",
//         "Haryana",
//         "Himachal Pradesh",
//         "Jharkhand",
//         "Karnataka",
//         "Kerala",
//         "Madhya Pradesh",
//         "Maharashtra",
//         "Manipur",
//         "Meghalaya",
//         "Mizoram",
//         "Nagaland",
//         "Odisha",
//         "Punjab",
//         "Rajasthan",
//         "Sikkim",
//         "Tamil Nadu",
//         "Telangana",
//         "Tripura",
//         "Uttar Pradesh",
//         "Uttarakhand",
//         "West Bengal",
//         "Andaman and Nicobar Islands",
//         "Chandigarh",
//         "Dadra and Nagar Haveli and Daman and Diu",
//         "Delhi",
//         "Jammu and Kashmir",
//         "Ladakh",
//         "Lakshadweep",
//         "Puducherry"
//     ];
    return (
    <Paper className="w3-padding-16 w3-white w3-padding">
        <h4>Request for Travel Pass</h4>
    </Paper>
    );
}
