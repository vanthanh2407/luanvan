import db from "../../models/index";



let getAllNews = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let news = await db.News.findAll();
            resolve(news);
        } catch (error) {
            reject(error);
        }
    })
};

let createNews = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            await db.News.create({
                name: data.name,
                date: data.date,
                content: data.content,
                picture: data.picture,
                id_user: data.id_user,
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

let updateNews = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Messing requited parameter"
                });
            }
            let news = await db.News.findOne({
                where: { id: data.id },
                raw: false,
            });
            if (news) {
                news.name = data.name;
                news.date = data.date;
                news.content = data.content;
                news.picture = data.picture;
                news.id_user = data.id_user;
                await news.save();
                resolve({
                    errCode: 0,
                    errMessage: "Update News Success!"
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "News is not found!"
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}
let deleteNews = (NewsID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let news = await db.News.findOne({
                where: { id: NewsID },
                raw: false
            })
            if (!news) {
                resolve({
                    errCode: 2,
                    errMessage: 'News is not exist'
                })
            } else {
                await news.destroy();
            }
            resolve({
                errCode: 0,
                errMessage: 'News is delete success'
            })
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    getAllNews: getAllNews,
    createNews: createNews,
    updateNews: updateNews,
    deleteNews: deleteNews,
}