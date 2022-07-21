
import axios from "../axios"




const getAllPermiss = () => {
    return axios.get('/permiss');
}
const createPermiss = (data) => {
    return axios.post('/create-permiss', data);
}
const deletePermiss = (PermissID) => {
    return axios.delete('/delete-permiss', { data: { id: PermissID } });
}
const FindByIdPermiss = (PermissID) => {
    return axios.delete('/permiss/:id', { data: { id: PermissID } });
}
const updatePermiss = (data) => {
    return axios.put('/update-permiss', data);
}

export { getAllPermiss, createPermiss, deletePermiss, updatePermiss, FindByIdPermiss }