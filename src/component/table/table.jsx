import React, { useEffect, useState } from "react"
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi"

const Table = ( { tableName, thead, data, button, funcButton, children, fetch, color } ) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const [itemsPerPage, setItemPerPage] =  useState('')
    const [ refData, setRefData ] = useState(data)

    const response = data.data
    const meta = data

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const handleItemChange = (e) => {
        const selectedValue = e.target.value
        setItemPerPage(selectedValue)
    }

    useEffect(() => {
        fetch != '' ? '' : fetch(currentPage, itemsPerPage)
        setRefData(data)
    }, [currentPage, itemsPerPage])

    const filteredData = response ? response.filter((item) => {
        const searchTerms = searchTerm.toLowerCase().split(" ");
            return searchTerms.every((term) =>
                Object.values(item).some((value) =>
                    String(value).toLowerCase().includes(term)
                )
            );
    }) : refData ? refData.filter((item) => {
        const searchTerms = searchTerm.toLowerCase().split(" ");
            return searchTerms.every((term) =>
                Object.values(item).some((value) =>
                    String(value).toLowerCase().includes(term)
                )
            );
    }) : [];

    const totalPages = meta && meta.total ? meta.total : 0;

    const renderPagination = () => {
        const pageNumbers = []

        if (totalPages <= 10) {
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
            <button
                key={i}
                onClick={() => handlePageChange(i)}
                className={`btn btn-sm ${currentPage === i ? "btn-error" : "btn-accent"}`}
            >
                {i}
            </button>
            )
        }
        } else {
        const startPage = Math.max(1, currentPage - 2)
        const endPage = Math.min(totalPages, startPage + 4)

        if (startPage > 1) {
            pageNumbers.push(
            <button
                key="first"
                onClick={() => handlePageChange(1)}
                className="btn btn-accent btn-sm"
            >
                1
            </button>
            )
            pageNumbers.push(<span className="btn btn-accent btn-sm" key="ellipsis1">...</span>)
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
            <button
                key={i}
                onClick={() => handlePageChange(i)}
                className={`btn btn-sm ${currentPage === i ? "btn-secondary" : "btn-accent"}`}
            >
                {i}
            </button>
            )
        }

        if (endPage < totalPages) {
            pageNumbers.push(<span className="btn btn-accent btn-sm" key="ellipsis2">...</span>)
            pageNumbers.push(
            <button
                key="last"
                onClick={() => handlePageChange(totalPages)}
                className="btn btn-accent btn-sm"
            >
                {totalPages}
            </button>
            )
        }
        }

        return pageNumbers
    }

    function renderThead(){
        return thead ? thead.map((thRender, index) => {
            return (
                <th className="capitalize" key={index}> { thRender } </th>
            )
        }) : []
    }

    function renderButton() {
        return button ? button.map((btnRender, index) => (
            <button onClick={() => funcButton[index]()} key={index} className={`btn btn-${color[index]} capitalize`}>{btnRender}</button>
        )) : null;
    }    

    return(
        <div className="w-full h-max p-8 bg-base-100 rounded-md shadow-md flex flex-col gap-8">
            <div className="flex gap-4 justify-between flex-wrap items-center">
                <span className="text-xl font-semibold capitalize">{ tableName }</span>

                <div className="flex gap-4 flex-wrap">
                    <select className="select select-bordered max-w-xs" onChange={handleItemChange}>
                        {/* <option disabled selected>Data di tampilkan</option> */}
                        <option value={'10'}>10</option>
                        <option value={'25'}>25</option>
                        <option value={'50'}>50</option>
                        <option value={'100'}>100</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="input input-md input-bordered"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    { renderButton() }
                </div>
            </div>

            <div className="overflow-scroll">
                <table className="table">
                    <thead>
                        <tr>
                            { renderThead() }
                        </tr>
                    </thead>
                    <tbody>
                        { filteredData.length > 0 ? filteredData.map((item, index) => (
                            <tr key={index}>{children(item, index)}</tr>
                        )) : 
                            <tr>
                                <td className="text-center font-semibold w-full" colSpan={thead.length}>Tidak Ada Data</td> 
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
            <div className="pagination mt-10 flex gap-2 justify-center">
                <button
                    onClick={() =>
                    handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
                    }
                    disabled={currentPage === 1}
                    className="btn btn-accent btn-sm"
                >
                    <BiArrowToLeft />
                </button>
                {renderPagination()}
                <button
                    onClick={() =>
                    handlePageChange(
                        currentPage < totalPages ? currentPage + 1 : totalPages
                    )
                    }
                    disabled={currentPage === totalPages}
                    className="btn btn-accent btn-sm"
                >
                    <BiArrowToRight />
                </button>
            </div>
        </div>
    )
}

export default Table