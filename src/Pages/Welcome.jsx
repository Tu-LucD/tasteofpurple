import React, { useContext, useEffect, useState } from 'react';
import { Box, Container, Typography } from "@material-ui/core";
import { PlayerContext } from '../Contexts/PlayerContext';
import { makeStyles } from "@material-ui/core/styles"
import Card from '../Components/Card';
import { GameContext } from '../Contexts/GameContext';
import { ApplicationContext } from '../Contexts/ApplicationContext';

const useStyles = makeStyles(() => ({
    break:{
        flexBasis: "100%",
        height: 0
    },
    winRateContainer:{
        display:"flex",
        flexDirection:"column",
        width:'30%',
        margin:'auto'
    },
    recordContainer:{
        display:"flex",
        flexDirection:"column",
        width:'30%',
        marginBottom:'15px'
    },
    recordHeader:{
        borderBottom:'2px solid #634087',
        fontWeight:'bold'
    },
    record:{
        fontWeight:'bold',
        fontSize:'30px'
    },
    winRate:{
        width:"70%",
        margin:'auto'
    }
}))

function Welcome() {
    const application = useContext(ApplicationContext)
    const players = useContext(PlayerContext);
    const games = useContext(GameContext);

    const [totalWins,setTotalWins] = useState(0)
    const [totalLosses,setTotalLosses] = useState(0)
    const [winRate,setWinRate] = useState(0)

    const classes = useStyles();
    const seasonGames = games.filter(game => game.SEASON === application?.CURRENT_SEASON)

    useEffect(() => {
        let wins = 0;
        let losses = 0;
        if(games && application){
            seasonGames.forEach((seasonGame) => {
                if(seasonGame?.SCORE){
                    wins += Number(seasonGame.SCORE.split(" ")[0])
                    losses += Number(seasonGame.SCORE.split(" ")[2])
                }
            })
        }
        setTotalWins(wins)
        setTotalLosses(losses)
        setWinRate((wins/(wins + losses)*100).toFixed(2))
    },[games,application,winRate])

    return(
        <Container style={{textAlign:'center'}}>
            <Typography style={{color:"white",fontWeight:"bold"}} variant="h3" gutterBottom>
                THE TASTE OF PURPLE
            </Typography>
            <Typography style={{color:"white",fontWeight:"bold"}} variant="h4" gutterBottom>
                ROSTER
            </Typography>
            
            <Box display={"flex"} justifyContent={"space-between"}>
            {
                players.map((player) => {
                    return (
                        <Card key={player.FIRST_NAME} title={player.Position} data={player.FIRST_NAME +" "+ player.LAST_NAME} image={player.IMAGE}/>
                    )
                })
            }
            </Box>
            <Typography style={{color:"white",fontWeight:"bold",marginTop:"15px"}} variant="h4" gutterBottom>
                SEASON RECORD
            </Typography>
            <Box className={classes.winRateContainer}>
                <Box style={{display:'flex',justifyContent:'space-around'}}>
                    <Box className={classes.recordContainer}>
                        <Typography className={classes.recordHeader}>Wins</Typography>
                        <Box className={classes.record}>{totalWins}</Box>
                    </Box>
                    <Box className={classes.recordContainer}>
                        <Typography className={classes.recordHeader}>Losses</Typography>
                        <Box className={classes.record}>{totalLosses}</Box>
                    </Box>
                </Box>
                <Box className={classes.winRate} >
                    <Typography className={classes.recordHeader} style={{fontSize:'25px'}}>Win Rate</Typography>
                    <Box className={classes.record} style={{fontSize:'50px'}}>{winRate + "%"}</Box>
                </Box>
            </Box>
        </Container>
    )
}
export default Welcome;