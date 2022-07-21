import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import HistoryAPI from '../../API/HistoryAPI';
import Detail_OrderAPI from '../../API/Detail_OrderAPI';
import OrderAPI from '../../API/OrderAPI';
import './History.css';


function DetailHistory(props) {

    const { id } = useParams()

    const [order, set_order] = useState({})
    const [user, set_user] = useState({})
    const [detail_order, set_detail_order] = useState([])
    const [product, set_product] = useState([])

    const [note, set_note] = useState({})

    useEffect(() => {

        const fetchData = async () => {

            const response = await OrderAPI.get_detail(id)
            console.log('a',response)

            set_order(response)

            const response_detail_order = await Detail_OrderAPI.get_detail_order(id)
            console.log('aaa',response_detail_order)
            set_detail_order(response_detail_order)

            const response_user = await OrderAPI.Get_User(response.id_user)
            console.log('a',response_user)
            set_user(response_user)
            // console.log('thanh',response_detail_order)

            for (let i = 0; i < response_detail_order.length; i++){
                const response_product = await Detail_OrderAPI.Get_Detail_Product(response_detail_order.id_product[i])
                console.log('thanh1',response_product)
                set_product(response_product)
            }
        }

        fetchData()

    }, [])

    return (
        <div>
            <div className="container" style={{ paddingTop: '3rem' }}>
                <h1>Chi Tiết Đơn Hàng</h1>
                <ul>
                    <li style={{ fontSize: '1.1rem' }}>Mã hóa đơn: <span>{order.id}</span></li>
                    <li style={{ fontSize: '1.1rem' }}>Họ và tên: <span>{user.lastname+ ' '+ user.firstname}</span></li>
                    <li style={{ fontSize: '1.1rem' }}>Số điện thoại: <span>{user.phone}</span></li>
                    <li style={{ fontSize: '1.1rem' }}>Địa chỉ giao hàng: <span>{order.address}</span></li>
                    {/* <li style={{ fontSize: '1.1rem' }}>Total: <span>{new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(order.total) + ' VNĐ'}</span></li> */}
                    {/* <li style={{ fontSize: '1.1rem' }}>Feeship: <span>{new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(30000) + ' VNĐ'}</span></li> */}
                    {/* <li style={{ fontSize: '1.1rem' }}>Payment: <span>{order.id_payment && order.id_payment.pay_name}</span></li> */}
                </ul>
                <div className="group_box_status" style={{ marginTop: '3rem' }}>
                    <div className="d-flex justify-content-center">
                        <div className="group_status_delivery d-flex justify-content-around">
                        <div className="detail_status_delivery">
                                <div className="w-100 d-flex justify-content-center">
                                    <div className={order.id_status > 0 ? 'bg_status_delivery_active' : 'bg_status_delivery'}></div>
                                </div>
                                <a className="a_status_delivery">Chưa xử lý</a>
                            </div>

                            <div className="detail_status_delivery">
                                <div className="w-100 d-flex justify-content-center">
                                    <div className={order.id_status > 1 ? 'bg_status_delivery_active' : 'bg_status_delivery'}></div>
                                </div>
                                <a className="a_status_delivery">Đã xử lý</a>
                            </div>

                            <div className="detail_status_delivery">
                                <div className="w-100 d-flex justify-content-center">
                                    <div className={order.id_status > 2 ? 'bg_status_delivery_active' : 'bg_status_delivery'}></div>
                                </div>
                                <a className="a_status_delivery">Đang giao</a>
                            </div>

                            <div className="detail_status_delivery">
                                <div className="w-100 d-flex justify-content-center">
                                    <div className={order.id_status > 3  ? 'bg_status_delivery_active' : 'bg_status_delivery'}></div>
                                </div>
                                <a className="a_status_delivery">Đã giao</a>
                            </div>
                            <div className="detail_status_delivery">
                                <div className="w-100 d-flex justify-content-center">
                                    <div className={order.id_status >= 5 ? 'bg_status_delivery_active' : 'bg_status_delivery'}></div>
                                </div>
                                <a className="a_status_delivery">Đã hủy</a>
                            </div>
                        </div>
                    </div>
                    <div className="test_status d-flex justify-content-center">
                        <div className="hr_status_delivery"></div>
                    </div>
                </div>
            </div>

            <div className="Shopping-cart-area pt-60 pb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <form action="#">
                                <div className="table-content table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th className="li-product-remove">Image</th>
                                                <th className="li-product-thumbnail">Name Product</th>
                                                <th className="cart-product-name">Price</th>
                                                <th className="li-product-price">Count</th>
                                                <th className="li-product-price">Total</th>
                                                {/* <th className="li-product-price">Size</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                detail_order && detail_order.map(value => (
                                                    <tr key={value.id}>
                                                        <td className="li-product-thumbnail"><img src={value.picture} style={{ width: '5rem' }} alt="Li's Product Image" /></td>
                                                        <td className="li-product-name"><a href="#">{value.name}</a></td>
                                                        <td className="li-product-price"><span className="amount">{new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(value.price) + ' VNĐ'}</span></td>
                                                        <td className="li-product-price"><span className="amount">{value.quantity}</span></td>
                                                        <td className="li-product-price"><span className="amount">{new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(value.price*value.quantity) + ' VNĐ'}</span></td>
                                                    </tr>
                                                ))
                                            }
                                            <tr>
                                                <th className="li-product-remove"></th>
                                                <th className="li-product-thumbnail"></th>
                                                <th className="cart-product-name">Fee Ship</th>
                                                <th className="li-product-price"></th>
                                                <th className="li-product-price"><span className="amount">{new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(30000) + ' VNĐ'}</span></th>
                                                {/* <th className="li-product-price">Size</th> */}
                                            </tr>
                                             <tr>
                                                 <th className="li-product-remove" ></th>
                                                 <th className="li-product-thumbnail"></th> 
                                                 <th className="cart-product-name">Total</th>
                                                <th className="li-product-price" rowSpan={4}></th>
                                                <th className="li-product-price"><span className="amount" style={{color:'red'}}>{new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(order.total) + ' VNĐ'}</span></th>
                                                 {/* <th className="li-product-price">Size</th> */}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailHistory;