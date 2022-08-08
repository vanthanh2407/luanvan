import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import io from "socket.io-client";
import CouponAPI from '../API/CouponAPI';
import Detail_OrderAPI from '../API/Detail_OrderAPI';
import OrderAPI from '../API/OrderAPI';
import User from '../API/User';
import { changeCount } from '../Redux/Action/ActionCount';
import './Checkout.css';



Checkout.propTypes = {

};


function Checkout(props) {

    const [orderID, setOrderID] = useState('')

    const [carts, set_carts] = useState([])

    const [total_price, set_total_price] = useState(0)

    const [discount, set_discount] = useState(0)

    // state load_map

    // state load_order
    const [load_order_status, set_load_order_status] = useState(true)

    const [check_action, set_check_action] = useState(true)


    useEffect(() => {

        if (check_action) {

            set_carts(JSON.parse(localStorage.getItem('carts')))

            Sum_Price(JSON.parse(localStorage.getItem('carts')), 0)

            set_check_action(false)
        }

    }, [check_action])

    // Hàm này dùng để tính tổng tiền
    function Sum_Price(carts, sum_price) {

        carts.map(value => {
            return sum_price += Number(value.count) * Number(value.price_product)
        })

        const total = Number(sum_price)

        if (localStorage.getItem('coupon')){
            // GET localStorage
            const coupon = JSON.parse(localStorage.getItem('coupon'))
            // console.log('a',coupon.id)

            set_discount((total * parseInt(coupon.cost)) / 100)

            const newTotal = total - ((total * parseInt(coupon.cost)) / 100) + Number(price)

            localStorage.setItem("total_price", newTotal)

            set_total_price(newTotal)
        }else{
            
            localStorage.setItem("total_price", total + Number(price))

            set_total_price(total + Number(price))

        }

    }

    const [show_error, set_show_error] = useState(false)

    const [information, set_information] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        address: '',
        email: ''
    })

    

    // Hàm này dùng để check validation cho paypal
    useEffect(() => {

        checkValidation()

    }, [information])

    // Kiểm tra Paypal
    function checkValidation() {
        if (information.fullname === '') {
            set_show_error(true)
        } else {
            if (information.phone === '') {
                set_show_error(true)
            } else {
                if (information.email === '') {
                    
                    localStorage.setItem('information', JSON.stringify(information))

                    set_show_error(true)
                } else {
                    set_show_error(false)
                }
            }
        }
    }


    const { register, handleSubmit, errors } = useForm();

    const [redirect, set_redirect] = useState(false)


    const [load_order, set_load_order] = useState(false)

    const count_change = useSelector(state => state.Count.isLoad)

    const dispatch = useDispatch()
    const [note, set_note] = useState('')
    const [paymethod, set_paymethod] = useState('')
    const [id_payment, set_id_payment] = useState('')
    const [id_coupon, set_id_coupon] = useState('')
    const [id_user, set_id_user] = useState('')
    const [id_status, set_id_status] = useState('')
    const [createdAt, set_createdAt] = useState('')
    const [updatedAt, set_updatedAt] = useState('')

    // Hàm này dùng để thanh toán offline
    const handler_Checkout = async (data) => {

        set_load_order(true)

        // if (localStorage.getItem("id_coupon")){

        //     const responseUpdate = await CouponAPI.updateCoupon(localStorage.getItem("coupon").id)
        //     console.log(responseUpdate)

        // }
        let checkCoupon = () =>{
            const coupon = JSON.parse(localStorage.getItem('coupon'))
            if(coupon){
                return coupon.id;
            }else{
                return null;
            }
        }
        // if(coupon){
            // data Order
            const data_order = {
                id: id,
                address: address,
                note: note,
                total: total_price,
                paymethod: '0',
                id_payment: '1',
                id_user: sessionStorage.getItem('id_user'),
                id_status: '1',
                email: email,
                phone: phone,
                name:firstname,
                id_coupon: await checkCoupon(),
            }
        // }else{
        //     return data_order = {
        //         id: id,
        //         address: address,
        //         note: note,
        //         total: total_price,
        //         paymethod: '0',
        //         id_payment: '1',
        //         id_user: sessionStorage.getItem('id_user'),
        //         id_status: '1',
        //         email: email,
        //         phone: phone,
        //         name:firstname,
        //     }
        // }

        // Xứ lý API Order
        const response_order = await OrderAPI.post_order(data_order)
        // console.log("abc", response_order.product.id)


        // data carts
        const data_carts = JSON.parse(localStorage.getItem('carts'))
        // console.log(data_carts)

        // Xử lý API Detail_Order
        for (let i = 0; i < data_carts.length; i++) {
            const datas = {
                id_order: response_order.product.id,
                id_product: data_carts[i].id_product,
                name: data_carts[i].name_product,
                price: data_carts[i].price_product,
                quantity: data_carts[i].count, 
                total: data_carts[i].price_product * data_carts[i].count,
            }

            await Detail_OrderAPI.post_detail_order(datas)
            // console.log(datas)

        }

        localStorage.removeItem('information')
        localStorage.removeItem('total_price')
        localStorage.removeItem('price_product')
        localStorage.removeItem('id_coupon')
        localStorage.removeItem('coupon')
        localStorage.setItem('carts', JSON.stringify([]))

        
        set_redirect(true)

        // Hàm này dùng để load lại phần header bằng Redux
        const action_count_change = changeCount(count_change)
        dispatch(action_count_change)
        await OrderAPI.post_email(data_order)


    }
    
    const Change_Load_Order = (value) => {

        set_load_order(value)

    }

    // Giá tiền
    const [price, set_price] = useState('30000')


   
    const [user, set_user] = useState({})
    useEffect(() => {

        const fetchData = async () => {

            const response = await User.Get_User(sessionStorage.getItem('id_user'))

            set_user(response)
            set_email(response.email)
            set_firstname(response.firstname)
            set_lastname(response.lastname)
            set_phone(response.phone)
            set_address(response.address)

        }

        fetchData()

    }, [])
    const [firstname, set_firstname] = useState('')
    const [lastname, set_lastname] = useState('')
    const [phone, set_phone] = useState('')
    const [address, set_address] = useState('')
    const [email, set_email] = useState('')
    const [id, set_id] = useState('')

    return (
        <div>

            {
                load_order && (
                    <div className="wrapper_loader">
                        <div className="loader"></div>
                    </div>
                )
            }

            <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li className="active">Checkout</li>
                        </ul>
                    </div>
                </div>
            </div >
            <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
                {
                    load_order_status && (
                        <div className="row">
                            <div className="col-lg-6 col-12 pb-5">
                                <form onSubmit={handleSubmit(handler_Checkout)}>
                                    <div className="checkbox-form">
                                        <h3>Billing Details</h3>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="checkout-form-list">
                                                    <label>Name <span className="required">*</span></label>
                                                    <input placeholder="Enter Firstname" type="text" name="firstname"
                                                        ref={register({ required: true })}
                                                        value={firstname}
                                                        onChange={(e) => set_firstname(e.target.value)} />
                                                    {errors.firstname && errors.firstname.type === "required" && <span style={{ color: 'red' }}>* name is required</span>}
                                                </div>
                                            </div>
                                            {/* <div className="col-md-12">
                                                <div className="checkout-form-list">
                                                    <label>Last Name <span className="required">*</span></label>
                                                    <input placeholder="Enter lastname" type="text" name="lastname"
                                                        ref={register({ required: true })}
                                                        value={lastname}
                                                        onChange={(e) => set_lastname(e.target.value)} />
                                                    {errors.lastname && errors.lastname.type === "required" && <span style={{ color: 'red' }}>* Lastname is required</span>}
                                                </div>
                                            </div> */}
                                            <div className="col-md-12">
                                                <div className="checkout-form-list">
                                                    <label>Phone Number <span className="required">*</span></label>
                                                    <input placeholder="Enter Phone Number" type="text" name="phone"
                                                        ref={register({ required: true })}
                                                        value={phone}
                                                        onChange={(e) => set_phone(e.target.value)} />
                                                    {errors.phone && errors.phone.type === "required" && <span style={{ color: 'red' }}>* Phone Number is required</span>}
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="checkout-form-list">
                                                    <label>Address <span className="required">*</span></label>
                                                    <input placeholder="Street address" type="text" name="address"
                                                        ref={register({ required: true })}
                                                        value={address}
                                                        onChange={(e) => set_address(e.target.value)}
                                                         />
                                                    {errors.address && errors.address.type === "required" && <span style={{ color: 'red' }}>* Address is required</span>}
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="checkout-form-list">
                                                    <label>Email <span className="required">*</span></label>
                                                    <input placeholder="Enter Email" type="email" name="email"
                                                        ref={register({ required: true })}
                                                        value={email}
                                                        onChange={(e) => set_email(e.target.value)} 
                                                        />
                                                    {errors.email && errors.email.type === "required" && <span style={{ color: 'red' }}>* Email is required</span>}
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="order-button-payment">
                                                    {
                                                        redirect && <Redirect to="/success" />
                                                    }
                                                    <input value="Place order" type="submit" onChange={handler_Checkout}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-6 col-12">
                                <div className="your-order">
                                    <h3>Your order</h3>
                                    <div className="your-order-table table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th className="cart-product-name">Product</th>
                                                    <th className="cart-product-total">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    carts && carts.map(value => (
                                                        <tr className="cart_item" key={value.id}>
                                                            <td className="cart-product-name">{value.name_product}<strong className="product-quantity"> × {value.count}</strong></td>
                                                            <td className="cart-product-total"><span className="amount">{new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(parseInt(value.price_product) * parseInt(value.count)) + ' VNĐ'}</span></td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                            <tfoot>
                                                <tr className="cart-subtotal">
                                                    <th>Shipping Cost</th>
                                                    <td><span className="amount">{new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(price) + ' VNĐ'}</span></td>
                                                </tr>
                                                <tr className="cart-subtotal">
                                                    <th>Discount</th>
                                                    <td><span className="amount">{new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(discount) + ' VNĐ'}</span></td>
                                                </tr>
                                                <tr className="order-total">
                                                    <th>Order Total</th>
                                                    <td><strong><span className="amount">{new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(total_price) + ' VNĐ'}</span></strong></td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                        <div className="col-md-12">
                                                <div className="checkout-form-list">
                                                    <label>Note <span className="required">*</span></label>
                                                    <textarea type="text" name="note"
                                                        value={note}
                                                        onChange={(e) => set_note(e.target.value)} 
                                                        style={{ backgroundColor: '#ffffff' }}/>
                                                        
                                                </div>
                                            </div>
                                    </div>
                                    {/* <div className="payment-method">
                                        <div className="payment-accordion">
                                            <div id="accordion">
                                                <div className="card">
                                                    <div className="card-header" id="#payment-3">
                                                        <h5 className="panel-title">
                                                            <a className="collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                PayPal
                                                </a>
                                                        </h5>
                                                    </div>
                                                    <div id="collapseThree" className="collapse">
                                                        <div className="card-body">
                                                            {
                                                                show_error ? 'Please Checking Information!' :
                                                                    <Paypal
                                                                        information={information}
                                                                        total={total_price}
                                                                        Change_Load_Order={Change_Load_Order}
                                                                        from={from}
                                                                        distance={distance}
                                                                        duration={duration}
                                                                        price={price}
                                                                    />
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                            {/* <div>
                                                <div className="card">
                                                    <div className="card-header" id="#payment-3">
                                                        <h5 className="panel-title">
                                                            <a className="collapsed" data-toggle="collapse" data-target="#collapseMomo" aria-expanded="false" aria-controls="collapseMomo">
                                                                MoMo
                                                        </a>
                                                        </h5>
                                                    </div>
                                                    <div id="collapseMomo" className="collapse">
                                                        <div className="card-body">
                                                            {
                                                                show_error ? 'Please Checking Information!' :
                                                                <div>
                                                                    <img src="https://developers.momo.vn/images/logo.png" width="50" onClick={handlerMomo}
                                                                    style={{ cursor: 'pointer' }} />
                                                                    <MoMo 
                                                                        orderID={orderID}
                                                                        total={total_price}
                                                                        />
                                                                </div>  
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                        {/* </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        // </div>

    );
}

export default Checkout;