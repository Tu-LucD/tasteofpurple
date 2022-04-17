import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom";

//MUI
import { Button, Box } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

//Pages
import Welcome from "./Pages/Welcome";
import Schedule from "./Pages/Schedule";
import Playbook from './Pages/Playbook';
import Analytics from './Pages/Analytics';
import Highlights from './Pages/Highlights';

//Database
import db from "./firebase";
import { onSnapshot, collection } from "firebase/firestore";
import SideMenu from './Components/SideMenu';

//Contexts
import { PlayerContext } from './Contexts/PlayerContext';
import { GameContext } from './Contexts/GameContext';
import { ApplicationContext } from './Contexts/ApplicationContext';
import { AttendanceContext } from './Contexts/AttendanceContext';

function App() {
  const [application,setApplication] = useState();
  const [players,setPlayers] = useState([]);
  const [games,setGames] = useState([]);
  const [attendance,setAttendance] = useState();
  const [openDrawer,setOpenDrawer] = useState(false);

  const sortById = (a,b) => {
    if(a.Id < b.Id) return -1
    if(a.Id > b.Id) return 1
    return 0
  }

  useEffect(() =>{
    onSnapshot(collection(db,"Application"),(snapshot) => {
      setApplication(snapshot.docs.map(doc => doc.data())[0]);
    });
    onSnapshot(collection(db,"Players"),(snapshot) => {
      setPlayers(snapshot.docs.map(doc => doc.data()).sort(sortById));
    });
    onSnapshot(collection(db,"Games"),(snapshot) => {
      setGames(snapshot.docs.map(doc => doc.data()).sort(sortById));
    });
    onSnapshot(collection(db,"Attendance"),(snapshot) => {
      setAttendance(snapshot.docs.map(doc => doc.data()));
    });
  },[])

  return (
    <ApplicationContext.Provider value={application}>
      <GameContext.Provider value={games}>
        <AttendanceContext.Provider value={attendance}>
          <PlayerContext.Provider value={players}>
            <Router>
              <div style={{ display: 'flex', height:'100%' }}>
                <SideMenu open={openDrawer} setOpen={setOpenDrawer} />
                <Box style={{
                  display:"flex",
                  flexDirection:"column",
                  width:"100%",
                  alignItems:"center",
                  backgroundColor:"#DEB7FF",
                  color:"#634087"
                }}>
                  <Button 
                    style={{width:"20%"}} 
                    onClick={() => {setOpenDrawer(!openDrawer)
                  }}>
                    <MenuIcon fontSize='large'/>
                  </Button>

                  {/* Routes */}
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
                </Box>
              </div>
            </Router>
          </PlayerContext.Provider>
          </AttendanceContext.Provider>
      </GameContext.Provider>
    </ApplicationContext.Provider>
  );
}

export default App;
