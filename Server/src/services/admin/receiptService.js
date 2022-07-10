// import db from "../models/index";
import db from "../../models/index";




let getAllReceipt = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let receipt = await db.Receipt.findAll();
            resolve(receipt);
        } catch (error) {
            reject(error);
        }
    })
};
let getReceiptByID = (ReceiptID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let receipt = await db.Receipt.findOne({
                where: { id: ReceiptID },
                raw: false
            })
            if (!receipt) {
                resolve({
                    errCode: 2,
                    errMessage: 'The Receipt is not exist'
                })
            }
            resolve(receipt);
        } catch (error) {
            reject(error);
        }
    })
}

let createReceipt = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            await db.Receipt.create({
                name_product: data.name_product,
                date_import: data.date_import,
                price: data.price,
                id_supplier: data.id_supplier,
                quantity: data.quantity,
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

let updateReceipt = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Messing requited parameter"
                });
            }
            let receipt = await db.Receipt.findOne({
                where: { id: data.id },
                raw: false,
            });
            if (receipt) {
                receipt.name_product = data.name_product;
                receipt.date_import = data.date_import;
                receipt.price = data.price;
                receipt.id_supplier = data.id_supplier;
                receipt.quantity = data.quantity;
                await receipt.save();
                resolve({
                    errCode: 0,
                    errMessage: "Receipt Coupon Success!"
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "Receipt is not found!"
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}
let deleteReceipt = (receiptID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let receipt = await db.Receipt.findOne({
                where: { id: receiptID },
                raw: false
            })
            if (!receipt) {
                resolve({
                    errCode: 2,
                    errMessage: 'Receipt is not exist'
                })
            } else {
                await receipt.destroy();
            }
            resolve({
                errCode: 0,
                errMessage: 'Receipt is delete success'
            })
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    getAllReceipt: getAllReceipt,
    createReceipt: createReceipt,
    updateReceipt: updateReceipt,
    deleteReceipt: deleteReceipt,
    getReceiptByID: getReceiptByID
}