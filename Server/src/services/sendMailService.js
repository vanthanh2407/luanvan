require('dotenv').config();
import db from "../models/index";
import nodemailer from 'nodemailer'

let htmlresult = async () => {

    const order = await db.Order.findOne({ 
      // where: { id_order: req.body.id_order},
      order: [
        ['id', 'DESC'],
      ],
      raw: false
    })
    const carts = await db.Detail_Order.findAll({ 
      where: { id_order: order.id},
      raw: false
    })
    const coupon = await db.Coupon.findOne({
      where: {id: order.id_coupon}
    })
    let checkCoup = () =>{
      if(coupon){
        return ((order.total-30000) * 100 / (100 - coupon.cost)) - order.total + 30000;
      }else{
        return 0;
      }
    }
    const htmlHead = '<table style="width:50%; border-collapse: collapse;">' +
        '<tr style="border: 1px solid black; border-collapse: collapse;"><th style="border: 1px solid black;">Tên Sản Phẩm</th><th style="border: 1px solid black;">Giá</th><th style="border: 1px solid black;">Số Lượng</th><th style="border: 1px solid black;">Thành Tiền</th>'


    let htmlContent = ""
    for (let i = 0; i < carts.length; i++) {
        htmlContent += '<tr>' +
            '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' + carts[i].name + '</td>' +
            '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' + new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(carts[i].price) + ' VNĐ' + '</td>' +
            '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' + carts[i].quantity + '</td>' +
            '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' + new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(parseInt(carts[i].price) * parseInt(carts[i].quantity)) + ' VNĐ' + '</td>' +
            '<tr>'
    }
    return(
      '<h1>Xin Chào ' + order.name + '</h1>' + '<h3>Phone: ' + order.phone + '</h3>' + '<h3>Address: ' + order.address + '</h3>' + '<h3>Note: ' + order.note + '</h3>' +
      htmlHead + htmlContent + '<h3>Fee Ship: ' + new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(30000) + ' VNĐ' + '</h3>' 
      +'<h3>Discount: ' + new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(await checkCoup() ) + ' VNĐ' + '</h3>' 
      + '<h3>Total: ' + new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(order.total) + ' VNĐ' + '</h3>' + '<p>Cảm ơn bạn!</p>')
}

let sendEmail=async(data)=>{
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user:'dh51801961@student.stu.edu.vn', // generated ethereal user
          pass:'bin131294', // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Laptop Quốc Thành" <dh51801961@student.stu.edu.vn>', // sender address
        to:data.email, // list of receivers
        subject: "Hóa đơn đặt hàng", // Subject line
        text: "Đơn hàng của bạn đã được xác nhận", // plain text body
        html: await htmlresult() , // html body
      });
}
module.exports={sendEmail:sendEmail}
