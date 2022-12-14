import Api from '../../utils/Api'

class ClassApi {
    getClassByAuthor = (params?: any) => {
        return Api.get('/class/get-by/author', { params })
    }

    getOne = (id: string) => {
        return Api.get(`/class/${id}`, {})
    }

    addMemberToClass = (classId: string, data: any) => {
        return Api.post(`/class/${classId}/add-user`, data)
    }

    removeMember = (classId: string, data: any) => {
        return Api.post(`/class/${classId}/remove-user`, data)
    }
}

export default new ClassApi()
