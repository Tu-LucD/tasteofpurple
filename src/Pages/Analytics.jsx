import React, { useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';

import {
    Box, Typography,
  } from "@material-ui/core";

import { PlayerContext } from '../Contexts/PlayerContext';
  
function Analytics() {
    const players = useContext(PlayerContext);
    return(
        <Box style={{textAlign:'center'}}>
            <Typography style={{color:"white"}} variant="h3" gutterBottom>
                Analytics
            </Typography>
            <Typography variant="body1" gutterBottom>
                Pie chart based on number of mvps, chart for money owed,
            </Typography>
            {
                players.map((player) => {
                    return <p>{player.FIRST_NAME}</p>
                })
            }
            {/* <Doughnut/> */}
        </Box>
    )
}
export default Analytics;