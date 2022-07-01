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

    Get_Detail_User: (Inputemail, Inputpassword) => {
        return axiosClient.post('/login', { email: Inputemail, pwd: Inputpassword });
    },

    Post_User: (data) => {
        const url = '/create-user'
        return axiosClient.post(url, data)
    }

}

export default User
const handleLoginApi = (Inputemail, Inputpassword) => {
    return axiosClient.post('/login', { email: Inputemail, pwd: Inputpassword });
}

export { handleLoginApi }