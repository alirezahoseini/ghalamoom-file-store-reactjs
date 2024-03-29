import React from 'react'

export default function CounterBox(props) {
  return (
    <div className="w-full md:w-4/12 xl:w-3/12 p-3" >
    <div className=' w-full text-white rounded-xl gap-3 inline-flex items-center justify-start p-2' style={{backgroundColor : props.color}}>
      <div className="icon text-2xl lg:text-3xl bg-white bg-opacity-20 p-5 rounded-xl ">
        {props.icon}
      </div>
      <div className="body flex flex-col gap-2 ">
        <h2 className='text-sm lg:text-sm'>{props.title}</h2>
        <span className='text-lg lg:text-xl font-bold'>{props.count} عدد</span>
      </div>
    </div>
    </div>
  )
}
