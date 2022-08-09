import axios from 'axios';
import _ from 'lodash';


const instance = axios.create({
    baseURL: "https://lvtn-laptop-backend.herokuapp.com",
    // baseURL: "http://localhost:8085/",

    //withCredentials: true
});

instance.interceptors.response.use(
    (response) => {
        const { data } = response;
        return response.data;
    },

);

export default instance;
