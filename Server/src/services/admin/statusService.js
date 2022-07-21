
import db from "../../models/index";

let getAllStatus = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let status = await db.Status.findAll();
            resolve(status);
        } catch (error) {
            reject(error);
        }
    })
};


module.exports = {
    getAllStatus: getAllStatus,
}