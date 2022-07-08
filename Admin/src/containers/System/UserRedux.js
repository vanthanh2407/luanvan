import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllBooks, createProduct, deleteProduct, updateProduct } from '../../services/userService';
import ModelProduct from './ModelProduct';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrProdcut: [],
            isOpenModalProduct: false,
        }
    }

    async componentDidMount() {
        let resopnse = await getAllBooks();
        if (resopnse && resopnse.errCode === 0) {
            this.setState({
                arrProdcut: resopnse.product
            })

        }

    }
    handleCreateNewProduct = () => {
        this.setState({
            isOpenModalProduct: true
        })

    }
    toggleProductModal = () => {
        this.setState({
            isOpenModalProduct: !this.state.isOpenModalProduct,
        })
    }
    render() {
        let arrProdcut = this.state.arrProdcut;
        return (
            <>
                <ModelProduct
                    isOpen={this.state.isOpenModalProduct}
                    toggleProduct={this.toggleProductModal}
                />

                <div><button className='button-add' type="button"
                    onClick={() => this.handleCreateNewProduct()}

                ><i className='fa fa-plus'></i> Add New Product</button></div>
                <h2>List Product</h2>
                <div className="table-wrapper">
                    <table className="fl-table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                arrProdcut && arrProdcut.map((item, index) => {

                                    return (
                                        <>
                                            <tr>

                                                <td >{item.id}</td>
                                                <td >{item.name}</td>
                                                <td >{item.price} VNĐ</td>
                                                <td >{item.quantity}</td>
                                                <td>
                                                    <button className='button-style-eidt' type='button' ><i className="fas fa-pencil-alt"></i></button>
                                                    <button className='button-style-delete' type='button'><i className="fa fa-trash"></i></button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>






            </>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
