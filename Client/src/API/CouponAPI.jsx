import axiosClient from './axiosClient'

const CouponAPI = {

    checkCoupon: (query) => {
        const url = `/checkCoupon${query}`
        return axiosClient.get(url)
    },

    getCoupon: (id) => {
        const url = `/coupon/${id}`
        return axiosClient.get(url)
    },

}

export default CouponAPI