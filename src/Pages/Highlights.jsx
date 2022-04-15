import React, { useContext } from 'react';
import { Container, Typography } from "@material-ui/core";
import { PlayerContext } from '../Contexts/PlayerContext';

function Highlights() {
    const players = useContext(PlayerContext)
    return(
        <Container style={{textAlign:'center'}}>
            <Typography style={{color:"white"}} variant="h3" gutterBottom>
                Highlights
            </Typography>
            <Typography variant="body1" gutterBottom>
                Youtube clips (possibility to add/modify)
            </Typography>
            {
                players.map((player) => {
                    return <p>{player.FIRST_NAME}</p>
                })
            }
        </Container>
    )
}
export default Highlights;