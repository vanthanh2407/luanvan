
import axios from "../axios"




const getAllOrder = () => {
    return axios.get('/order');
}



const updateOrder = (data) => {
    return axios.put('/update-order', data);
}


export { getAllOrder, updateOrder  }