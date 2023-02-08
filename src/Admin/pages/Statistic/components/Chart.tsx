import React, { useState } from 'react'

import ReactECharts from 'echarts-for-react'
import { get, map } from 'lodash'

interface IChartProps {
    data: any
}

const Chart: React.FC<IChartProps> = ({ data }) => {

    const option = {
        title: {
            text: 'Thống kê bài đã làm',
            subtext: '',
            left: 'center',
            textStyle: {
                fontFamily: '"Lexend", sans-serif',
            },
        },
        tooltip: {
            trigger: 'item',
        },
        legend: {
            orient: 'vertical',
            left: 'left',
        },
        dataset: {
            source: [
                get(data, 'field', []),
                ...map(get(data, 'data', []), item => [`${item.user.firstName} ${item.user.lastName}`, ...item.value]),
            ],
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar' }, { type: 'bar' }],
    }
    // = {
    //     title: {
    //         text: 'Thống kê',
    //         subtext: '',
    //         left: 'center',
    //         textStyle: {
    //             fontFamily: '"Lexend", sans-serif',
    //         },
    //     },
    //     tooltip: {
    //         trigger: 'item',
    //     },
    //     legend: {
    //         orient: 'vertical',
    //         left: 'left',
    //     },
    //     series: [
    //         {
    //             name: 'Tổng',
    //             type: 'pie',
    //             radius: '50%',
    //             data: data,
    //             emphasis: {
    //                 itemStyle: {
    //                     shadowBlur: 10,
    //                     shadowOffsetX: 0,
    //                     shadowColor: 'rgba(0, 0, 0, 0.5)',
    //                 },
    //             },
    //         },
    //     ],
    // }

    return (
        <>
            <ReactECharts
                option={option}
                style={{ height: '600px' }}
                notMerge={true}
            />
        </>
    )
}

export default Chart
