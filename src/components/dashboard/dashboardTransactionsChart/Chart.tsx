'use client'

import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface IProps {
    data: {
        revenue: number;
        day: string;
    }[]
}

export default function Chart({ data }: IProps) {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                data={data}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <Line type="monotone" dataKey="revenue" activeDot={{ r: 8 }} stroke="#3b82f6" strokeWidth={2} name="Revenue" />
                <XAxis dataKey="day" />
                <YAxis width="auto" />
                <Legend align="right" />
                <Tooltip />
            </LineChart>
        </ResponsiveContainer >
    )
}
