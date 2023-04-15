
export default function Modal({ isShow, onClose, size = 'w-8/12 lg:w-1/4', children }) {
    return (
        <div id='modal' className={`flex w-full max-w-screen h-screen fixed top-0 right-0 bg-gray-700 justify-center items-center bg-opacity-30 z-50 transition-all duration-500 ${isShow ? 'opacity-100 visible pointer-events-auto ' : 'opacity-0 invisible pointer-events-none'}`}>
            <div id="backdrop-filter" className="absolute w-full h-full cursor-pointer " onClick={onClose}></div>
            <div className={`bg-white p-1  rounded-xl flex flex-col items-center justify-center gap-5 z-10 transition-all duration-500 dark:bg-slate-800 ${size} ${isShow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-36'}`}>
                {/* Content  */}
                {children}
                {/* Content  */}
            </div>
        </div>
    )
}