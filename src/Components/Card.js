import React from 'react';

//MUI
import {
    Box, Typography,CardMedia
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
    container:{
        border:"5px solid #634087",
        display:"flex",
        flexDirection:"column"
    }
  }))

function Card({title,data,image}){
    const classes = useStyles();
    return(
        <Box className={classes.container}>
            {
                image ? 
                    <CardMedia
                        component={"img"}
                        image={image}
                        height="200"
                    />
                :null
            }
            <Typography variant='h5'>{title}</Typography>
            <Typography>{data}</Typography>
        </Box>
    )
}
export default Card;