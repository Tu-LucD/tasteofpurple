import React, { useContext } from 'react';

import {
    Typography,Box
  } from "@material-ui/core";

import { PlayerContext } from '../Contexts/PlayerContext';

function Playbook(){
    const players = useContext(PlayerContext);
    return(
        <Box style={{textAlign:'center'}}>
            <Typography style={{color:"white"}} variant="h3" gutterBottom>
                Playbook
            </Typography>
            <Typography variant="body1" gutterBottom>
                (Ambitious) field to move pins around and save plays. Add comments on the side?
            </Typography>
            {/* <Calendar onChange={(e) => {console.log(e)}}/> */}
            {
                players.map((player) => {
                    return <p>{player.FIRST_NAME}</p>
                })
            }
        </Box>
    )
}
export default Playbook;