import req from "express/lib/request";
import permissService from "../services/permissionService";

let handleGetAllPermiss = async (req, res) => {
    let permiss = await permissService.getAllPermission();
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Get All Permission Success',
        permiss
    })
}
let handleGetPermissByID = async (req, res) => {
    let findByID = await permissService.getPermissByID(req.params.id);
    return res.status(200).json(findByID);
}
let handleCreateNewPermiss = async (req, res) => {
    let message = await permissService.createNewPermiss(req.body);
    return res.status(200).json(message);
}
let handleDeletePermiss = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    } else {
        let message = await permissService.deletePermiss(req.body.id);
        return res.status(200).json(message);
    }
}
let handleUpdatePermiss = async (req, res) => {
    let data = req.body;
    let message = await permissService.updatePermiss(data);
    return res.status(200).json(message);
}

module.exports = {
    handleGetAllPermiss: handleGetAllPermiss,
    handleGetPermissByID: handleGetPermissByID,
    handleCreateNewPermiss: handleCreateNewPermiss,
    handleDeletePermiss: handleDeletePermiss,
    handleUpdatePermiss: handleUpdatePermiss,


}