import React, { useContext } from 'react';
import { Box, Container, Typography } from "@material-ui/core";
import { PlayerContext } from '../Contexts/PlayerContext';
import { makeStyles } from "@material-ui/core/styles"
import Card from '../Components/Card';

const useStyles = makeStyles((theme) => ({
    break:{
        flexBasis: "100%",
        height: 0
    }
}))

function Welcome() {
    const players = useContext(PlayerContext);
    const classes = useStyles();
    let index = 0;
    return(
        <Container style={{textAlign:'center'}}>
            <Typography style={{color:"white",fontWeight:"bold"}} variant="h3" gutterBottom>
                THE TASTE OF PURPLE
            </Typography>
            <Typography variant="body1" gutterBottom>
                Roster overview, link to upwards website,
            </Typography>
            
                <Box display={"flex"} justifyContent={"space-between"}>
                {
                    players.map((player) => {
                        index++
                        // if(index % 3 === 0){
                        //     return <div className={classes.break}></div>
                        // }
                        console.log(index)
                        console.log(player)
                        return (
                            <Card title={player.Position} data={player.FIRST_NAME +" "+ player.LAST_NAME} image={player.IMAGE}/>
                        )
                    })
                }
                </Box>
        </Container>
    )
}
export default Welcome;