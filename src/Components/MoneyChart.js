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

// import { Typography } from "@material-ui/core";

function MoneyChart({season,setSeason,games}){
    const players = useContext(PlayerContext)
    const attendances = useContext(AttendanceContext)
    const [seasonAttendances, setSeasonAttendances] = React.useState()

    useEffect(() => {
        setSeasonAttendances(attendances?.filter(attendance => attendance.GAME_ID === games.filter(game => game.SEASON === season).Id))
        console.log("bhay",attendances?.map(attendance => attendances.find(attendance.GAME_ID === games.find( game => game.SEASON === season).Id)))
    },[games,season])

    const total = 850
    console.log(games.filter(game => game.SEASON +' - '+ season))
    // console.log(games.filter(game => game.SEASON === season).Id)
console.log("Season Attendances",seasonAttendances)
console.log(season)
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

    const labels = players.map(player => player.FIRST_NAME);

    const data = {
        labels,
        datasets: [
            {
            label: 'Amount ($)',
            data: labels.map(() => 97),
            backgroundColor: '#702963',
            },
        ],
    };

    return(
        <Box style={{width:"50%", display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Typography variant='h4' style={{color:'white'}}> Money Owed By Each Player</Typography>
            <Bar options={options} data={data}/>
        </Box>
    )
}
export default MoneyChart;