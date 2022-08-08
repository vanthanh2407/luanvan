import db from "../models/index";
import orderService from "../services/orderService";
import sendMailService from "../services/sendMailService";


let handleGetOrderByID = async (req, res) => {
    let data = await orderService.getOrder(req.params.id_user);
    return res.status(200).json(data);
}
let handleGetOrder = async (req, res) => {
    let data = await orderService.getOrderByID(req.params.id);
    return res.status(200).json(data);
}
let handleCreateOrder = async (req, res) => {
    let message = await orderService.createOder(req.body);
    return res.status(200).json(message);
}
let handleUpdateOrder = async (req, res) => {
    let data = req.params;
    let message = await orderService.updateOrderData(data.id);
    return res.status(200).json(message);
}
let handleSendMail = async (req, res) => {
    let message = await sendMailService.sendEmail(req.body);
    return res.status(200).json(message);
}

module.exports = {
    handleGetOrderByID:handleGetOrderByID,
    handleCreateOrder:handleCreateOrder,
    handleUpdateOrder:handleUpdateOrder,
    handleGetOrder:handleGetOrder,
    handleSendMail:handleSendMail
}