import db from "../../models/index";



let getAllOrder = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = await db.Order.findAll();
            resolve(order);
        } catch (error) {
            reject(error);
        }
    })
};

let createOrder = (data) => {
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

let updateOrder = (data) => {
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
let updateOderData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            let Oder = await db.Order.findOne({
                where: { id: data.id }
            })
            if (Oder) {
                if (data.id_status == 6) {
                    if (Oder.id_status < 2) {
                        Oder.id_status = data.id_status
                        await Oder.save();
                        resolve({
                            errCode: 3,
                            message: "Huỷ đơn thành công"
                        });
                    } else {
                        resolve({
                            errCode: 5,
                            message: "Đơn hàng không thể hủy!"
                        });
                    }
                } else {
                    if (Oder.id_status > data.id_status) {
                        resolve({
                            errCode: 11,
                            message: "Không thể cập nhật lại trạng thái trước đó"

                        });
                    }
                    else {
                        if (data.id_status == Oder.id_status + 1) {
                            Oder.id_status = data.id_status
                            await Oder.save();
                            resolve({
                                errCode: 0,
                                message: "Update thành công"
                            });
                        } else {
                            resolve({
                                errCode: 4,
                                message: "Update status failed"
                            });
                        }
                    }
                }
            } else {
                resolve({
                    errCode: 20,
                    message: "Sai Oder"
                });
            }
        } catch (e) {
            reject(e);
        }

    })
}
/// chi moi get comment
let deleteOrder = (OrderID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = await db.Order.findOne({
                where: { id: OrderID },
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
    getAllOrder: getAllOrder,
    createOrder: createOrder,
    updateOrder: updateOrder,
    deleteOrder: deleteOrder,
    updateOderData: updateOderData
}