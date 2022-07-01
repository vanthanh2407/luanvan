import db from "../models/index";




let getAllBanner = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let banner = await db.Banner.findAll();
            resolve(banner);
        } catch (error) {
            reject(error);
        }
    })
};

let createBanner = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            await db.Banner.create({
                picture: data.picture,
                id_product: data.id_product,

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

let updateBanner = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Messing requited parameter"
                });
            }
            let banner = await db.Banner.findOne({
                where: { id: data.id },
                raw: false,
            });
            if (banner) {
                banner.picture = data.picture;
                banner.id_product = data.id_product;

                await banner.save();
                resolve({
                    errCode: 0,
                    errMessage: "Update Banner Success!"
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "Banner is not found!"
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}
let deleteBanner = (BannerID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let banner = await db.Banner.findOne({
                where: { id: BannerID },
                raw: false
            })
            if (!banner) {
                resolve({
                    errCode: 2,
                    errMessage: 'Banner is not exist'
                })
            } else {
                await banner.destroy();
            }
            resolve({
                errCode: 0,
                errMessage: 'Banner is delete success'
            })
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    getAllBanner: getAllBanner,
    createBanner: createBanner,
    updateBanner: updateBanner,
    deleteBanner: deleteBanner,
}