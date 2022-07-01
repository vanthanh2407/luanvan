import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getAllProduct } from '../../API/Product'

// Products.propTypes = {
//     products: PropTypes.array,
//     sort: PropTypes.string
// };

// Products.defaultProps = {
//     products: [],
//     sort: ''
// }

// function Products(props) {

//     const { products, sort } = props;

//     if (sort === 'DownToUp') {
//         products.sort((a, b) => {
//             return a.price - b.price
//         });
//     }
//     else if (sort === 'UpToDown') {
//         products.sort((a, b) => {
//             return b.price - a.price
//         });
//     }

//     let componentDidMount = async () => {
//         let resopnse = await getAllBooks();
//         if (resopnse && resopnse.errCode === 0) {
//             this.setState({
//                 arrProdcut: resopnse.product
//             })

//         }
//         console.log('check: ', resopnse);
//     }
class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrProdcut: [],
            isOpenModalProduct: false,
        }
    }

    async componentDidMount() {
        let resopnse = await getAllProduct();
        if (resopnse && resopnse.errCode === 0) {
            this.setState({
                arrProdcut: resopnse.product
            })

        }
        console.log('check: ', resopnse);
    }

    render() {
        let arrProdcut = this.state.arrProdcut;
    return (
        <div className="row">
            {
                arrProdcut && arrProdcut.map(value => (
                    <div className="col-lg-4 col-md-4 col-sm-6 mt-40 animate__animated animate__zoomIn col_product" key={value.id}>
                        <div className="single-product-wrap">
                            <div className="product-image">
                                <Link to={`/detail/${value.id}`}>
                                    <img src={(value.picture)} alt="Li's Product Image" />
                                </Link>
                                <span className="sticker">New</span>
                            </div>
                            <div className="product_desc">
                                <div className="product_desc_info">
                                    <div className="product-review">
                                        <h5 className="manufacturer">
                                            <Link to={`/detail/${value.id}`}>
                                                <a href="product-details.html">{value.name.substring(0,45)+"..."}</a>
                                            </Link>
                                        </h5>
                                        <div className="rating-box">
                                            <ul className="rating">
                                                <li><i className="fa fa-star-o"></i></li>
                                                <li><i className="fa fa-star-o"></i></li>
                                                <li><i className="fa fa-star-o"></i></li>
                                                <li><i className="fa fa-star-o"></i></li>
                                                <li><i className="fa fa-star-o"></i></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <h4><a className="product_name" href="single-product.html">{ value.summary.substring(0,45)+"..."}</a></h4>
                                    <div className="price-box">
                                        <span className="new-price">{new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(value.price)+ ' VND'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}
}
export default Products;