import db from "../../models/index";



let getAllDetailOrder = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = await db.Order.findAll();
            resolve(order);
        } catch (error) {
            reject(error);
        }
    })
};

let createDetailOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            await db.Order.create({
                address: data.address,
                paymethod: data.paymethod,
                note: data.note,
                total: data.total,
                id_status: data.id_status,
                id_payment: data.id_payment,
                id_coupon: data.id_coupon,
                id_user: data.id_user, // address paymethod  note total id_product id_payment id_coupon id_user
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

let updateDetailOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Messing requited parameter"
                });
            }
            let order = await db.Order.findOne({
                where: { id: data.id },
                raw: false,
            });
            if (order) {
                order.address = data.address; // address paymethod  note total id_product id_payment id_coupon id_user
                order.paymethod = data.paymethod;
                order.note = data.note;
                order.total = data.total;
                order.id_payment = data.id_payment;
                order.id_status = data.id_status;
                order.id_user = data.id_user;
                order.id_coupon = data.id_coupon;
                await order.save();
                resolve({
                    errCode: 0,
                    errMessage: "Update Order Success!"
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "Order is not found!"
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}
/// chi moi get comment
let deleteDetailOrder = (DetailOrderID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = await db.Order.findOne({
                where: { id: DetailOrderID },
                raw: false
            })
            if (!order) {
                resolve({
                    errCode: 2,
                    errMessage: 'Order is not exist'
                })
            } else {
                await order.destroy();
            }
            resolve({
                errCode: 0,
                errMessage: 'Order is delete success'
            })
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    getAllDetailOrder: getAllDetailOrder,
    createDetailOrder: createDetailOrder,
    updateDetailOrder: updateDetailOrder,
    deleteDetailOrder: deleteDetailOrder,
}