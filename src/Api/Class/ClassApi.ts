import Api from '../../utils/Api'

class ClassApi {
    createClass = (data: any) => {
        return Api.post(`/class`, data)
    }

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

    deleteClass = (classId: string) => {
        return Api.delete(`/class/${classId}`, {})
    }

    updateClass = (classId: string, data: any) => {
        return Api.put(`/class/${classId}`, data)
    }

    getClassesDoing = () => {
        return Api.get(`/class/get-all/exam-doing`, {})
    }
}

export default new ClassApi()
