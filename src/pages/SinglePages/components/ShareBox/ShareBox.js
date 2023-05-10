import SocialIcons from "./SocialIcons"

export default function ShareBox() {
    return (
        <div className='share-box  w-full'>
            <div className="wrapper w-full bg-white p-4 rounded-2xl flex items-center justify-between gap-3">
                <h5 className='font-black text-3xl  flex flex-col text-slate-300 justify-center mt-2'>
                    <span>اشتراک</span>
                    <span>گــذاری</span>
                </h5>
               <SocialIcons />
            </div>
        </div>
    )
}
