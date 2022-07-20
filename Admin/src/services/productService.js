
import axios from "../axios"



const handleLoginApi = (Inputemail, Inputpassword) => {
    return axios.post('/login', { email: Inputemail, pwd: Inputpassword });
}
const getAllBooks = () => {
    return axios.get('/products');
}
const getAllProduct = () => {
    return axios.get('/product');
}
const createProduct = (data) => {
    return axios.post('/create-product', data);
}
const deleteProduct = (ProductID) => {
    return axios.delete('/delete-product', { data: { id: ProductID } });
}
const FindByIdProduct = (ProductID) => {
    return axios.delete('/products/:id', { data: { id: ProductID } });
}
const updateProduct = (data) => {
    return axios.put('/update-product', data);
}
const GetPageProduct = (page, size) => {
    return axios.get(`/product-page?page=${page}&size=${9}`);
}

export { handleLoginApi, getAllBooks, createProduct, deleteProduct, updateProduct, FindByIdProduct, getAllProduct, GetPageProduct }