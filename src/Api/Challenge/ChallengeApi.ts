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

    compile = (data: any) => {
        return Api.post(`compile`, data)
    }

    submitChallenge = (data: any) => {
        return Api.post(`submit/challenge`, data)
    }

    userDoChallenge = (params?: any) => {
        return Api.get('/challenge', { params })
    }

    getNewestChallenge = () => {
        return Api.get('/challenge/all/newest', {})
    }
    getRankingChallenge = () => {
        return Api.get('/challenge/all/ranking', {})
    }

    changeRealtime = (challengeId: string, data: any) => {
        return Api.post(`/challenge/${challengeId}/change-realtime`, data)
    }

    startRealtimeChallenge = (challengeId: string) => {
        return Api.post(`/challenge/${challengeId}/start-challenge`, {})
    }

    getStaticsChallengeRealtime = (id: string, params: any) => {
        return Api.get(`/challenge/${id}/realtime-statics`, { params })
    }

    startDoingChallenge = (challengeId: string) => {
        return Api.post(`/challenge/${challengeId}/start-doing-challenge`, {})
    }

    getOneDoingChallenge = (challengeId: string) => {
        return Api.get(`/challenge/${challengeId}/get-doing-challenge`, {})
    }

    getRandomChallenge = () => {
        return Api.get(`/challenge/user/get-random`, {})
    }

    addClassToChallenge = (classId: string, data: any) => {
        return Api.post(`/challenge/${classId}/add-class-to-challenge`, data)
    }

    userSearchChallenge = (params?: any) => {
        return Api.get('/challenge/user/search', { params })
    }
}

export default new ChallengeApi()
