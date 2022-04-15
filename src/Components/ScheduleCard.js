import React from 'react';

//MUI
import {
    Box, Typography,Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() => ({
    container:{
        // border:"5px solid #634087",
        display:"flex",
        flexDirection:"column"
    }
  }))

function ScheduleCard({data,months,setCurrGame}){
    const classes = useStyles();
    return(
        <Button onClick={() => {setCurrGame(data)}}>
            <Box className={classes.container}>
                <Typography>{months[Number(data.MONTH) - 1] + " " + data.DATE}</Typography>
                <Typography>{data.OPPONENT}</Typography>
                <Typography>{data.SCORE ?? "TBD"}</Typography>
                <Typography>{data.TIME}</Typography>
            </Box>
        </Button>
    )
}
export default ScheduleCard;