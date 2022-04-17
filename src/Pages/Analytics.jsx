import React, { useContext, useEffect }  from 'react';

import {
    Box, Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles"

import MVPPie from '../Components/MVPPie';
import MVPGrid from '../Components/MVPGrid';
import { GameContext } from '../Contexts/GameContext';
import { ApplicationContext } from '../Contexts/ApplicationContext';
import MoneyChart from '../Components/MoneyChart';

const useStyles = makeStyles(() => ({
    container:{
        height:'100%',
        width:'100%',
        textAlign:'center',
        display:"flex",
        flexDirection:'column',
        alignItems:'center'
    },
    mvp:{
        display:"flex",
        width:'75%',
        justifyContent:'space-between',
        alignItems:'center'
    }
}));
  
function Analytics() {
    const classes = useStyles();
    const application = useContext(ApplicationContext)
    const games = useContext(GameContext)

    const [season,setSeason] = React.useState()

    const seasonGames = games.filter(game => game.SEASON === application?.CURRENT_SEASON)
    const mvps = seasonGames.map(seasonGame => seasonGame?.MVP).filter((seasonGame) => {return seasonGame !== undefined})
    const datas = mvps.reduce((acc, value) => ({
        ...acc,
        [value]: (acc[value] || 0) + 1
     }), {});
    const mvpNames = Object.keys(datas)
    const mvpCounts = Object.values(datas)

    useEffect(() => {
        setSeason(application?.CURRENT_SEASON)
    },[application])

    return(
        <Box className={classes.container}>
            <Typography style={{color:"white"}} variant="h3" gutterBottom>
                Analytics
            </Typography>
            <Typography style={{color:"white"}} variant="h4" gutterBottom>
                MVP
            </Typography>
            <Box className={classes.mvp}>
                <MVPPie labels={mvpNames} counts={mvpCounts} />
                <MVPGrid labels={mvpNames} counts={mvpCounts} />
            </Box>
            <MoneyChart season={season} setSeason={setSeason} games={games} />
        </Box>
    )
}
export default Analytics;