
import productService from "../../services/admin/productService";
import db from "../../models/index";

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
let PAGE_SIZE = 2;
// let handleGetPageProduct = async (req, res) => {
//     let page = req.query.pageInput;
//     if (page) {
//         page = parseInt(page);
//         let skipPageNumber = (page - 1) * PAGE_SIZE;
//         await db.Product.find({})
//             .skip(skipPageNumber)
//             .limit(PAGE_SIZE)
//             .then(data => {
//                 res.json(data)
//             })
//             .catch(e => {
//                 res.status(200).json('loi khong co input')
//             })
//     } else {
//         let product = await productService.getAllProduct();
//         return res.status(200).json({
//             errCode: 0,
//             message: 'Get All Product Succuess',
//             product
//         })
//     }
// }
let handleGetPageProduct = async (req, res) => {
    try {
        let size = Number.parseInt(req.query.size);
        let { page } = req.query;
        let findByID = await productService.getPage(page, size);

        return res.status(200).json(findByID);
    } catch (error) {

        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',

        })
    }
}

module.exports = {
    handleGetAllProduct: handleGetAllProduct,
    handleGetProcductByID: handleGetProcductByID,
    handleSearchProcduct: handleSearchProcduct,
    handleCreateProduct: handleCreateProduct,
    handleUpdateProduct: handleUpdateProduct,
    handleDeleteProduct: handleDeleteProduct,
    handleGetProcductByType: handleGetProcductByType,

    handleGetPageProduct: handleGetPageProduct
}