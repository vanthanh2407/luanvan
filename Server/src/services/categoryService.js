import { use } from "express/lib/application";
import db from "../models/index";

let getAllCate = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let cates = await db.Category.findAll();
            resolve(cates);
        } catch (error) {
            reject(error);
        }
    })
};
let getCateByID = (CateID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let cate = await db.Category.findOne({
                where: { id: CateID },
                raw: false
            })
            if (!cate) {
                resolve({
                    errCode: 2,
                    errMessage: 'The user is not exist'
                })
            }
            resolve(cate);
        } catch (error) {
            reject(error);
        }
    })
}
let createCate = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // let order = 
            await db.Category.create({

                category: data.category,
            })
            // let detailorder = await db.DetailOrder.create({
            //     idorder: order.id
            // })
            resolve({
                errCode: 0,
                errMessage: 'OK'
            })
        } catch (e) {
            reject(e)
        }
    })
}
let updateCate = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Messing requited parameter"
                });
            }
            let cate = await db.Category.findOne({
                where: { id: data.id },
                raw: false,
            });
            if (cate) {
                cate.category = data.category;
                await cate.save();
                resolve({
                    errCode: 0,
                    errMessage: "Update Category Success!"
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "Category is not found!"
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}
let deleteCate = (CateID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let cate = await db.Category.findOne({
                where: { id: CateID },
                raw: false
            })
            if (!cate) {
                resolve({
                    errCode: 2,
                    errMessage: 'Category is not exist'
                })
            } else {
                await cate.destroy();
            }
            resolve({
                errCode: 0,
                errMessage: 'Category is delete success'
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getAllCate: getAllCate,
    getCateByID: getCateByID,
    createCate: createCate,
    updateCate: updateCate,
    deleteCate: deleteCate,
}