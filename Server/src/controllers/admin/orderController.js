import orderService from "../../services/admin/oderService";





let handleGetAllOrder = async (req, res) => {
    let order = await orderService.getAllOrder();
    return res.status(200).json({
        errCode: 0,
        message: 'Get All Order Succuess',
        order
    })
}
//////////////
let handleCreateOrder = async (req, res) => {
    let message = await orderService.createOrder(req.body);
    return res.status(200).json(message);
}
let handleUpdateOrder = async (req, res) => {
    let data = req.body;
    let message = await orderService.updateOrder(data);
    return res.status(200).json(message);
}
let handleDeleteOrder = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    } else {
        let message = await orderService.deleteOrder(req.body.id);
        return res.status(200).json(message);
    }

}
let handleUpdateOrderStatus = async (req, res) => {
    let data = req.body;
    let message = await orderService.updateOderData(data);
    return res.status(200).json(message);
}



module.exports = {
    handleGetAllOrder: handleGetAllOrder,

    ///////////////////////////
    handleCreateOrder: handleCreateOrder,
    handleUpdateOrder: handleUpdateOrder,
    handleDeleteOrder: handleDeleteOrder,
    handleUpdateOrderStatus: handleUpdateOrderStatus,
}