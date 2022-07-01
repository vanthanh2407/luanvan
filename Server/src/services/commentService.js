import db from "../models/index";




let getAllComment = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let comment = await db.Comment.findAll();
            resolve(comment);
        } catch (error) {
            reject(error);
        }
    })
};

let createComment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            await db.Comment.create({
                content: data.content,

                star: data.star,
                status: data.status,
                id_product: data.id_product,
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

let updateComment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Messing requited parameter"
                });
            }
            let comment = await db.Comment.findOne({
                where: { id: data.id },
                raw: false,
            });
            if (comment) {
                comment.content = data.content;
                comment.star = data.star;

                comment.status = data.status;
                comment.id_product = data.id_product;
                comment.id_user = data.id_user;
                await comment.save();
                resolve({
                    errCode: 0,
                    errMessage: "Update Comment Success!"
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "Comment is not found!"
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}
/// chi moi get comment
let deleteComment = (CommentID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let comment = await db.Comment.findOne({
                where: { id: CommentID },
                raw: false
            })
            if (!comment) {
                resolve({
                    errCode: 2,
                    errMessage: 'Comment is not exist'
                })
            } else {
                await comment.destroy();
            }
            resolve({
                errCode: 0,
                errMessage: 'Comment is delete success'
            })
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    getAllComment: getAllComment,
    createComment: createComment,
    updateComment: updateComment,
    deleteComment: deleteComment,
}