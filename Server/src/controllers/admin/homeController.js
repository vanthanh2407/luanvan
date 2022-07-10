import db from "../models/index";



let getHomePage = async (req, res) => {

    try {
        return res.render('homepage.ejs', {
            data: JSON.stringify({})
        })

    } catch (e) {
        console.log(e);
    }

};
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Users.create({

                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                pwd: data.pwd,
                phone: data.phone,
                address: data.address,
                gender: data.gender,
                id_permission: data.id_permission,
            })
            resolve({
                errCode: 0,
                errMessage: 'OK'
            })
        } catch (e) {
            reject(e)
        }
    })
}
let handleCreateNewUser = async (req, res) => {
    let message = await createNewUser(req.body);
    return res.status(200).json(message);
}

module.exports = {
    getHomePage: getHomePage,
    createNewUser: createNewUser,
    handleCreateNewUser: handleCreateNewUser,
};