import { TbSeeding, TbDiamond, TbMoneybag, TbBolt } from 'react-icons/tb'

//components
import GrowBoxItem from './GrowBoxItem'

export default function GrowBoxes() {
    const boxesArray = [
        {
            id: 1, 
            title: 'فروش این ماه',
            value: '32.752.000',
            percent: 31,
            icon: <TbDiamond/>,
            iconBgColor : 'bg-gradient-to-tr from-blue-500 to-blue-300'
        },
        {
            id: 2, 
            title: 'سود این ماه',
            value: '8.580.000',
            percent: -2,
            icon: <TbSeeding/>,
            iconBgColor : 'bg-gradient-to-tr from-green-500 to-green-300'
        },
        {
            id: 3, 
            title: 'سرمایه در گردش',
            value: '382.580.000',
            percent: 12,
            icon: <TbMoneybag/>,
            iconBgColor : 'bg-gradient-to-tr from-slate-500 to-slate-300'
        },
        {
            id: 4, 
            title: 'درآمد امسال',
            value: '125.730.000',
            percent: 17,
            icon: <TbBolt/>,
            iconBgColor : 'bg-gradient-to-tr from-yellow-500 to-yellow-300'
        },
    ]
    return (
        <div id="grow-boxes" className='flex items-center w-full mt-3 flex-col md:flex-row md:flex-wrap'>
            {boxesArray.map(item => (
                <GrowBoxItem key={item.id} {...item} />
            ))}
        </div>
    )
}
