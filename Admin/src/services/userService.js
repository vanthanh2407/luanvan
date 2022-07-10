import axios from "../axios"



const getAlluser = () => {
    return axios.get('/user');
}
const createuser = (data) => {
    return axios.post('/create-user', data);
}
const deleteuser = (userID) => {
    return axios.delete('/delete-user', { data: { id: userID } });
}
const updateuser = (data) => {
    return axios.put('/update-user', data);
}



export {
    getAlluser, createuser, deleteuser, updateuser
}