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
        display:"flex",
        justifyContent:"space-between",
    }
  }))

function ScheduleBar({data,season,setSeason,setCurrGame,months,section,setSection,seasonLength}){
    const classes = useStyles();

    return(
        <Box className={classes.container}>
            <Box className={classes.header}>
                <Button disabled={season === 1} onClick={() =>{setSeason(--season)}}><ArrowBackIosIcon style={{ color: "white" }} fontSize='large'/></Button>
                <Typography variant='h4' gutterBottom>{"Season " + season}</Typography>
                <Button onClick={() =>{setSeason(++season)}}><ArrowForwardIosIcon style={{ color: "white" }} fontSize='large'/></Button>
            </Box>
            <Box className={classes.selector}>
                <Button disabled={section === 0} onClick={() =>{setSection(--section)}}><ArrowBackIosIcon style={{ color: "white" }} fontSize='large'/></Button>
                {
                    data ? 
                        data.map((game) => {
                            return <ScheduleCard key={game.DBID} data={game} months={months} setCurrGame={setCurrGame}/>
                        })
                    :null
                }
                <Button disabled={section * 3 > seasonLength} onClick={() =>{setSection(++section)}}><ArrowForwardIosIcon style={{ color: "white" }} fontSize='large'/></Button>
            </Box>
        </Box>
    )
}
export default ScheduleBar;