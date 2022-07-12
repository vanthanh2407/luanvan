import db from "../models/index";

let getAllDetailOrder = (ProductID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = await db.Detail_Order.findAll({
                where: { id_order: ProductID },
                attributes: ['id_order', 'id_product', 'price', 'name', 'quantity', 'total', 'createdAt', 'updatedAt'],
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

let createDetailorder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            await db.Detail_Order.create({
                id_order: data.id_order,
                id_product: data.id_product,
                price: data.price,
                name: data.name,
                quantity: data.quantity,
                total: data.total,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
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

module.exports = {
    getAllDetailOrder:getAllDetailOrder,
    createDetailorder:createDetailorder,
}
