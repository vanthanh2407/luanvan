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
let updateCountProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Messing requited parameter"
                });
            }
            let product = await db.Product.findOne({
                where: { id: data.id },
                raw: false,
            });
            if (product) {
                    product.quantity = data.quantity - Detail_Order.quantity,

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
            let product = await db.Product.findOne({
                where: { id: data.id_product },
                raw: false,
            });
            if (product) {
                    product.quantity = product.quantity - data.quantity,

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

            resolve({
                errCode: 0,
                errMessage: 'OK',
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getAllDetailOrder:getAllDetailOrder,
    createDetailorder:createDetailorder,
    updateCountProduct:updateCountProduct
}
