import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const useParams = (currentParams = {}) => {
    const [params, setParams] = useState({})
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        if (currentParams) {
            addParams(currentParams)
        } else {
            setParams(Object.fromEntries(searchParams))
        }
    }, [])

    const addParams = (filter = {}) => {
        const newParams = { ...Object.fromEntries(searchParams), ...filter }
        if (JSON.stringify(params) === JSON.stringify(newParams)) {
            return
        }

        if (filter) {
            setSearchParams(newParams)
            setParams(newParams)
        } else {
            setSearchParams(filter)
            setParams(filter)
        }
    }

    return { params, addParams }
}

export default useParams
