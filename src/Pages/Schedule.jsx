import React, { useContext, useEffect, useState } from 'react';

import {
    Container, Grid, Typography,
  } from "@material-ui/core";

import Card from '../Components/Card';
import ScheduleBar from '../Components/ScheduleBar';
import { GameContext } from '../Contexts/GameContext';
  
function Schedule() {
    const games = useContext(GameContext)
    const [season,setSeason] = useState()
    const [currGame,setCurrGame] = useState();
    const months = ["Jan","Feb","Mar","Apr","May","Jun",
                    "Jul","Aug","Sep","Oct","Nov","Dec"]

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
                            <Card title={"Score"} data={currGame.SCORE}/>
                        </Grid>
                        <Grid item xs={4}>
                            <Card title={"Opponents"} data={currGame.OPPONENT}/>
                        </Grid>
                        <Grid item xs={4}>
                            <Card title={"MVP"} data={currGame.MVP}/>
                        </Grid>
                        {/* ----------- */}
                    </Grid>
                : null
            }
        </Container>
    )
}
export default Schedule;