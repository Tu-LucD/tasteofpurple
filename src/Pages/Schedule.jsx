import React, { useContext } from 'react';
import Calendar from 'react-calendar';
import './Schedule.css';

import {
    Container, Typography,
  } from "@material-ui/core";

import { PlayerContext } from '../Contexts/PlayerContext';
  
function Schedule() {
    const players = useContext(PlayerContext);
    return(
        <Container>
            <Typography style={{color:"white"}} variant="h3" gutterBottom>
                About
            </Typography>
            <Typography variant="body1" gutterBottom>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
            </Typography>
            <Calendar onChange={(e) => {console.log(e)}}/>
            {
                players.map((player) => {
                    return <p>{player.FIRST_NAME}</p>
                })
            }
        </Container>
    )
}
export default Schedule;