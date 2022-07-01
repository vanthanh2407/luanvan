import db from "../models/index";
import categoryService from "../services/categoryService";

let handleGetAllCate = async (req, res) => {
    let user = await categoryService.getAllCate();
    return res.status(200).json({
        errCode: 0,
        message: 'Get All Category Succuess',
        user
    })
}
let handleGetCateByID = async (req, res) => {
    let findByID = await categoryService.getCateByID(req.params.id);
    return res.status(200).json(findByID);
}
let handleCreateCate = async (req, res) => {
    let message = await categoryService.createCate(req.body);
    return res.status(200).json(message);
}
let handleUpdateCate = async (req, res) => {
    let data = req.body;
    let message = await categoryService.updateCate(data);
    return res.status(200).json(message);
}
let handleDeleteCate = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    } else {
        let message = await categoryService.deleteCate(req.body.id);
        return res.status(200).json(message);
    }

}
module.exports = {
    handleGetAllCate: handleGetAllCate,
    handleGetCateByID:handleGetCateByID,
    handleCreateCate: handleCreateCate,
    handleUpdateCate:handleUpdateCate,
    handleDeleteCate:handleDeleteCate,
}