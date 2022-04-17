import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Fade, Modal , TextField, Typography } from '@material-ui/core';
import  Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from "@material-ui/core/styles"

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { AttendanceContext } from '../Contexts/AttendanceContext';
import { insertMultiple,deleteQuery } from '../utils';

//Database
// import db from "../firebase";
// import { onSnapshot, collection, setDoc } from "firebase/firestore";

const useStyles = makeStyles(() => ({
    container:{
        width:'28%',
        padding:'10px 0px',
        border:"5px solid #634087",
        margin:'auto',
        marginTop:'20px',
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
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
    },
    buttonContainer:{
        display:'flex',
        justifyContent:'space-between',
        width:"90%"
    }
}))

function AttendanceList({game,players}){
    const gameAttendances = useContext(AttendanceContext).filter(attendance => attendance.GAME_ID === game.Id)
    
    const [openModal,setOpenModal] = useState(false)
    const [selectValue,setSelectValue] = useState([])

    const classes = useStyles();

    useEffect(() => {
        setSelectValue([])
    },[game])

    const handleOpenModal = () =>{
        setOpenModal(true)
    }
    const handleCloseModal = () =>{
        setOpenModal(false)
    }

    const handleNewAttendances = async (arr) => {
        if(arr.length > 0){
            const payload = []
            arr.forEach(item => payload.push({GAME_ID: game.Id, PLAYER_ID: item}))
            await insertMultiple("Attendance",payload)
        }
        else{
            alert("No players added")
        }
        handleCloseModal()
    }

    const handleDeleteAttendances = async() => {
        if(gameAttendances.length > 0){
            deleteQuery("Attendance",["GAME_ID","==",game.Id])
        }
        else{
            alert("No players to delete")
        }
    }

    return(
        <Box>
            <Box className={classes.container}>
                <Typography>Players Present</Typography>
                <Box className={classes.buttonContainer}>
                    <Button onClick={() => handleOpenModal()}><AddIcon /></Button>
                    <Button onClick={() => handleDeleteAttendances()}><DeleteIcon /></Button>
                </Box>
                <Box className={classes.list}>
                {
                    gameAttendances ? 
                        gameAttendances.filter(attendance => attendance.GAME_ID === game.Id).map((attendance) => {
                            return <Typography variant='h6' key={attendance.GAME_ID+attendance.PLAYER_ID}>
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
                                        player => !gameAttendances.find(attendance => player.Id === attendance.PLAYER_ID) && !selectValue.find(value => player.Id === value)
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
                            <Box className={classes.buttonContainer}>
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