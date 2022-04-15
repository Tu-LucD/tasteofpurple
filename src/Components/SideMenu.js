import React from 'react';
//MUI
import {
    Drawer, List, ListItem,
    ListItemIcon, ListItemText,
    Typography, Link
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles"

//Icons
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from '@material-ui/icons/Info';


const useStyles = makeStyles((theme) => ({
    drawerPaper: { width: 'inherit',backgroundColor:"#634087" },
    link: {
      textDecoration: 'none',
      color: theme.palette.text.primary
    }
  }))

function SideMenu({open,setOpen}) {
    const classes = useStyles();
    return(
        <Drawer
          style={{ width: "20%" }}
          anchor="left"
          open={open}
          classes={{ paper: classes.drawerPaper }}
          onClose={() =>{setOpen(!open)}}
        >
          <List style={{color:"white"}}>
            <Link href="/" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={<Typography style={{color:"white"}} variant='body1'>Home</Typography>} />
              </ListItem>
            </Link>
            <Link href="/calendar" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <InfoIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={<Typography style={{color:"white"}} variant='body1'>Schedule</Typography>} />
              </ListItem>
            </Link>
          </List>
        </Drawer>
    )
}
export default SideMenu;