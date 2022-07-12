import db from "../models/index";

let getOrder = (ProductID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = await db.Order.findAll({
                where: { id: ProductID },
                // attributes: ['id_order', 'id_product', 'price', 'name', 'quantity', 'total', 'createdAt', 'updatedAt'],
                raw: false
            })
            if (!product) {
                resolve({
                    errCode: 2,
                    errMessage: 'The order is not exist'
                })
            }
            resolve(product);
        } catch (error) {
            reject(error);
        }
    })
}

// let postOrder = (data) => {
//     return new Promise(async (resolve, reject) => {
//         try {

//             await db.Order.create({
//                 id: data.id,
//                 address: data.address,
//                 paymethod: data.paymethod,
//                 note: data.note,
//                 id_payment: data.id_payment,
//                 id_coupon: data.id_coupon,
//                 id_user: data.id_user,
//                 id_status: data.id_status,
//                 createdAt: data.createdAt,
//                 updatedAt: data.updatedAt,
//             })

//             resolve({
//                 errCode: 0,
//                 errMessage: 'OK'
//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// }

let createOder=async(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
           // console.log(data.cart)
            let odercus=data.cart;
            //console.log(odercus[0])

                   let Order= await db.Oder.create({
                        
                    address: data.address,
                    paymethod: data.paymethod,
                    note: data.note,
                    id_payment: data.id_payment,
                    id_coupon: data.id_coupon,
                    id_user: data.id_user,
                    id_status: data.id_status,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                    })
                    {odercus&&odercus.map(async(item,index)=>{
                      console.log(item.quatity*item.product.price)
                       await db.Detailoder.create({
                        id_order: Order.id_order,
                        id_product: data.id_product,
                        price: item.product.price,
                        name: item.product.name,
                        quantity: item.quantity,
                        total: item.quantity*item.product.price,
                        createdAt: data.createdAt,
                        updatedAt: data.updatedAt,
                        }) 
                    }
                        )}
                
                        resolve(
                            {
                                errCode:0,
                                message:"Create Thành Công",
                                data:data
                        })
                    }
                   
                
        catch (e) {
            reject(e);
        } })
}


module.exports = {
    getOrder:getOrder,
    createOder:createOder,
    // postOrder:postOrder,
    
}
