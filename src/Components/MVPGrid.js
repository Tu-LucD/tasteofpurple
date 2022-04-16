import React, { useContext }  from 'react';

import {
    Grid, Typography, Item
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() => ({
    container:{
        width:'40%',
        height:'80%'
    },
    item:{
        border:'1px solid #634087',
        fontWeight:'bold'
    }
}));

function MVPGrid({labels,counts}){
    const classes = useStyles();
    const rows = [];
    const highestCount = Math.max.apply(null,counts)
    let mvp = "";

    for(var i = 0; i < labels.length; i++){
        rows.push(<Grid className={classes.item} item xs={6}>{labels[i]}</Grid>)
        rows.push(<Grid className={classes.item} item xs={6}>{counts[i]}</Grid>)

        if(counts[i] === highestCount) mvp += labels[i] + ', '
        if(i === labels.length - 1 && i > 0) mvp = mvp.slice(0,-1).slice(0,-1)
    }

    return(
        <Grid className={classes.container} container >
            <Grid className={classes.item} item xs={6}><Typography variant='h7'>Player</Typography></Grid>
            <Grid className={classes.item} item xs={6}><Typography variant='h7'># of times MVP</Typography></Grid>
            {
                rows
            }
            <Grid className={classes.item} item xs={12}><Typography variant='h7'>Season MVP</Typography></Grid>
            <Grid className={classes.item} item xs={12}><Typography variant='h7'>{mvp}</Typography></Grid>
        </Grid>
    )
}

export default MVPGrid;