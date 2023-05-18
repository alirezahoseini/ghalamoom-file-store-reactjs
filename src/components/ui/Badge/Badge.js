

export default function Badge({ title, icon, value, customClass = '' }) {
  return (
    <div className={`badge inline-flex items-center bg-slate-100 py-2 px-2 w-fit rounded-md text-slate-500 font-bold gap-1 pointer-events-none my-1 ${customClass} `}>
      <span className="text-base">
        {icon}
      </span>
      <div className="flex items-center gap-1"  style={{fontSize: '10px'}}>
        <span>{title}</span>
        <span>{value}</span>
      </div>
    </div>
  )
}
