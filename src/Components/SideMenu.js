import React from 'react';
import {NavLink} from 'react-router-dom'
//MUI
import {
    Drawer, List, ListItem,
    ListItemIcon, ListItemText,
    Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles"

//Icons
import HomeIcon from "@material-ui/icons/Home";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import BarChartIcon from '@material-ui/icons/BarChart';
import CameraIcon from '@material-ui/icons/Camera';


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
          style={{ width:"25%" }}
          anchor="left"
          open={open}
          classes={{ paper: classes.drawerPaper }}
          onClose={() =>{setOpen(!open)}}
        >
          <List style={{color:"white"}}>
            <NavLink to="/" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={<Typography style={{color:"white"}} variant='body1'>Home</Typography>} />
              </ListItem>
            </NavLink>
            <NavLink to="/calendar" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <CalendarTodayIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={<Typography style={{color:"white"}} variant='body1'>Schedule</Typography>} />
              </ListItem>
            </NavLink>
            <NavLink to="/playbook" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <MenuBookIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={<Typography style={{color:"white"}} variant='body1'>Playbook</Typography>} />
              </ListItem>
            </NavLink>
            <NavLink to="/analytics" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <BarChartIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={<Typography style={{color:"white"}} variant='body1'>Analytics</Typography>} />
              </ListItem>
            </NavLink>
            <NavLink to="/highlights" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <CameraIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={<Typography style={{color:"white"}} variant='body1'>Highlights</Typography>} />
              </ListItem>
            </NavLink>
          </List>
        </Drawer>
    )
}
export default SideMenu;