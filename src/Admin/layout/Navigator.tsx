import React, { useEffect, useState } from 'react'
import { Breadcrumb } from 'antd'

import { Link } from 'react-router-dom'

import { get, isEmpty } from 'lodash'
import { useNavigatorStore } from '../../store/useNavigatorStore'

interface INavigator {}

const Navigator: React.FC<INavigator> = () => {
    const { data: dataStore } = useNavigatorStore()
    const [data, setData] = useState([] as any)

    useEffect(() => {
        setData(dataStore)
    }, [dataStore])
    return (
        <Breadcrumb className="breadcrumb-header align-items-center">
            {/* <Breadcrumb.Item key={1}>
                <Link to={"home"}>{Trang chủ}</Link>
            </Breadcrumb.Item> */}
            {!isEmpty(data) &&
                data.navigator.map((item: any, index: number) => {
                    const { name, to } = item
                    return (
                        <Breadcrumb.Item key={index}>
                            {item.to ? <Link to={to}>{name}</Link> : <span>{name}</span>}
                        </Breadcrumb.Item>
                    )
                })}
        </Breadcrumb>
    )
}

export default Navigator
