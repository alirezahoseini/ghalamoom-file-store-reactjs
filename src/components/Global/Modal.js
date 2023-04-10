
export default function Modal({ isShow, onClose, size = 'w-8/12 lg:w-1/4', children }) {
    return (
        <div id='global-loader' className={`flex w-screen h-screen fixed top-0 right-0 bg-secondary-1 justify-center items-center bg-opacity-10 backdrop-blur-sm z-50 transition-all duration-500 ${isShow ? 'opacity-100 visible pointer-events-auto ' : 'opacity-0 invisible pointer-events-none'}`}>
            <div id="backdrop-filter" className="absolute w-full h-full cursor-pointer" onClick={onClose}></div>
            <div className={`bg-white px-5 py-3 rounded-xl flex flex-col items-center justify-center gap-5 z-10 transition-all duration-500 ${size} ${isShow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-36'}`}>
                {/* Content  */}
                {children}
                {/* Content  */}
            </div>
        </div>
    )
}