import React, { useContext } from 'react';
// import Calendar from 'react-calendar';
// import './Schedule.css';

import {
    Container, Grid, Typography,
  } from "@material-ui/core";

import { PlayerContext } from '../Contexts/PlayerContext';
import Card from '../Components/Card';
  
function Schedule() {
    const players = useContext(PlayerContext);
    return(
        <Container style={{textAlign:'center'}}>
            <Typography style={{color:"white"}} variant="h3" gutterBottom>
                Schedule
            </Typography>
            <Typography variant="body1" gutterBottom>
                Select date within rectangle and populate data with states
            </Typography>
            <Grid container spacing={10}>
                <Grid item xs={4}>
                    <Card title={"Date"} data="April 24th"/>
                </Grid>
                <Grid item xs={4}>
                    <Card title={"Time"} data="5:00 PM"/>
                </Grid>
                <Grid item xs={4}>
                    <Card title={"Court"} data="A"/>
                </Grid>
                {/* ----------- */}
                <Grid item xs={4}>
                    <Card title={"Score"} data="2-1"/>
                </Grid>
                <Grid item xs={4}>
                    <Card title={"Opponents"} data="Jinchurikis"/>
                </Grid>
                <Grid item xs={4}>
                    <Card title={"MVP"} data="Tu-Luc"/>
                </Grid>
                {/* ----------- */}
            </Grid>
            {/* <Calendar onChange={(e) => {console.log(e)}}/> */}
            {
                players.map((player) => {
                    return <p>{player.FIRST_NAME}</p>
                })
            }
        </Container>
    )
}
export default Schedule;