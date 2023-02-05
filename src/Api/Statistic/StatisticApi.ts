import Api from '../../utils/Api'

class StatisticApi {
    getsHomeStatistic = (params?: any) => {
        return Api.get('/statistic/all', { params })
    }
    statisticByClass = (params?: any) => {
        return Api.get('/statistic/class', { params })
    }
}

export default new StatisticApi()
