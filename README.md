<h2>Xây dựng Website bán laptop sử dụng công nghệ ReactJS, NodeJS & MySQL</h2>
<h3>Website bao gồm các chức năng chính: </h3>
    <b>- Thêm, Xóa, Tìm Kiếm, Phân Trang, Phân Loại Sản Phẩm </b> </br>
    <b>- Đặt Hàng </b> </br>
    <b>- Live Chat ( Tư Vấn Khách Hàng ) </b> </br>
    <b>- Gửi Email để xác nhận đơn hàng </b> </br>
    <b>- Thanh Toán Paypal  </b> </br>


------------------------------------------------------------------

## Contributors
- VanThanh
- AnhQuoc

## API
ROOT API ENDPOINT : http://localhost:3002/

```bash

- api/product : PRODUCT API ENDPOINT

    - router.get('/products', Products.index)

    - router.get('/products/:id', Products.detail)

  
- api/user : USER API ENDPOINT

    - router.get('/user', Users.index)

    - router.get('/user/:id', Users.user)

    - router.get('/login', Users.detail)

    - router.post('/create-user', Users.post_user)


##	Hướng dẫn cài đặt:
- Cài đặt NodeJS version 14 (https://nodejs.org/en/blog/release/v14.17.3/)
- Cài đặt Visual Studio Code
- Cài đặt Xampp/Wamp

## Get Started

``` bash
# install dependencies
npm install
```
``` bash
# run project
npm start
```


## Technical details
- Nodejs, Reactjs.
- Express.
- MySQL
