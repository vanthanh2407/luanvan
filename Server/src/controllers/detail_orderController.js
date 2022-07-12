import db from "../models/index";
import detail_orderService from "../services/detail_orderService";

let handleGetDetailOrderByID = async (req, res) => {
    let data = await detail_orderService.getAllDetailOrder(req.params.id_order);
    return res.status(200).json(data);
}
let handleCreateDetailOrder = async (req, res) => {
    let message = await detail_orderService.createDetailorder(req.body);
    return res.status(200).json(message);
}
module.exports = {
    handleGetDetailOrderByID:handleGetDetailOrderByID,
    handleCreateDetailOrder:handleCreateDetailOrder,
}