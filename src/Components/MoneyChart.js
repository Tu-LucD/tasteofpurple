import React, { useContext, useEffect } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Box, Typography } from '@material-ui/core';
import { PlayerContext } from '../Contexts/PlayerContext';
import { AttendanceContext } from '../Contexts/AttendanceContext';

function MoneyChart({season,setSeason,games}){
    const players = useContext(PlayerContext)
    const attendances = useContext(AttendanceContext)
    const [seasonAttendances, setSeasonAttendances] = React.useState()

    useEffect(() => {
        setSeasonAttendances(attendances?.filter(attendance => games.find(game => game.SEASON === season && attendance.GAME_ID === game.Id))?.sort(sortByPlayerId))
    },[games,season,attendances])

    const total = 850

    const sortByPlayerId = (a,b) => {
        if(a.PLAYER_ID < b.PLAYER_ID) return -1
        if(a.PLAYER_ID > b.PLAYER_ID) return 1
        return 0
    }

    const occurences = seasonAttendances?.reduce(function (acc, curr) {
        return acc[curr.PLAYER_ID] ? ++acc[curr.PLAYER_ID] : acc[curr.PLAYER_ID] = 1, acc
      }, {})
    
    let labels = [];
    let dataset = [];
    if(occurences) {
        const sum = Object.values(occurences)?.reduce((partialSum, a) => partialSum + a, 0);
        const nbPresence = Object.keys(occurences).map((key) => occurences[key])
        dataset = nbPresence.map((presence) => (total*presence)/sum)
        labels = players.filter( player => Object.keys(occurences).includes(player.Id.toString())).map(player => player.FIRST_NAME)
    }

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: 'Chart.js Bar Chart',
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
            label: 'Amount ($)',
            data: dataset,
            backgroundColor: '#702963',
            },
        ],
    };

    return(
        <Box style={{width:"50%", display:'flex', flexDirection:'column', alignItems:'center',margin:'20px 0px'}}>
            <Typography variant='h4' style={{color:'white'}}> Money Owed By Each Player</Typography>
            <Bar options={options} data={data}/>
        </Box>
    )
}
export default MoneyChart;