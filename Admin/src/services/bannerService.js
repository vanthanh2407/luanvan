
import axios from "../axios"




const getAllBanner = () => {
    return axios.get('/banner');
}
const createBanner = (data) => {
    return axios.post('/create-banner', data);
}
const deleteBanner = (BannerID) => {
    return axios.delete('/delete-banner', { data: { id: BannerID } });
}
const FindByIdBanner = (BannerID) => {
    return axios.delete('/banner/:id', { data: { id: BannerID } });
}
const updateBanner = (data) => {
    return axios.put('/update-banner', data);
}


export { getAllBanner, createBanner, deleteBanner, updateBanner, FindByIdBanner }