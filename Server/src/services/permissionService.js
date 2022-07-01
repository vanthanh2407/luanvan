import db from "../models/index";

let getAllPermission = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let permiss = await db.Permission.findAll();
            resolve(permiss);
        } catch (error) {
            reject(error);
        }
    })
}
let getPermissByID = (PermissID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let permiss = await db.Permission.findOne({
                where: { id: PermissID },
                raw: false
            })
            if (!permiss) {
                resolve({
                    errCode: 2,
                    errMessage: 'The Permission is not exist'
                })
            }
            resolve(permiss);
        } catch (error) {
            reject(error);
        }
    })
}

let createNewPermiss = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Permission.create({

                permission: data.permission,

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
let deletePermiss = (PermissID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let permiss = await db.Permission.findOne({
                where: { id: PermissID },
                raw: false
            })
            if (!permiss) {
                resolve({
                    errCode: 2,
                    errMessage: 'Permiss is not exist'
                })
            } else {
                await permiss.destroy();
            }
            resolve({
                errCode: 0,
                errMessage: 'Permiss is delete success'
            })
        } catch (error) {
            reject(error)
        }
    })
}
let updatePermiss = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Messing requited parameter"
                });
            }
            let permiss = await db.Permission.findOne({
                where: { id: data.id },
                raw: false,
            });
            if (permiss) {
                permiss.permission = data.permission;


                await permiss.save();
                resolve({
                    errCode: 0,
                    errMessage: "Update Permiss Success!"
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "Permiss is not found!"
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    getAllPermission: getAllPermission,
    getPermissByID: getPermissByID,
    createNewPermiss: createNewPermiss,
    deletePermiss: deletePermiss,
    updatePermiss: updatePermiss,

}