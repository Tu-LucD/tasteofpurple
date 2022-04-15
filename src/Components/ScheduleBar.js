import React from 'react';

//MUI
import {
    Box, Typography,Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles"
import ScheduleCard from './ScheduleCard';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles(() => ({
    container:{
        border:"5px solid #634087",
        display:"flex",
        flexDirection:"column",
        margin:"25px 0px"
    },
    header:{
        display:"flex",
        justifyContent:"space-between",
        borderBottom:"5px solid #634087"
    },
    selector:{
        display:"flex"
    }
  }))

function ScheduleBar({data,season,setSeason,setCurrGame,months}){
    const classes = useStyles();

    return(
        <Box className={classes.container}>
            <Box className={classes.header}>
                <Button disabled={season === 1} onClick={() =>{setSeason(--season)}}><ArrowBackIosIcon fontSize='large'/></Button>
                <Typography variant='h4' gutterBottom>{"Season " + season}</Typography>
                <Button onClick={() =>{setSeason(++season)}}><ArrowForwardIosIcon fontSize='large'/></Button>
            </Box>
            <Box className={classes.selector}>
            {
                data ? 
                    data.map((game) => {
                        return <ScheduleCard key={"game"+game.Id} data={game} months={months} setCurrGame={setCurrGame}/>
                    })
                :null
            }
            </Box>
        </Box>
    )
}
export default ScheduleBar;