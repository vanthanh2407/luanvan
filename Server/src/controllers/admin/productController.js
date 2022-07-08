
import productService from "../../services/admin/productService";

let handleGetAllProduct = async (req, res) => {
    let product = await productService.getAllProduct();
    return res.status(200).json({
        errCode: 0,
        message: 'Get All Product Succuess',
        product
    })
}
let handleGetProcductByID = async (req, res) => {
    let findByID = await productService.getProductByID(req.body.id);
    return res.status(200).json(findByID);
}

let handleGetProcductByType = async (req, res) => {
    try {
        let findByID = await productService.getProductByType(req.query.type);
        return res.status(200).json(findByID);
    } catch (error) {
        console.log('Get all Product', error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }

}
let handleSearchProcduct = async (req, res) => {
    let findByID = await productService.SearchProduct(req.body.key);
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

module.exports = {
    handleGetAllProduct: handleGetAllProduct,
    handleGetProcductByID: handleGetProcductByID,
    handleSearchProcduct: handleSearchProcduct,
    handleCreateProduct: handleCreateProduct,
    handleUpdateProduct: handleUpdateProduct,
    handleDeleteProduct: handleDeleteProduct,
    handleGetProcductByType: handleGetProcductByType
}