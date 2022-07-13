
import axios from "../axios"




const getAllcoupon = () => {
    return axios.get('/coupon');
}
const createcoupon = (data) => {
    return axios.post('/create-coupon', data);
}
const deletecoupon = (couponID) => {
    return axios.delete('/delete-coupon', { data: { id: couponID } });
}

const updatecoupon = (data) => {
    return axios.put('/update-coupon', data);
}


export { getAllcoupon, createcoupon, deletecoupon, updatecoupon }