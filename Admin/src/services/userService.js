import axios from "../axios"



const getAlluser = () => {
    return axios.get('/user');
}
const createuser = (data) => {
    return axios.post('/create-userTest', data);
}
const deleteuser = (userID) => {
    return axios.delete('/delete-user', { data: { id: userID } });
}
const updateuser = (data) => {
    return axios.put('/update-user', data);
}

const GetUserByType = (datatype) => {
    return axios.get(`/searchByType?type=${datatype}`);
}



export {
    getAlluser, createuser, deleteuser, updateuser, GetUserByType
}