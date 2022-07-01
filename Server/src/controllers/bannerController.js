import bannerService from "../services/bannerService";





let handleGetAllBanner = async (req, res) => {
    let banner = await bannerService.getAllBanner();
    return res.status(200).json({
        errCode: 0,
        message: 'Get All Banner Succuess',
        banner
    })
}
let handleCreateBanner = async (req, res) => {
    let message = await bannerService.createBanner(req.body);
    return res.status(200).json(message);
}
let handleUpdateBanner = async (req, res) => {
    let data = req.body;
    let message = await bannerService.updateBanner(data);
    return res.status(200).json(message);
}
let handleDeleteBanner = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    } else {
        let message = await bannerService.deleteBanner(req.body.id);
        return res.status(200).json(message);
    }

}


module.exports = {
    handleGetAllBanner: handleGetAllBanner,
    handleCreateBanner: handleCreateBanner,
    handleUpdateBanner: handleUpdateBanner,
    handleDeleteBanner: handleDeleteBanner,
}