
import axios from "../axios"




const getAllSupplier = () => {
    return axios.get('/supplier');
}
const createSupplier = (data) => {
    return axios.post('/create-supplier', data);
}
const deleteSupplier = (SupplierID) => {
    return axios.delete('/delete-supplier', { data: { id: SupplierID } });
}
const FindByIdSupplier = (SupplierID) => {
    return axios.delete('/supplier/:id', { data: { id: SupplierID } });
}
const updateSupplier = (data) => {
    return axios.put('/update-supplier', data);
}

export { getAllSupplier, createSupplier, deleteSupplier, updateSupplier, FindByIdSupplier }