import Api from '../../utils/Api'

class UserApi {
    register = (data: any) => {
        return Api.post('/user/register', data)
    }

    login = (data: any) => {
        return Api.post('/user/login', data)
    }

    logout = () => {
        return Api.post('/user/logout', {})
    }

    getAll = (params?: any) => {
        return Api.get('/user', { params })
    }
}

export default new UserApi()
