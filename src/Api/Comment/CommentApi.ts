import Api from '../../utils/Api'

class CommentApi {
    sendComment = (data: any) => {
        return Api.post('/comment', data)
    }
}

export default new CommentApi()
