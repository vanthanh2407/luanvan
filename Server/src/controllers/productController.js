import db from "../models/index";
import productService from "../services/productService";

let handleGetAllProduct = async (req, res) => {
    let data = await productService.getAllProduct();
    return res.status(200).json(data)
}
let handleGetProcductByID = async (req, res) => {
    let data = await productService.getProductByID(req.params.id);
    return res.status(200).json(data);
}
let handleSearchProcduct = async (req, res) => {

    let findByID = await productService.SearchProduct(req.query.key);
    // console.log('check ben controller: ', findByID.products)
    return res.status(200).json(findByID);
}
let handleCreateProduct = async (req, res) => {
    let message = await productService.createProduct(req.body);
    return res.status(200).json(message);
}
let handleUpdateProduct = async (req, res) => {
    let data = req.body;
    let message = await productService.updateProduct(data);
    return res.status(200).json(message);
}
let handleDeleteProduct = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    } else {
        let message = await productService.deleteProduct(req.body.id);
        return res.status(200).json(message);
    }

}
let handleGetProcductByCate = async (req, res) => {
    let data = await productService.getProductByCate(req.params.id_cate);
    return res.status(200).json(data);
}

module.exports = {
    handleGetAllProduct: handleGetAllProduct,
    handleGetProcductByID: handleGetProcductByID,
    handleSearchProcduct: handleSearchProcduct,
    handleCreateProduct: handleCreateProduct,
    handleUpdateProduct: handleUpdateProduct,
    handleDeleteProduct: handleDeleteProduct,
    handleGetProcductByCate:handleGetProcductByCate,
}