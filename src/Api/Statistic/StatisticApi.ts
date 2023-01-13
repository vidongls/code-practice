import Api from '../../utils/Api'

class StatisticApi {
    getsHomeStatistic = (params?: any) => {
        return Api.get('/statistic/all', { params })
    }
}

export default new StatisticApi()
