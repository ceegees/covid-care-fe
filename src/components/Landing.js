import React, { useState } from 'react'; 
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { 
    Grid
} from '@material-ui/core'; 
import TravelPass from './TravelPass'; 

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        appModal: {
            width: "60%"
        },
        container: {
            padding: `${theme.spacing(2)}px 0px`
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

export default function Landing(props) {
    const classes = useStyles();
    // const [modalCls, setModalCls] = useState();
    // const handleClose = () => {
    //     setModalCls('w3-hide')
    // }
    // const handleOpen = () => {
    //     setModalCls('w3-show');
    // }

    return <Container className={classes.container} fixed padding={2}>
        <Grid container justify="center" className="w3-padding" spacing={2}>
            <TravelPass />
        </Grid>
            {/* <Grid item xs={12} sm={4}  >
                <Button className="w3-padding-64 w3-block w3-deep-orange w3-round"
                    onClick={handleOpen}
                    style={{ height: "100%" }}>Travel Pass</Button>
            </Grid>
            <Grid item xs={12} sm={4} >
                <Button className="w3-padding-64 w3-block w3-blue " onClick={() => alert('coming soon!')} style={{ height: "100%" }}>Shops Near You</Button>
            </Grid>
            <Grid item item xs={12} sm={4}>
                <Button className="w3-padding-64 w3-black w3-block" onClick={() => alert('coming soon!')} style={{ height: "100%" }}>Medical Stores Near You!</Button>
            </Grid>
        </Grid> */}
        {/* {modalCls == 'w3-show' && <div className={clsx("w3-modal", modalCls)}  >
            <div className="w3-modal-content">
                <span onClick={() => setModalCls('w3-hide')}
                    class="w3-button w3-display-topright">&times;</span>
                <TravelPass />
            </div>
        </div>} */}
    </Container>
}