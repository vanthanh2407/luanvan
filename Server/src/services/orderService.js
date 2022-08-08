import db from "../models/index";
const mailer = require('../mailer')
import sendMailService from "../services/sendMailService"

let getOrder = (ProductID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = await db.Order.findAll({
                where: { id_user: ProductID},
                raw: false
            })
            if (!product) {
                resolve({
                    errCode: 2,
                    errMessage: 'The order is not exist'
                })
            }
            resolve(product);
        } catch (error) {
            reject(error);
        }
    })
}
let getOrderByID = (ProductID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = await db.Order.findOne({
                where: { id: ProductID },
                raw: false
            })
            if (!product) {
                resolve({
                    errCode: 2,
                    errMessage: 'The order is not exist'
                })
            }
            resolve(product);
        } catch (error) {
            reject(error);
        }
    })
}

let createOder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            await db.Order.create({
                id: data.id,
                name: data.name,
                address: data.address,
                phone: data.phone,
                paymethod: data.paymethod,
                note: data.note,
                total: data.total,
                id_payment: data.id_payment,
                id_coupon: data.id_coupon,
                id_user: data.id_user,
                id_status: data.id_status,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            })
            
            let product = await db.Order.findOne({
                order: [
                    ['id', 'DESC'],
                ],
                raw: false
            })
            resolve({
                errCode: 0,
                errMessage: 'OK',
                product
            })
        } catch (e) {
            reject(e)
        }
    })
}
let updateOrderData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Oder = await db.Order.findOne({
                where: { id: data}
            })
            if (Oder) {
                // if (data.id_status == 6) {
                    if (Oder.id_status < 2) {
                        Oder.id_status = 6
                        await Oder.save();
                        let detailOrder = await db.Detail_Order.findAll({
                            where: { id_order: Oder.id },
                            raw: false,
                        });
                        if(detailOrder){
                            for(let i = 0; i < detailOrder.length; i++){
                                let product = await db.Product.findOne({
                                    where: { id: detailOrder[i].id_product },
                                    raw: false,
                                });
                                if (product) {
                                        product.quantity = product.quantity + detailOrder[i].quantity,
                    
                                        await product.save();
                                    resolve({
                                        errCode: 0,
                                        errMessage: "Update Product Success!"
                                    })
                                } else {
                                    resolve({
                                        errCode: 1,
                                        errMessage: "Product is not found!"
                                    });
                                }
                            }
                        }
                        
                        resolve({
                            errCode: 3,
                            message: "Huỷ đơn thành công"
                        });}
                    } else {
                        resolve({
                            errCode: 5,
                            message: "Đơn hàng không thể hủy!"
                        });
                    }
                // } else {
                //     if (Oder.id_status > data.id_status) {
                //         resolve({
                //             errCode: 11,
                //             message: "Không thể cập nhật lại trạng thái trước đó"

                //         });
                //     }
                //     else {
                //         if (data.id_status == Oder.id_status + 1) {
                //             Oder.id_status = data.id_status
                //             await Oder.save();
                //             resolve({
                //                 errCode: 0,
                //                 message: "Update thành công"
                //             });
                //         } else {
                //             resolve({
                //                 errCode: 4,
                //                 message: "Update status failed"
                //             });
                //         }
                //     }
                // }
            // } else {
            //     resolve({
            //         errCode: 20,
            //         message: "Sai Oder"
            //     });
            // }
        } catch (e) {
            reject(e);
        }

    })
}
let sendMail = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const htmlHead = "hello"
            const htmlResult = "hello"
            await mailer.sendMail('vanthanh9512@gmail.com', 'Hóa Đơn Đặt Hàng', htmlResult)
            res.send("Gui Email Thanh Cong")
        }catch(e){
            reject(e);
        }
    })
}


module.exports = {
    getOrder:getOrder,
    createOder:createOder,
    updateOrderData:updateOrderData,
    getOrderByID:getOrderByID,
    sendMail:sendMail,
    
}
