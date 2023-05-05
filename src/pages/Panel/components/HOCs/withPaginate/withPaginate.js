import React, { useState, useEffect } from 'react'

function withPaginate(OrginalComponent) {

    const NewComponent = (props) => {
        const [paginationCurrentPage, setPaginationCurrentPage] = useState(1);
        const [paginatedItems, setPaginatedItems] = useState([]);
        const paginationSize = 8;
        const changePaginationHandler = (newCurrent) => {
            setPaginationCurrentPage(newCurrent)
        }

        useEffect(() => {
            let newPaginatedItems = props.data;
            const lastIndex = paginationCurrentPage * paginationSize;
            const firstIndex = lastIndex - paginationSize;
            newPaginatedItems = newPaginatedItems.slice(firstIndex, lastIndex);
            setPaginatedItems(newPaginatedItems)
            window.scrollTo(0, 0)
        }, [props.data, paginationCurrentPage])

        if (props.data.length > paginationSize) {
            // With pagination 
            return <OrginalComponent {...props} changePaginationHandler={changePaginationHandler} paginatedItems={paginatedItems} paginationCurrentPage={paginationCurrentPage} paginationSize={paginationSize} totalPaginateItems={props.data.length} />
        } else {
            // Without pagination
            return <OrginalComponent {...props} paginatedItems={props.data} />
        }
    }

    return NewComponent
}

export default withPaginate