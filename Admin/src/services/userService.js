
import axios from "../axios"



const handleLoginApi = (Inputemail, Inputpassword) => {
    return axios.post('/login', { email: Inputemail, pwd: Inputpassword });
}
const getAllBooks = () => {
    return axios.get('/product');
}
const createProduct = (data) => {
    return axios.post('/create-product', data);
}
const deleteProduct = (ProductID) => {
    return axios.delete('/delete-product', { data: { id: ProductID } });
}
const updateProduct = (data) => {
    return axios.put('/update-product', data);
}

export { handleLoginApi, getAllBooks, createProduct, deleteProduct, updateProduct }