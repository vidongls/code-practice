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

    getInfo = () => {
        return Api.get('/user/me', {})
    }

    userChangeInfo = (data: any) => {
        return Api.put('/user/change-info', data)
    }
    userChangeAvatar = (data: any) => {
        return Api.put('/user/change-avatar', data)
    }
}

export default new UserApi()
