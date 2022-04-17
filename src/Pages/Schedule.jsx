import React, { useContext, useEffect, useState } from 'react';

import {Container, Grid, Typography, Box} from "@material-ui/core";

import Card from '../Components/Card';
import ScheduleBar from '../Components/ScheduleBar';
import { GameContext } from '../Contexts/GameContext';
import { ApplicationContext } from '../Contexts/ApplicationContext';
import AttendanceList from '../Components/AttendanceList';
import { PlayerContext } from '../Contexts/PlayerContext';
  
function Schedule() {
    const application = useContext(ApplicationContext)
    const games = useContext(GameContext)
    const players = useContext(PlayerContext)
    const [season,setSeason] = useState()
    const [currGame,setCurrGame] = useState();
    const months = ["Jan","Feb","Mar","Apr","May","Jun",
                    "Jul","Aug","Sep","Oct","Nov","Dec"]
    
    useEffect(() => {
        setSeason(application?.CURRENT_SEASON)
    },[application])

    return(
        <Container style={{textAlign:'center'}}>
            <Typography style={{color:"white"}} variant="h3" gutterBottom>
                Schedule
            </Typography>
            <ScheduleBar 
                data={games.filter(game => game.SEASON === season)} 
                months={months} 
                season={season} 
                setSeason={setSeason} 
                setCurrGame={setCurrGame}
            />
            {
                currGame ? 
                //ADD TRANSITION
                    <Box>
                        <Grid container spacing={10}>
                            <Grid item xs={4}>
                                <Card title={"Date"} data={months[Number(currGame.MONTH) - 1] + " " + currGame.DATE + " " + currGame.YEAR}/>
                            </Grid>
                            <Grid item xs={4}>
                                <Card title={"Time"} data={currGame.TIME}/>
                            </Grid>
                            <Grid item xs={4}>
                                <Card title={"Court"} data={currGame.GYM}/>
                            </Grid>
                            {/* ----------- */}
                            <Grid item xs={4}>
                                <Card title={"Score"} data={currGame.SCORE ?? "TBD"}/>
                            </Grid>
                            <Grid item xs={4}>
                                <Card title={"Opponents"} data={currGame.OPPONENT}/>
                            </Grid>
                            <Grid item xs={4}>
                                <Card title={"MVP"} data={currGame.MVP ?? "TBD"}/>
                            </Grid>
                            {/* ----------- */}
                        </Grid>
                        <AttendanceList game={currGame} players={players}/>
                    </Box>
                : null
            }
        </Container>
    )
}
export default Schedule;