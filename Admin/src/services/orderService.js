
import axios from "../axios"




const getAllOrder = () => {
    return axios.get('/order');
}
const getAllDetailOrder = (IdOrder) => {
    return axios.get(`/detailorder/${IdOrder}`);
}


const updateOrder = (data) => {
    return axios.put('/update-order', data);
}


export { getAllOrder, updateOrder, getAllDetailOrder }