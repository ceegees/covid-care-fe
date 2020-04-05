import React, { useState, useEffect } from 'react'; 
import { 
    TextField, 
    CircularProgress
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';

export default function RemoteSelect({ url, config, label, onChange, name , value,required }) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);
        axios.get(url, config).then(res => {
            setOptions(res.data.data);
            setLoading(false);
        });
    }, [url, config]);

    return <Autocomplete
        open={open}
        onOpen={() => { setOpen(true); }}
        onClose={() => { setOpen(false); }}
        onChange={onChange}
        getOptionSelected={(option, value) => value && (option.name === value.name)}
        getOptionLabel={option => option.name ? option.name: ""}
        options={options}
        loading={loading}
        value={value} 
        renderInput={params => (
            <TextField
                name={name}
                {...params}
                label={label}
                variant="filled"
                required={required}
                InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                        <React.Fragment>
                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                        </React.Fragment>
                    ),
                }}
            />
        )}
    />
}