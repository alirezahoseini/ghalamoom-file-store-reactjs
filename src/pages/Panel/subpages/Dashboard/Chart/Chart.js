import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Chart.css'
// datas
import { dashboardChart } from '../../../../../data/chartsData'

// components
import CustomTooltip from './CustomTooltip';

export default function Chart() {

    return (
        <div className='w-full max-w-full h-64 bg-slate-50 dark:bg-slate-800  py-5 rounded-lg'>
            <h2 className='text-xs font-bold text-slate-800 mr-2 dark:text-slate-200'>سود شش ماه گذشته</h2>
            <div className='w-full h-full  '>
                <ResponsiveContainer >
                    <AreaChart
                        data={dashboardChart}
                        margin={{
                            top: 10,
                            right: 15,
                            left: -45,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient id='color' x1="0" y1="0" x2="0" y2="1">
                                <stop offset={'0%'} stopColor='#0026ff' stopOpacity={'0.4'} />
                                <stop offset={'75%'} stopColor='#0026ff' stopOpacity={'0.08'} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(str) => {
                                const monthName = str.slice(0, 3);

                                return monthName;
                            }}
                        />
                        <YAxis
                            dataKey={'income'}
                            axisLine={false}
                            tickLine={false}
                            ticks={[5, 10, 15, 20, 25, 30, 35, 40]}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="income" stroke="#0026ff" fill="url(#color)" />
                        <CartesianGrid opacity={'0.2'} />

                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )

}

