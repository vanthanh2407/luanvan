
import statusService from "../../services/admin/statusService";

let handleGetAllStatus = async (req, res) => {
    let status = await statusService.getAllStatus();
    return res.status(200).json({
        errCode: 0,
        message: 'Get All Status Succuess',
        status
    })
}
module.exports = {
    handleGetAllStatus: handleGetAllStatus,
}