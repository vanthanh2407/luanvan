import React, { useEffect, useState} from 'react';
import { Modal } from "react-bootstrap";
import { useParams } from 'react-router';
import Product from '../API/Product';
import { useDispatch, useSelector } from 'react-redux';
import { stringify } from 'query-string';
import { addCart } from '../Redux/Action/ActionCart';
import { changeCount } from '../Redux/Action/ActionCount';
import { Link } from 'react-router-dom';
import Cart from '../API/CartAPI';
import CommentAPI from '../API/CommentAPI';
import CartsLocal from '../Share/CartsLocal';
import SaleAPI from '../API/SaleAPI';
import { getProduct } from '../API/Product'

Detail_Product.propTypes = {

};

function Detail_Product(props) {

    const { id } = useParams()

    const [product, set_product] = useState({})

    const dispatch = useDispatch()

    //id_user được lấy từ redux
    // const id_user = useSelector(state => state.Cart.id_user)

    // Get count từ redux khi user chưa đăng nhập
    const count_change = useSelector(state => state.Count.isLoad)

    // const [sale, setSale] = useState()

    // Hàm này dùng để gọi API hiển thị sản phẩm
    useEffect(() => {

        const fetchData = async () => {

            const response = await getProduct(id)

            set_product(response)
            

        }

        fetchData()

    }, [id])


    const [count, set_count] = useState(1)

    const [show_success, set_show_success] = useState(false)

    // const [size, set_size] = useState('S')

    // // Hàm này dùng để thêm vào giỏ hàng
    const handler_addcart = (e) => {

        e.preventDefault()

        const data = {
            id_cart: Math.random().toString(),
            id_product: product.id,
            name_product: product.name,
            price_product: product.price,
            count: count,
            image: product.picture,
        }

        CartsLocal.addProduct(data)

        const action_count_change = changeCount(count_change)
        dispatch(action_count_change)

        set_show_success(true)

        setTimeout(() => {
            set_show_success(false)
        }, 1000)

    }



    // Hàm này dùng để giảm số lượng
    const downCount = () => {
        if (count === 1) {
            return
        }

        set_count(count - 1)
    }

    const upCount = () => {
        set_count(count + 1)
    }


    // // State dùng để mở modal
    // const [modal, set_modal] = useState(false)

    // // State thông báo lỗi comment
    const [error_comment, set_error_comment] = useState(false)

    // const [star, set_star] = useState(1)

    // const [comment, set_comment] = useState('')

    // const [validation_comment, set_validation_comment] = useState(false)

    // // state load comment
    // const [load_comment, set_load_comment] = useState(true)

    // // State list_comment
    // const [list_comment, set_list_comment] = useState([])

    // // Hàm này dùng để gọi API post comment sản phẩm của user
    // const handler_Comment = () => {

    //     if (!sessionStorage.getItem('id_user')) { // Khi khách hàng chưa đăng nhập

    //         set_error_comment(true)

    //     } else { // Khi khách hàng đã đăng nhập

    //         if (!comment) {
    //             set_validation_comment(true)
    //             return
    //         }

    //         const data = {
    //             id_user: sessionStorage.getItem('id_user'),
    //             content: comment,
    //             star: star
    //         }

    //         const post_data = async () => {

    //             const response = await CommentAPI.post_comment(data, id)

    //             console.log(response)

    //             set_load_comment(true)

    //             set_comment('')

    //             set_modal(false)

    //         }

    //         post_data()

    //     }

    //     setTimeout(() => {
    //         set_error_comment(false)
    //     }, 1500)

    // }


    // // Hàm này dùng để GET API load ra những comment của sản phẩm
    // useEffect(() => {

    //     if (load_comment) {
    //         const fetchData = async () => {

    //             const response = await CommentAPI.get_comment(id)

    //             set_list_comment(response)

    //         }

    //         fetchData()

    //         set_load_comment(false)
    //     }

    // }, [load_comment])


// class Detail_Product extends Component{
    
//     constructor(props) {
//         super(props);
//         this.state = {
//             detailProduct: {},
//             downCount:'',
//             upCount:'',
//             set_count: 1,
//             count:1
//         }
//     }
    
//     async componentDidMount() {
        
//         if(this.props.match && this.props.match.params && this.props.match.params.id){
            
//             let id = this.props.match.params.id
//             let res = await getProduct(id)
//             if(res && res.errCode===0){
//                 this.setState({
//                     detailProduct: res.data
//                 })
//             }

//             // console.log('thanhdeptrai: res',res)
//         }
//     }
//     // Hàm này dùng để giảm số lượng
//     downCount = () => {
//         if (this.state.count === 1) {
//             return
//         }

//         this.state.set_count(this.state.count - 1)
//     }
//     upCount = () => {
//         this.state.set_count(this.state.count + 1)
//     }

//     render() {
//         // console.log(this.props.match.params.id)
//         console.log('thanhdeptrai: state',this.state)
//         let product = this.state.detailProduct;
        
//         let downCount = this.state.downCount;
//         let upCount = this.state.upCount;
        
    return (
        <div>
            {
                show_success &&
                <div className="modal_success">
                    <div className="group_model_success pt-3">
                        <div className="text-center p-2">
                            <i className="fa fa-bell fix_icon_bell" style={{ fontSize: '40px', color: '#fff' }}></i>
                        </div>
                        <h4 className="text-center p-3" style={{ color: '#fff' }}>Bạn Đã Thêm Hàng Thành Công!</h4>
                    </div>
                </div>
            }
            {
                error_comment &&
                <div className="modal_success">
                    <div className="group_model_success pt-3">
                        <div className="text-center p-2">
                            <i className="fa fa-bell fix_icon_bell" style={{ fontSize: '40px', color: '#fff', backgroundColor: '#f84545' }}></i>
                        </div>
                        <h4 className="text-center p-3" style={{ color: '#fff' }}>Vui Lòng Kiểm Tra Lại Đăng Nhập!</h4>
                    </div>
                </div>
            }


            <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li className="active">Detail</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="content-wraper">
                <div className="container">
                    {/* {product && product.map(value => ( */}
                    <div className="row single-product-area">
                    
                        <div className="col-lg-5 col-md-6">
                            <div className="product-details-left">
                                <div className="product-details-images slider-navigation-1">
                                    <div className="lg-image">
                                    
                                        <img src={product.picture} alt="product image" />
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                   
                        <div className="col-lg-7 col-md-6">
                            <div className="product-details-view-content pt-60">
                                <div className="product-info">
                                    <h2>{product.name}</h2>
                                    <div className="price-box pt-20">
                                            {/* // sale ? (<del className="new-price new-price-2" style={{ color: '#525252'}}>{new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(product.price_product)+ ' VNĐ'}</del>) : */}
                                            <span className="new-price new-price-2">{new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(product.price)+ ' VNĐ'}</span>
                                            
                                        {/* <br />
                                        {
                                            sale && (
                                                <span className="new-price new-price-2">{new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'})
                                                .format(parseInt(sale.id_product.price_product) - ((parseInt(sale.id_product.price_product) * parseInt(sale.promotion)) / 100)) + ' VNĐ'}</span>
                                            )
                                        } */}
                                    </div>
                                    <div className="product-desc">
                                      <span><a className="product_name" >{product.summary}</a></span>
                                    </div>

                                    <div className="single-add-to-cart">
                                        <form action="#" className="cart-quantity">
                                            <div className="quantity">
                                                <span style={{color: 'red'}}>Còn lại {product.quantity} sản phẩm</span>
                                                <label>Thêm vào giỏ hàng</label>
                                                {/* <div className="cart-plus-minus">
                                                    <input className="cart-plus-minus-box" value={this.state.count} type="text" onChange={(e) => this.state.set_count(e.target.value)} />
                                                    <div className="dec qtybutton" onClick={downCount}><i className="fa fa-angle-down"></i></div>
                                                    <div className="inc qtybutton" onClick={upCount}><i className="fa fa-angle-up"></i></div>
                                                </div> */}
                                            </div>
                                            <a href="#" className="add-to-cart" type="submit" onClick={handler_addcart}>Add to cart</a>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    </div>
                     {/* ))} */}
                </div>
            </div>

            <div className="product-area pt-35">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="li-product-tab">
                                <ul className="nav li-product-menu">
                                    <li><a className="active" data-toggle="tab" href="#description"><span>Thông số kỹ thuật</span></a></li>
                                    <li><a data-toggle="tab" href="#reviews"><span>Mô tả sản phẩm</span></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="tab-content">
                        <div id="description" className="tab-pane active show" role="tabpanel">
                            <div className="product-description">
                                <table cellspacing="0" border="1" className="table-product">
                                    <tr >
                                        <td colspan="2" className="table-product-0">Thông số kỹ thuật</td>

                                    </tr>
                                    <tr>
                                        <td className="table-product-1">Ram</td>
                                        <td>{product.ram}</td>
                                    </tr>
                                    <tr>
                                        <td className="table-product-1">Chip</td>
                                        <td>{product.chip}</td>
                                    </tr>
                                    <tr>
                                        <td>Card đồ họa</td>
                                        <td>{product.card}</td>
                                    </tr>
                                    <tr>
                                        <td>Màn hình</td>
                                        <td>{product.display}</td>
                                    </tr>
                                    <tr>
                                        <td>Bộ nhớ</td>
                                        <td>{product.memory}</td>
                                    </tr>
                                    <tr>
                                        <td>Cổng</td>
                                        <td>{product.port}</td>
                                    </tr>
                                    <tr>
                                        <td>Kết nổi</td>
                                        <td>{product.connect}</td>
                                    </tr>
                                    <tr>
                                        <td>Pin</td>
                                        <td>{product.pin}</td>
                                    </tr>
                                    <tr>
                                        <td>Hệ điều hành</td>
                                        <td>{product.operation}</td>
                                    </tr>
                                    <tr>
                                        <td>Kích thước</td>
                                        <td>{product.size}</td>
                                    </tr>
                                    <tr>
                                        <td>Trọng lượng</td>
                                        <td>{product.weight} kg</td>
                                    </tr>
                                    <tr>
                                        <td>Bảo hành</td>
                                        <td>{product.insurance} tháng</td>
                                    </tr>
                                </table>
                            
                            </div>
                        </div>
                        <div id="reviews" className="tab-pane" role="tabpanel">
                            <div className="product-reviews">
                                {product.content}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail_Product;