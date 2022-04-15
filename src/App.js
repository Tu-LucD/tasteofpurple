import React, { useEffect, useState } from 'react';

import {
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom";

import { Button, Box } from "@material-ui/core";

//Icons
import MenuIcon from '@material-ui/icons/Menu';

//Pages
import Welcome from "./Pages/Welcome"
import Schedule from "./Pages/Schedule"

//Database
import db from "./firebase";
import { onSnapshot, collection } from "firebase/firestore";
import SideMenu from './Components/SideMenu';
import { PlayerContext } from './Contexts/PlayerContext';
import Playbook from './Pages/Playbook';
import Analytics from './Pages/Analytics';
import Highlights from './Pages/Highlights';

function App() {
  const [players,setPlayers] = useState([])
  const [openDrawer,setOpenDrawer] = useState(false);

  const sortById = (a,b) => {
    if(a.Id < b.Id) return -1
    if(a.Id > b.Id) return 1
    return 0
  }

  useEffect(() =>{
    onSnapshot(collection(db,"Players"),(snapshot) => {
      setPlayers(snapshot.docs.map(doc => doc.data()).sort(sortById));
    });
  },[])

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <SideMenu open={openDrawer} setOpen={setOpenDrawer} />
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
          <PlayerContext.Provider value={players}>
            <Switch>
              <Route exact path="/">
                <Welcome />
              </Route>
              <Route exact path="/calendar">
                <Schedule />
              </Route>
              <Route exact path="/playbook">
                <Playbook />
              </Route>
              <Route exact path="/analytics">
                <Analytics />
              </Route>
              <Route exact path="/highlights">
                <Highlights />
              </Route>
            </Switch>
          </PlayerContext.Provider>
        </Box>
      </div>
    </Router>
  );
}

export default App;
