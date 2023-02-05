import React from 'react'

import ReactECharts from 'echarts-for-react'

interface IChartProps {
    data: any
}

const Chart: React.FC<IChartProps> = ({ data }) => {
    const option = {
        title: {
            text: 'Thống kê',
            subtext: 'Fake Data',
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
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: data,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    }

    return (
        <ReactECharts
            option={option}
            style={{ height: '600px' }}
        />
    )
}

export default Chart
