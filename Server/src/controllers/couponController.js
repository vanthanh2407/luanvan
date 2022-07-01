import couPonService from "../services/couponService";





let handleGetAllCoupon = async (req, res) => {
    let user = await couPonService.getAllCoupon();
    return res.status(200).json({
        errCode: 0,
        message: 'Get All Coupon Succuess',
        user
    })
}
let handleCreateCoupon = async (req, res) => {
    let message = await couPonService.createCoupon(req.body);
    return res.status(200).json(message);
}
let handleUpdateCoupon = async (req, res) => {
    let data = req.body;
    let message = await couPonService.updateCoupon(data);
    return res.status(200).json(message);
}
let handleDeleteCoupon = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    } else {
        let message = await couPonService.deleteCoupon(req.body.id);
        return res.status(200).json(message);
    }

}


module.exports = {
    handleGetAllCoupon: handleGetAllCoupon,
    handleCreateCoupon: handleCreateCoupon,
    handleUpdateCoupon: handleUpdateCoupon,
    handleDeleteCoupon: handleDeleteCoupon,
}