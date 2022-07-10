
import axios from "../axios"




const getAllnews = () => {
    return axios.get('/news');
}
const createnews = (data) => {
    return axios.post('/create-news', data);
}
const deletenews = (NewsID) => {
    return axios.delete('/delete-news', { data: { id: NewsID } });
}
const updatenews = (data) => {
    return axios.put('/update-news', data);
}

export { getAllnews, createnews, deletenews, updatenews }