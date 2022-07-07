import axiosClient from './axiosClient'

const CommentAPI = {

    get_comment: (id) => {
        const url = `/comment/${id}`
        return axiosClient.get(url)
    },

    post_comment: (data, id) => {
        const url = `/create-comment/${id}`
        return axiosClient.post(url, data)
    }

}

export default CommentAPI