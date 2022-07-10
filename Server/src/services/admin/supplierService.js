import db from "../../models/index";



let getAllSupplier = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let supplier = await db.Supplier.findAll();
            resolve(supplier);
        } catch (error) {
            reject(error);
        }
    })
};

let createSupplier = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            await db.Supplier.create({
                name: data.name,
                picture: data.picture,
                phone: data.phone,
                address: data.address,
                email: data.email,
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

let updateSupplier = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Messing requited parameter"
                });
            }
            let supplier = await db.Supplier.findOne({
                where: { id: data.id },
                raw: false,
            });
            if (supplier) {
                supplier.name = data.name;
                supplier.picture = data.picture;
                supplier.phone = data.phone;
                supplier.address = data.address;
                supplier.email = data.email;
                await supplier.save();
                resolve({
                    errCode: 0,
                    errMessage: "Update Coupon Success!"
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "Coupon is not found!"
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}
let deleteSupplier = (SupplierID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let supplier = await db.Supplier.findOne({
                where: { id: SupplierID },
                raw: false
            })
            if (!supplier) {
                resolve({
                    errCode: 2,
                    errMessage: 'Supplier is not exist'
                })
            } else {
                await supplier.destroy();
            }
            resolve({
                errCode: 0,
                errMessage: 'Supplier is delete success'
            })
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    getAllSupplier: getAllSupplier,
    createSupplier: createSupplier,
    updateSupplier: updateSupplier,
    deleteSupplier: deleteSupplier,
}