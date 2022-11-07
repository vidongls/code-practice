import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const useParams = (currentParams = {}) => {
    const [params, setParams] = useState({})
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        if (Object.keys(currentParams).length) {
            addParams(currentParams)
        } else {
            const currParams = Object.fromEntries(searchParams)

            if (Object.keys(currParams).length) {
                setParams(Object.fromEntries(searchParams))
            }
        }
    }, [])

    const addParams = (filter = {}) => {
        const newParams = { ...Object.fromEntries(searchParams), ...filter }
        const newObj = JSON.stringify(newParams)

        if (JSON.stringify(params) === JSON.stringify(filter)) {
            return
        }

        if (Object.keys(filter).length) {
            setSearchParams(JSON.parse(newObj))
            setParams(JSON.parse(newObj))
        } else {
            setSearchParams({})
            setParams({})
        }
    }

    return { params, addParams }
}

export default useParams
