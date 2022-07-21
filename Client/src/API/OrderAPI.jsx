import axiosClient from './axiosClient'

const OrderAPI = {

    post_order: (data) => {
        const url = `/create-order`
        return axiosClient.post(url, data)
    },

    get_order: (id) => {
        const url = `/orders/${id}`
        return axiosClient.get(url)
    },

    get_detail: (id) => {
        const url = `/order/${id}`
        return axiosClient.get(url)
    },

    post_email: (data) => {
        const url = `/api/Payment/email`
        return axiosClient.post(url, data)
    },

    cancel_order: (data) => {
        const url = `/update-order/${data}`
        return axiosClient.put(url)
    },
    Get_User: (id) => {
        const url = `/userBy/${id}`
        return axiosClient.get(url)
    },

}

export default OrderAPI