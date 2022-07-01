import commentService from "../services/commentService";





let handleGetAllComment = async (req, res) => {
    let comment = await commentService.getAllComment();
    return res.status(200).json({
        errCode: 0,
        message: 'Get All Comment Succuess',
        comment
    })
}
//////////////
let handleCreateComment = async (req, res) => {
    let message = await commentService.createComment(req.body);
    return res.status(200).json(message);
}
let handleUpdateComment = async (req, res) => {
    let data = req.body;
    let message = await commentService.updateComment(data);
    return res.status(200).json(message);
}
let handleDeleteComment = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    } else {
        let message = await commentService.deleteComment(req.body.id);
        return res.status(200).json(message);
    }

}


module.exports = {
    handleGetAllComment: handleGetAllComment,

    ///////////////////////////
    handleCreateComment: handleCreateComment,
    handleUpdateComment: handleUpdateComment,
    handleDeleteComment: handleDeleteComment,
}