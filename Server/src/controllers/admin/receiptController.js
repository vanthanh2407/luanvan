import receiptService from "../../services/admin/receiptService";





let handleGetAllReceipt = async (req, res) => {
    let receipt = await receiptService.getAllReceipt();
    return res.status(200).json({
        errCode: 0,
        message: 'Get All Supplier Succuess',
        receipt
    })
}
let handleGetReceiptByID = async (req, res) => {
    let findByID = await receiptService.getReceiptByID(req.params.id);
    return res.status(200).json(findByID);
}
//////////////
let handleCreateReceipt = async (req, res) => {
    let message = await receiptService.createReceipt(req.body);
    return res.status(200).json(message);
}
let handleUpdateReceipt = async (req, res) => {
    let data = req.body;
    let message = await receiptService.updateReceipt(data);
    return res.status(200).json(message);
}
let handleDeleteReceipt = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    } else {
        let message = await receiptService.deleteReceipt(req.body.id);
        return res.status(200).json(message);
    }

}


module.exports = {
    handleGetAllReceipt: handleGetAllReceipt,
    handleGetReceiptByID: handleGetReceiptByID,
    ///////////////////////////
    handleCreateReceipt: handleCreateReceipt,
    handleUpdateReceipt: handleUpdateReceipt,
    handleDeleteReceipt: handleDeleteReceipt,
}