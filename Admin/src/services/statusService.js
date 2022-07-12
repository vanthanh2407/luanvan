import axios from "../axios"




const getAllStatus = () => {
    return axios.get('/status');
}

export {getAllStatus}