import db from "../models/index";




let getAllCoupon = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let coupon = await db.Coupon.findAll();
            resolve(coupon);
        } catch (error) {
            reject(error);
        }
    })
};

let createCoupon = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            await db.Coupon.create({
                name: data.name,
                cost: data.cost,
                describe: data.describe,
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

let updateCoupon = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Messing requited parameter"
                });
            }
            let coupon = await db.Coupon.findOne({
                where: { id: data.id },
                raw: false,
            });
            if (coupon) {
                coupon.name = data.name;

                coupon.cost = data.cost;
                coupon.describe = data.describe;
                coupon.quantity = data.quantity;
                await coupon.save();
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
let deleteCoupon = (CouponID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let coupon = await db.Coupon.findOne({
                where: { id: CouponID },
                raw: false
            })
            if (!coupon) {
                resolve({
                    errCode: 2,
                    errMessage: 'Coupon is not exist'
                })
            } else {
                await coupon.destroy();
            }
            resolve({
                errCode: 0,
                errMessage: 'Coupon is delete success'
            })
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    getAllCoupon: getAllCoupon,
    createCoupon: createCoupon,
    updateCoupon: updateCoupon,
    deleteCoupon: deleteCoupon,
}