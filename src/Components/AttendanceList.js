import React, { useContext, useState } from 'react'
import { Box, Button, Fade, Modal , TextField, Typography } from '@material-ui/core';
import  Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from "@material-ui/core/styles"

import AddIcon from '@material-ui/icons/Add';
import { AttendanceContext } from '../Contexts/AttendanceContext';

//Database
// import db from "../firebase";
// import { onSnapshot, collection, setDoc } from "firebase/firestore";

const useStyles = makeStyles(() => ({
    container:{
        width:'30%',
        border:"5px solid #634087",
        margin:'auto',
        marginTop:'20px',
        display:'flex',
        flexDirection:'column'
    },
    list:{
        display:'flex',
        flexDirection:'column'
    },
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
    }
}))

function AttendanceList({game,players}){
    const gameAttendances = useContext(AttendanceContext).filter(attendance => attendance.GAME_ID === game.Id)
    
    const [openModal,setOpenModal] = useState(false)
    const [selectValue,setSelectValue] = useState([])

    const classes = useStyles();

    const handleNewAttendances = async (arr) => {
        console.log(arr)
        // const docRef = doc(db,"Attendance","id");
        // const payload = {GAME_ID: 1, PLAYER_ID: 2};
        // await setDoc(docRef, payload)
        handleCloseModal()
    }
    const handleOpenModal = () =>{
        setOpenModal(true)
    }
    const handleCloseModal = () =>{
        setOpenModal(false)
    }

    return(
        <Box>
            <Box className={classes.container}>
                <Box style={{display:'flex'}}>
                    <Typography>Players Present</Typography>
                    <Button onClick={() => handleOpenModal()}><AddIcon /></Button>
                </Box>
                <Box className={classes.list}>
                {
                    gameAttendances ? 
                        gameAttendances.filter(attendance => attendance.GAME_ID === game.Id).map((attendance) => {
                            return <Typography key={attendance.GAME_ID+attendance.PLAYER_ID}>
                                        {players.find(player => player.Id === attendance.PLAYER_ID)?.FIRST_NAME}
                                    </Typography>
                        })
                    : null
                }
                </Box>
                <Modal
                    open={openModal}
                    onClose={() => handleCloseModal()}
                >
                    <Fade in={openModal}>
                        <Box className={classes.modal}>
                            <Typography>Add player attendance to game versus {game.OPPONENT}</Typography>
                            <Autocomplete
                                multiple
                                options={
                                    players.filter(
                                        player => gameAttendances.find(attendance => player.Id !== attendance.PLAYER_ID) && !selectValue.find(value => player.Id === value)
                                            )
                                }
                                getOptionLabel={(option) => option.FIRST_NAME}
                                onChange={(e,v) => setSelectValue(v.map(i => i.Id))}
                                renderInput={(params) =>(
                                    <TextField 
                                        {...params}
                                        variant="standard"
                                        label="Players"
                                    />
                                )}
                            />
                            <Box>
                                <Button onClick={() => handleNewAttendances(selectValue)}>Add</Button>
                                <Button onClick={() => handleCloseModal()}>Cancel</Button>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            </Box>
        </Box>
    )
}

export default AttendanceList;