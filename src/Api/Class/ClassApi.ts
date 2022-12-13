import Api from '../../utils/Api'

class ClassApi {
    getClassByAuthor = (params?: any) => {
        return Api.get('/class/get-by/author', { params })
    }


    getOne = (id:string) => {
        return Api.get(`/class/${id}`, {})
    }
}

export default new ClassApi()
