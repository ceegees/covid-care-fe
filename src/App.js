import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Button,
  Grid,
  IconButton,
  Modal,
  Paper
} from '@material-ui/core';
 
import { useRoutes } from 'hookrouter';
import MenuIcon from '@material-ui/icons/Menu';
import './styles/w3.css';
import './styles/App.scss';
import Landing from './components/Landing';
import Hospital from './components/Hospital';
import TravelPass from './components/TravelPass';
import PassInfo from './components/TravelPass/Info';


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
const routes = {
  '/': () => <Landing />,
  '/hospitals': () => <Hospital />,
  '/travelpass': () => <TravelPass />,
  '/p/:id': (params) => <PassInfo {...params} />,
};

export default function App() {
  const classes = useStyles();
  const routeResult = useRoutes(routes);
  const page = routeResult
  return (


  <React.Fragment>
    <AppBar position="static">
      <Toolbar>
        {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton> */}
         <a href="/" style={{textDecoration:'none'}}><Typography variant="h6" className={classes.title}>
         Covid Care - Kerala
          </Typography></a> 
        {/* <Button color="inherit">Login</Button> */}
      </Toolbar>
    </AppBar>
    <CssBaseline /> 
    {page}

     
    <div className="w3-padding  w3-center w3-border-top" style={{ marginTop:'100px',  width:'100%','bottom': '0px' }}>
      <span>If you want to deploy this solution for any other regions please get in touch with covidcare@ceegees.in we are happy to help
      </span>
    </div>
  </React.Fragment>
  );
}
