import Api from '../../utils/Api'

class ChallengeApi {
    getAll = (params: any) => {
        return Api.get('/challenge', params)
    }

    create = (data: any) => {
        return Api.post('/challenge', data)
    }

    update = (id: number, data: any) => {
        return Api.post(`/challenge/${id}`, data)
    }
    remove = (id: number) => {
        return Api.delete(`/challenge/${id}`, {})
    }
}

export default new ChallengeApi()
