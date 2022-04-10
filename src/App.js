import React from 'react';
import { makeStyles } from "@material-ui/core/styles"

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom";

import {
  Drawer, List, ListItem,
  ListItemIcon, ListItemText,
  Typography, Button, Box,
} from "@material-ui/core";

//Icons
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from '@material-ui/icons/Info';
import MenuIcon from '@material-ui/icons/Menu';

//Pages
import Welcome from "./Pages/Welcome"
import Schedule from "./Pages/Schedule"

//Databse
import Firebase from 'firebase';
import config from './config';

const useStyles = makeStyles((theme) => ({
  drawerPaper: { width: 'inherit',backgroundColor:"#634087" },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  }
}))

function App() {
  const classes = useStyles();
  const [openDrawer,setOpenDrawer] = React.useState(false);
  Firebase.initializeApp(config.firebase);
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Drawer
          style={{ width: "20%" }}
          anchor="left"
          open={openDrawer}
          classes={{ paper: classes.drawerPaper }}
          onClose={() =>{setOpenDrawer(!openDrawer)}}
        >
          <List style={{color:"white"}}>
            <Link to="/" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={<Typography style={{color:"white"}} variant='body1'>Home</Typography>} />
              </ListItem>
            </Link>
            <Link to="/calendar" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <InfoIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={<Typography style={{color:"white"}} variant='body1'>Schedule</Typography>} />
              </ListItem>
            </Link>
          </List>
        </Drawer>

        <Box style={{
          display:"flex",
          flexDirection:"column",
          width:"100%",
          height:"100%",
          justifyContent:"center",
          backgroundColor:"#DEB7FF",
          color:"#634087"
        }}>
          <Button 
            style={{width:"20%",margin:"auto"}} 
            onClick={() => {setOpenDrawer(!openDrawer)
          }}>
            <MenuIcon fontSize='large'/>
          </Button>

          {/* Switches */}
          <Switch>
            <Route exact path="/">
              <Welcome />
            </Route>
            <Route exact path="/calendar">
              <Schedule />
            </Route>
          </Switch>
        </Box>
      </div>
    </Router>
  );
}

export default App;
