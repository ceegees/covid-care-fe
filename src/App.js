import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography'; 
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar, 
} from '@material-ui/core';
import { 
  Switch,
  Route, 
} from "react-router-dom";
  
import './styles/w3.css';
import './styles/App.scss';
import Landing from './components/Landing';
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

export default function App() {
  const classes = useStyles(); 
   
  return (<React.Fragment>
    <AppBar position="static">
      <Toolbar>
        {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton> */}
         <a href="/" style={{textDecoration:'none'}}><Typography variant="h6" className={classes.title}>
         CoronaSafe Network Curfew Pass
          </Typography></a> 
        {/* <Button color="inherit">Login</Button> */}
      </Toolbar>
    </AppBar>
    <CssBaseline /> 
    <Switch>
        <Route exact path="/p/:id">
          <PassInfo />
        </Route>
        <Route path="/"> 
        <Landing/>
        </Route>
      </Switch>
    <div className="w3-padding  w3-center w3-border-top" style={{ marginTop:'100px',  width:'100%','bottom': '0px' }}>
      <span>CoronaSafe Network is an open-source public utility designed by a multi-disciplinary team of innovators and volunteers who are working on a model to support Government efforts with full understanding and support of Government of Kerala. 
        <a href="https://github.com/ceegees/covid-care-fe">Github</a>
        </span> 
    </div>
  </React.Fragment>
  );
}
