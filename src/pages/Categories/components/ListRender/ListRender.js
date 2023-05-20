// HOCs
import whithPaginate from '../../../../components/HOCs/withPaginate/withPaginate'

// components
import ProductGridItem from '../../../Home/components/ProductsGrid/ProductGridItem/ProductGridItem'
import GlobalPagination from '../../../../components/ui/GlobalPagination/GlobalPagination'
import CarouselArtworkItem from '../../../Home/components/Carousel/CarouselItems/CarouselArtworkItem/CarouselArtworkItem'



function ListRender({ pageSize = 8, title, type = 'product', paginatedItems, paginationCurrentPage, paginationSize, changePaginationHandler, totalPaginateItems }) {

    return (
        <div id='data-list'>
            <div className="wrraper w-full p-2 flex flex-col items-center text-xs">
                {paginatedItems.length === 0 ? (
                    <h2 className='text-lg font-bold mt-10 text-slate-400 dark:text-slate-500 '>
                        {title}
                        <span> برای نمایش وجود ندارد</span>
                    </h2>
                ) : (
                    // list Rendering 
                    <div className='flex flex-wrap w-full'>
                        {paginatedItems.map((item =>
                        (
                            type === 'product' ? (
                                (<ProductGridItem key={item.id} type={type} {...item} />)
                            ) : (
                                type === 'artwork' && (
                                    (<div key={item.id} className='w-full md:w-6/12 lg:w-4/12'>
                                        <CarouselArtworkItem {...item} type={type} />
                                    </div>)

                                )
                            )

                        )))}
                    </div>
                )}
            </div>
            {
                // Pagination 
                paginationSize <= totalPaginateItems && (
                    <GlobalPagination totalItems={totalPaginateItems}
                        currentPage={paginationCurrentPage}
                        pageSize={paginationSize}
                        setCurrentPage={changePaginationHandler} />
                )
            }
        </div >
    )
}

export default whithPaginate(ListRender)