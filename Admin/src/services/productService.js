
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
const FindByIdProduct = (ProductID) => {
    return axios.delete('/product/:id', { data: { id: ProductID } });
}
const updateProduct = (data) => {
    return axios.put('/update-product', data);
}
const GetProductByType = (datatype) => {
    return axios.get('/getproductbytype?type=');
}

export { handleLoginApi, getAllBooks, createProduct, deleteProduct, updateProduct, FindByIdProduct }