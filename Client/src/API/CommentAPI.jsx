import axiosClient from './axiosClient'

const CommentAPI = {

    get_comment: (id_product) => {
        const url = `/comment/${id_product}`
        return axiosClient.get(url)
    },

    post_comment: (data, id) => {
        const url = `/create-comment`
        return axiosClient.post(url, data)
    }

}

export default CommentAPI