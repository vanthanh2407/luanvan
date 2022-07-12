
import axios from "../axios"




const getAllComment = () => {
    return axios.get('/comment');
}
const createComment = (data) => {
    return axios.post('/create-comment', data);
}
const deleteComment = (commentID) => {
    return axios.delete('/delete-comment', { data: { id: commentID } });
}
const FindByIdcomment = (commentID) => {
    return axios.delete('/comment/:id', { data: { id: commentID } });
}
const updatecomment = (data) => {
    return axios.put('/update-comment', data);
}
const GetProductByType = (datatype) => {
    return axios.get('/getproductbytype?type=');
}

export { getAllComment, createComment, deleteComment, updatecomment, FindByIdcomment }