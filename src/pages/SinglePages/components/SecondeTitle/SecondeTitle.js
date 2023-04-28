import chevronLeft from '../../../../assets/icons/chevron-left.svg'

export default function SecondeTitle({title}) {
  return (
    <div className='seconde-title flex items-center gap-4'>
        <img src={chevronLeft} alt="chevronLeft icon" style={{width: '25px'}} />
        <h3 className='font-bold text-2xl font-rokh text-custom-blue-700 mt-2'>{title}</h3>
    </div>
  )
}
