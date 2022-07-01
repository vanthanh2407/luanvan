import db from "../models/index";
import Sequelize from "sequelize";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);


let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.Users.findAll({
                attributes: ['id', 'firstname', 'lastname', 'email', 'pwd', 'phone', 'address', 'gender', 'id_permission',],
                raw: true
            });
            resolve(users);

        } catch (error) {
            console.log(error);
        }
    })
};

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkEmail = await checkUserEmail(data.email);
            if (checkEmail === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already exist, Please try anther email'
                })
            }
            let hashPwdBcrypt = await hashUserPwd(data.pwd);
            console.log("check: " + hashPwdBcrypt);
            await db.Users.create({

                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                pwd: hashPwdBcrypt,
                phone: data.phone,
                address: data.address,
                gender: data.gender,
                id_permission: data.id_permission,
            })
            resolve({
                errCode: 0,
                errMessage: 'OK',

            })

        } catch (error) {
            console.log(error);
        }
    })
}

let createNewUserReal = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkEmail = await checkUserEmail(data.email);
            if (checkEmail === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already exist, Please try anther email'
                })
            }
            let hashPwdBcrypt = await hashUserPwd(data.pwd);
            await db.Users.create({

                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                pwd: hashPwdBcrypt,
                phone: data.phone,
                address: data.address,
                gender: data.gender,
                id_permission: data.id_permission,
            })
            resolve({
                errCode: 0,
                errMessage: 'OK',

            })

        } catch (error) {
            console.log(error);
        }
    })
}
let deleteUser = (UserID) => {
    return new Promise(async (resolve, reject) => {
        try {

            let user = await db.Users.findOne({
                where: { id: UserID },
                raw: false
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: 'User is not exist'
                })
            } else {
                await user.destroy();
            }
            resolve({
                errCode: 0,
                errMessage: 'User is delete success'
            })
        } catch (error) {
            reject(error)
        }
    })
}
let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Messing requited parameter"
                });
            }
            let user = await db.Users.findOne({
                where: { id: data.id },
                raw: false,
            });
            if (user) {
                user.firstname = data.firstname;
                user.lastname = data.lastname;
                user.phone = data.phone;
                user.address = data.address;
                user.gender = data.gender;

                await user.save();
                resolve({
                    errCode: 0,
                    errMessage: "Update User Success!"
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "User is not found!"
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}
let getUserByID = (UserID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: { id: UserID },
                raw: false
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: 'The user is not exist'
                })
            }
            resolve(user);
        } catch (error) {
            reject(error);
        }
    })
}

let login = (email, pwd) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let userIsExist = await checkUserEmail(email);
            if (userIsExist) {
                let user = await db.Users.findOne({
                    where: { email: email },
                    attributes: ['email', 'id_permission', 'pwd', 'firstname', 'lastname'],
                    raw: true
                });
                if (user) {
                    let check = await bcrypt.compareSync(pwd, user.pwd)
                    if (email == user.email && check) {
                        userData.errCode = 0;
                        userData.errMessage = 'Login Success!';
                        delete user.pwd;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = 'Your not exist!';
                }
                resolve(userData);
            } else {
                userData.errCode = 1;
                userData.errMessage = 'Your Email not exist!';
                resolve(userData);
            }
        } catch (error) {
            reject(error);
        }
    })
}
let loginReal = (email, pwd) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let userIsExist = await checkUserEmail(email);
            if (userIsExist) {
                let user = await db.Users.findOne({
                    where: { email: email },
                    attributes: ['email', 'id_permission', 'pwd', 'firstname', 'lastname'],
                    raw: true
                });
                if (user) {
                    let check = await bcrypt.compareSync(pwd, user.pwd)
                    if (email == user.email && check) {
                        userData.errCode = 0;
                        userData.errMessage = 'Login Success!';
                        delete user.pwd;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = 'Your not exist!';
                }
                resolve(userData);
            } else {
                userData.errCode = 1;
                userData.errMessage = 'Your Email not exist!';
                resolve(userData);
            }
        } catch (error) {
            reject(error);
        }
    })
}
let checkUserEmail = (InputEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: { email: InputEmail }
            });
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error);
        }
    })
}
let hashUserPwd = (pwd) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPwd = await bcrypt.hashSync(pwd, salt);
            resolve(hashPwd);
        } catch (error) {
            reject(error);
        }
    })
}


let SearchUser = (search) => {
    return new Promise(async (resolve, reject) => {
        try {
            // let key = "Asus";
            let products = await db.Users.findAll({
                where: Sequelize.literal(`MATCH (firstname,lastname) AGAINST(` + `"` + search + `"` + `)`)
            });
            resolve(products);
        } catch (error) {
            // reject(error);
            console.log(error);
        }
    })
}
module.exports = {
    getAllUser: getAllUser,
    createNewUserReal: createNewUserReal,
    deleteUser: deleteUser,
    updateUser: updateUser,
    getUserByID: getUserByID,
    checkUserEmail: checkUserEmail,
    loginReal: loginReal,
    SearchUser: SearchUser,
    login: login,
    createNewUser: createNewUser,

}