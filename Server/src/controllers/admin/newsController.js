import newsService from "../../services/admin/newsService";





let handleGetAllNews = async (req, res) => {
    let news = await newsService.getAllNews();
    return res.status(200).json({
        errCode: 0,
        message: 'Get All News Succuess',
        news
    })
}
//////////////
let handleCreateNews = async (req, res) => {
    let message = await newsService.createNews(req.body);
    return res.status(200).json(message);
}
let handleUpdateNews = async (req, res) => {
    let data = req.body;
    let message = await newsService.updateNews(data);
    return res.status(200).json(message);
}
let handleDeleteNews = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    } else {
        let message = await newsService.deleteNews(req.body.id);
        return res.status(200).json(message);
    }

}


module.exports = {
    handleGetAllNews: handleGetAllNews,

    ///////////////////////////
    handleCreateNews: handleCreateNews,
    handleUpdateNews: handleUpdateNews,
    handleDeleteNews: handleDeleteNews,
}