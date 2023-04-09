
export default function Loader({isShow}) {
  return (
    <div id='global-loader' className={`flex w-screen h-screen fixed top-0 right-0 bg-secondary-1 justify-center items-center bg-opacity-10 backdrop-blur-sm z-50 transition-all duration-500 ${isShow ? 'opacity-100 visible pointer-events-auto ' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className={`bg-white px-5 py-3 w-8/12 lg:w-1/4 rounded-xl flex flex-col items-center justify-center gap-5`}>
            <img src="./images/public-img/loading.gif" alt="" className='w-1/2' />
            <span className='-mt-5 font-semibold text-gray-5 mb-4'>لطفا منتظر بمانید</span>
        </div>
    </div>
  )
}
