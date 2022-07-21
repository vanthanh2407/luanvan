
import axios from "../axios"




const getAllCate = () => {
    return axios.get('/category');
}
const createCate = (data) => {
    return axios.post('/create-category', data);
}
const deleteCate = (CateID) => {
    return axios.delete('/delete-category', { data: { id: CateID } });
}
const FindByIdCate = (CateID) => {
    return axios.delete('/category/:id', { data: { id: CateID } });
}
const updateCate = (data) => {
    return axios.put('/update-category', data);
}
const GetProductByType = (datatype) => {
    return axios.get('/getproductbytype?type=');
}

export { getAllCate, createCate, deleteCate, updateCate, FindByIdCate }