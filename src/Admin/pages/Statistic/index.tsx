import React from 'react'
import Chart from './components/Chart'

const AdminStatistics = () => {
    return (
        <div className="h-full w-full py-8 px-7">
            <div className="my-6 mt-0 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Thống kê</h3>
            </div>
            <Chart />
        </div>
    )
}

export default AdminStatistics
