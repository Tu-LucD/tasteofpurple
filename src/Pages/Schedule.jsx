import React, { useContext, useEffect, useState } from 'react';

import {Container, Grid, Typography, Box, Button, Fade, TextField } from "@material-ui/core";

import Card from '../Components/Card';
import ScheduleBar from '../Components/ScheduleBar';
import { GameContext } from '../Contexts/GameContext';
import { ApplicationContext } from '../Contexts/ApplicationContext';
import AttendanceList from '../Components/AttendanceList';
import { PlayerContext } from '../Contexts/PlayerContext';
import BuildIcon from '@material-ui/icons/Build';
import { makeStyles } from "@material-ui/core/styles"
import { editSingle } from '../utils'

const useStyles = makeStyles(() => ({
    modal:{
        height:"30%",
        width:'50%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:"#634087",
        position:'absolute',
        top:'50%',
        left:'50%',
        transform: 'translate(-50%, -50%)'
    },
    buttonContainer:{
        display:'flex',
        justifyContent:'space-between',
        width:"90%"
    }
}))
  
function Schedule() {
    const application = useContext(ApplicationContext)
    const games = useContext(GameContext)
    const players = useContext(PlayerContext)

    const [season,setSeason] = useState()
    const [currGame,setCurrGame] = useState();
    const [section, setSection] = useState(0);
    const [openModal,setOpenModal] = useState(false)
    const [score,setScore] = useState()
    const [mvp,setMvp] = useState()

    const classes = useStyles();
    const months = ["Jan","Feb","Mar","Apr","May","Jun",
                    "Jul","Aug","Sep","Oct","Nov","Dec"]
    
    useEffect(() => {
        setSeason(application?.CURRENT_SEASON)
    },[application])

    useEffect(() => {
        setScore(currGame?.SCORE ?? "")
        setMvp(currGame?.MVP ?? "")
    }, [currGame])

    const handleOpenModal = () =>{
        setOpenModal(true)
    }
    const handleCloseModal = () =>{
        setOpenModal(false)
    }

    const handleEditGame =  async () => {
        if(score || mvp){
            const payload = currGame
            payload.MVP = mvp
            payload.SCORE = score
            delete payload.DBID
            await editSingle("Games",payload,currGame.DBID)
            handleCloseModal()
        }
        else{
            alert("Some fields are empty")
        }
    }

    return(
        <Container style={{textAlign:'center'}}>
            <Typography style={{color:"white"}} variant="h3" gutterBottom>
                Schedule
            </Typography>
            <ScheduleBar 
                data={games.filter(game => game.SEASON === season).slice(section*2,section*2+3)} 
                months={months} 
                season={season} 
                setSeason={setSeason} 
                setCurrGame={setCurrGame}
                section={section}
                setSection={setSection}
                seasonLength={games.filter(game => game.SEASON === season).length}
            />
            {
                currGame ? 
                //ADD TRANSITION
                    <>
                        <Box>
                            <Button onClick={() => handleOpenModal()} style={{marginBottom:'10px'}}>
                                <BuildIcon />
                            </Button>
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
                        <Fade in={openModal}>
                            <Box className={classes.modal}>
                                <Typography style={{color:'white'}} variant='h4'>Edit Game</Typography>
                                <TextField onChange={(e) => setScore(e.target.value)} id='score' label="Score" value={score}></TextField>
                                <TextField onChange={(e) => setMvp(e.target.value)} id='mvp' label="MVP" value={mvp}></TextField>
                                <Box className={classes.buttonContainer}>
                                    <Button onClick={() => handleEditGame()}>Confirm</Button>
                                    <Button onClick={() => handleCloseModal()}>Cancel</Button>
                                </Box>
                            </Box>
                        </Fade>
                    </>
                : null
            }
        </Container>
    )
}
export default Schedule;