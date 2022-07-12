import axiosClient from './axiosClient'

const Detail_OrderAPI = {

    post_detail_order: (data) => {
        const url = `/create-detailorder`
        return axiosClient.post(url, data)
    },

    get_detail_order: (id_order) => {
        const url = `/detailorder/${id_order}`
        return axiosClient.get(url)
    }

}

export default Detail_OrderAPI