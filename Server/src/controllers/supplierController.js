import supplierService from "../services/supplierService";





let handleGetAllSupplier = async (req, res) => {
    let supplier = await supplierService.getAllSupplier();
    return res.status(200).json({
        errCode: 0,
        message: 'Get All Supplier Succuess',
        supplier
    })
}
//////////////
let handleCreateSupplier = async (req, res) => {
    let message = await supplierService.createSupplier(req.body);
    return res.status(200).json(message);
}
let handleUpdateSupplier = async (req, res) => {
    let data = req.body;
    let message = await supplierService.updateSupplier(data);
    return res.status(200).json(message);
}
let handleDeleteSupplier = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    } else {
        let message = await supplierService.deleteSupplier(req.body.id);
        return res.status(200).json(message);
    }

}


module.exports = {
    handleGetAllSupplier: handleGetAllSupplier,

    ///////////////////////////
    handleCreateSupplier: handleCreateSupplier,
    handleUpdateSupplier: handleUpdateSupplier,
    handleDeleteSupplier: handleDeleteSupplier,
}