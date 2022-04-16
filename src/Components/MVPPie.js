import React from 'react';

import { Box } from "@material-ui/core";

//Chart
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

function MVPPie({labels,counts}) {
    const colors = [
        'rgba(159, 43, 104, 1)',
        'rgba(191, 64, 191, 1)',
        'rgba(128, 0, 32, 1)',
        'rgba(112, 41, 99, 1)',
        'rgba(170, 51, 106, 1)',
        'rgba(48, 25, 52, 1)',
        'rgba(93, 63, 211, 1)',
        'rgba(203, 195, 227, 1)',
        'rgba(230, 230, 250, 1)'
    ]

    ChartJS.register(ArcElement, Tooltip, Legend);
    const chartData = {
        labels: labels,
        datasets: [
          {
            data: counts,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1,
          },
        ],
      }

    return(
        <Box style={{width:'50%'}}>
            <Pie data={chartData} />
        </Box>
    )
}
export default MVPPie;