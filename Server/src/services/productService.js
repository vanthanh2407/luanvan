import { use } from "express/lib/application";
import Sequelize from "sequelize";
import db, { sequelize } from "../models/index";

let getAllProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = await db.Product.findAll();
            resolve(products);
        } catch (error) {
            reject(error);
        }
    })
}
let getProductByID = (ProductID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = await db.Product.findOne({
                where: { id: ProductID },
                raw: false
            })
            if (!product) {
                resolve({
                    errCode: 2,
                    errMessage: 'The product is not exist'
                })
            }
            resolve(product);
        } catch (error) {
            reject(error);
        }
    })
}
//full text search product
let SearchProduct = (key) => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = await db.Product.findAll({
                where: Sequelize.literal(`MATCH (name, ram, chip, memory,display,color,content) AGAINST(` + `'` + key + `'` + `)`),

            });
            resolve(products);
        } catch (error) {
            // reject(error);
            console.log(error);
        }
    })
}
let createProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Product.create({
                name: data.name,
                price: data.price,
                quantity: data.quantity,
                picture: data.picture,
                content: data.content,
                summary: data.summary,
                ram: data.ram,
                chip: data.chip,
                card: data.card,
                display: data.display,
                memory: data.memory,
                port: data.port,
                operation: data.operation,
                pin: data.pin,
                dpi: data.dpi,
                micro_switch: data.micro_switch,
                scroll_switch: data.scroll_switch,
                durability: data.durability,
                keyboard_type: data.keyboard_type,
                model: data.model,
                connect: data.connect,
                weight: data.weight,
                size: data.size,
                color: data.color,
                material: data.material,
                insurance: data.insurance,
                status: data.status,
                id_cate: data.id_cate,
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
let updateProduct = (data) => {
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
                product.name = data.name,
                    product.price = data.price,
                    product.quantity = data.quantity,
                    product.picture = data.picture,
                    product.content = data.content,
                    product.summary = data.summary,
                    product.ram = data.ram,
                    product.chip = data.chip,
                    product.card = data.card,
                    product.display = data.display,
                    product.memory = data.memory,
                    product.port = data.port,
                    product.operation = data.operation,
                    product.pin = data.pin,
                    product.dpi = data.dpi,
                    product.micro_switch = data.micro_switch,
                    product.scroll_switch = data.scroll_switch,
                    product.durability = data.durability,
                    product.keyboard_type = data.keyboard_type,
                    product.model = data.model,
                    product.connect = data.connect,
                    product.weight = data.weight,
                    product.size = data.size,
                    product.color = data.color,
                    product.material = data.material,
                    product.insurance = data.insurance,
                    product.status = data.status,
                    product.id_cate = data.id_cate,

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
let deleteProduct = (ProductID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = await db.Product.findOne({
                where: { id: ProductID },
                raw: false
            })
            if (!product) {
                resolve({
                    errCode: 2,
                    errMessage: 'Product is not exist'
                })
            } else {
                await product.destroy();
            }
            resolve({
                errCode: 0,
                errMessage: 'Product is delete success'
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getAllProduct: getAllProduct,
    getProductByID: getProductByID,
    SearchProduct: SearchProduct,
    createProduct: createProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
}