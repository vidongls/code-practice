import Api from '../../utils/Api'

class ChallengeApi {
    getAll = (params?: any) => {
        return Api.get('/challenge', { params })
    }

    getOne = (id: string) => {
        return Api.get(`/challenge/${id}`, {})
    }

    create = (data: any) => {
        return Api.post('/challenge', data)
    }

    update = (id: string, data: any) => {
        return Api.put(`/challenge/${id}`, data)
    }

    remove = (id: string) => {
        return Api.delete(`/challenge/${id}`, {})
    }

    compile = (data:any) =>{
        return Api.post(`compile`, data)
    }
}

export default new ChallengeApi()
