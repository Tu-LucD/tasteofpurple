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
                  <CalendarTodayIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={<Typography style={{color:"white"}} variant='body1'>Schedule</Typography>} />
              </ListItem>
            </Link>
            <Link href="/playbook" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <MenuBookIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={<Typography style={{color:"white"}} variant='body1'>Playbook</Typography>} />
              </ListItem>
            </Link>
            <Link href="/analytics" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <BarChartIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={<Typography style={{color:"white"}} variant='body1'>Analytics</Typography>} />
              </ListItem>
            </Link>
            <Link href="/highlights" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <CameraIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={<Typography style={{color:"white"}} variant='body1'>Highlights</Typography>} />
              </ListItem>
            </Link>
          </List>
        </Drawer>
    )
}
export default SideMenu;