import db from "../models/index";
const mailer = require('../mailer')


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
            // let user = await db.Users.findOne({
            //     where: { id: data.id_user },
            //     raw: false
            // })
            // await sendMail(user.email)

            await db.Order.create({
                id: data.id,
                address: data.address,
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
let sendMail = (id_order) => {
    return new Promise(async (resolve, reject) => {
        try {
            let carts = await db.Detail_Order.findOne({
                where: { id_order: id_order }            
            })
            let order = await db.Order.findOne({
                where: { id: id_order},
                raw: false
            })
            let user = await db.Users.findOne({
                where: { id: order.id_user },
                raw: false
            })

            const htmlHead = '<table style="width:50%">' +
            '<tr style="border: 1px solid black;"><th style="border: 1px solid black;">Tên Sản Phẩm</th><th style="border: 1px solid black;">Giá</th><th style="border: 1px solid black;">Số Lượng</th><th style="border: 1px solid black;">Thành Tiền</th>'

            let htmlContent = ""
            for (let i = 0; i < carts.length; i++) {
                htmlContent += '<tr>' +
                    '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' + carts[i].name + '</td>' +
                    // '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;"><img src="' + carts[i].id_product.picture + '" width="80" height="80"></td>' +
                    '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' + carts[i].price + '$</td>' +
                    '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' + carts[i].quantity + '</td>' +
                    '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' + (parseInt(carts[i].price) * parseInt(carts[i].quantity)) + '$</td>' +
                    '<tr>'
            }
            const htmlResult = '<h1>Xin Chào ' + user.firstname + '</h1>' + '<h3>Phone: ' + user.phone + '</h3>' + '<h3>Address:' + user.address + '</h3>' +
            htmlHead + htmlContent + '<h1>Phí Vận Chuyển: ' + 30.000 + '$</h1></br>' + '<h1>Tổng Thanh Toán: ' + order.total + '$</h1></br>' + '<p>Cảm ơn bạn!</p>'

             // Thực hiện gửi email (to, subject, htmlContent)
            await mailer.sendMail(req.body.email, 'Hóa Đơn Đặt Hàng', htmlResult)
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
    // postOrder:postOrder,
    
}
