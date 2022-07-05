import axiosClient from './axiosClient'

const User = {

    Get_All_User: () => {
        const url = '/user'
        return axiosClient.get(url)
    },

    Get_User: (id) => {
        const url = `/userBy/${id}`
        return axiosClient.get(url)
    },

    Put_User: (data) => {
        const url = `/update-user`
        return axiosClient.put(url, data)
    },

    Get_Detail_User: (email, pwd) => {
        return axiosClient.post('/login', { email: email, pwd: pwd });    },

    Post_User: (data) => {
        const url = '/create-userTest'
        return axiosClient.post(url, data)
    }

}

export default User
const handleLoginApi = (email, pwd) => {
    return axiosClient.post('/login', { email: email, pwd: pwd });}

export { handleLoginApi }