import couponService from "../services/couponService";





let handleGetAllCoupon = async (req, res) => {
    let user = await couponService.getAllCoupon();
    return res.status(200).json({
        errCode: 0,
        message: 'Get All Coupon Succuess',
        user
    })
}
let handleGetCoupon = async (req, res) => {
    let message = await couponService.getCouponByID(req.params.name);
    return res.status(200).json(message);
}
let handleCreateCoupon = async (req, res) => {
    let message = await couponService.createCoupon(req.body);
    return res.status(200).json(message);
}
let handleUpdateCoupon = async (req, res) => {
    let data = req.body;
    let message = await couponService.updateCoupon(data);
    return res.status(200).json(message);
}
let handleDeleteCoupon = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    } else {
        let message = await couponService.deleteCoupon(req.body.id);
        return res.status(200).json(message);
    }

}
let handleCheckCoupon = async (req, res) => {
    let message = await couponService.checkCoupon(req.query);
    return res.status(200).json(message);
}

module.exports = {
    handleGetAllCoupon: handleGetAllCoupon,
    handleCreateCoupon: handleCreateCoupon,
    handleUpdateCoupon: handleUpdateCoupon,
    handleDeleteCoupon: handleDeleteCoupon,
    handleCheckCoupon:handleCheckCoupon,
    handleGetCoupon:handleGetCoupon,
}