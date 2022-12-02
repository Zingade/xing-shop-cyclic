import React from 'react';
import { makeStyles } from '@material-ui/core';
import { ResponsiveContainer, Tooltip, Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from 'recharts';

function MonthlyExpenseChart(props) {
    const {data} = props
    return(
        <>
            <ResponsiveContainer  width="80%" aspect={1}>
                <BarChart data={data}>
                    <XAxis dataKey={"month"} fontSize={10} interval={0} tickSize={15} angle={-30}/> 
                    <YAxis dataKey={"expense"} fontSize={10} interval={0} tickLine={false} /> 
                    <Tooltip/>
                    <Bar dataKey={"expense"} fill="#db5581" label={{ angle: -90, position:'middle', verticalAlign:"middle", fill: 'white' }}/>
                </BarChart>
            </ResponsiveContainer>
        </>
    )
}

export default MonthlyExpenseChart;