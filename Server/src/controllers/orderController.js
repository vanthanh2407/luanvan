import db from "../models/index";
import orderService from "../services/orderService";


let handleGetOrderByID = async (req, res) => {
    let data = await orderService.getOrder(req.params.id);
    return res.status(200).json(data);
}
let handleCreateOrder = async (req, res) => {
    let message = await orderService.createOder(req.body);
    return res.status(200).json(message);
}
module.exports = {
    handleGetOrderByID:handleGetOrderByID,
    handleCreateOrder:handleCreateOrder,
}