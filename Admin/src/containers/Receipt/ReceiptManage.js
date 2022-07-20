import React, { Component } from 'react';

import { connect } from 'react-redux';
// import './ReceiptManage.scss';
import { getAllBooks, createProduct, deleteProduct, updateProduct } from '../../services/productService';
// import ModelProduct from './ModelProduct';
// // import ModelEditProduct from './ModelEditProduct';
// import { db } from '../../firebaseConnect';
// import { doc, setDoc } from "firebase/firestore"; 
import { toast } from "react-toastify";

class ReceiptManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrProdcut: [],
            isOpenModalProduct: false,
            isOpenModalEditProduct: false,
            arrProdcutFromParent: [],
            errCode: '',
            errMessage: '',
        }
    }

    async componentDidMount() {
        // let resopnse = await getAllBooks();
        // if (resopnse && resopnse.errCode === 0) {
        //     this.setState({
        //         arrProdcut: resopnse.product
        //     })

        // }

    }
    handleGetAllProduct = async () => {
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

    handleEditProduct = () => {
        this.setState({
            isOpenModalEditProduct: true
        })
    }
    toggleProductModalEdit = () => {
        this.setState({
            isOpenModalEditProduct: !this.state.isOpenModalEditProduct,
        })
    }

    createProductModal = async (data) => {
        // data.preventDefault()
        // await setDoc(doc(db, "cities", "LA"), {
        //     name: "Los Angeles",
        //     state: "CA",
        //     country: "USA"
        // });
        try {
            let res = await createProduct(data);
            if (res) {
                toast.success("Create Product Success");
                this.handleGetAllProduct();
                this.setState({
                    isOpenModalProduct: false,
                    errMessage: res.errMessage,
                    errCode: res.errCode
                })
                console.log('check api product', this.state.errMessage)
            } else { toast.error("Create Product Failed"); }

        } catch (error) {

            console.log(error)
        }
    }
    editProductModal = async (data) => {
        try {
            let res = await updateProduct(data);
            if (res) {
                toast.success("Update Product Success");
                this.handleGetAllProduct();
                this.setState({
                    isOpenModalEditProduct: false,
                    errMessage: res.errMessage,
                    errCode: res.errCode
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    handleDeleteProduct = async (product) => {
        try {
            let res = await deleteProduct(product.id)
            if (res) {
                toast.success("Delete Product Success");
                this.handleGetAllProduct();
            } else { toast.error("Delete Product Failed"); }
        } catch (error) {
            toast.error("Delete Product Failed");
            console.log(error)
        }
        console.log('check delete product', product);
    }


    // handleTestHidden = () => {
    //     alert("check check");
    // }


    handleEditProduct = (product) => {

        this.setState({
            isOpenModalEditProduct: true,
            arrProdcutFromParent: product
        })
    }
    render() {
        // let arrProdcut = this.state.arrProdcut;
        // console.log('check product', arrProdcut)
        return (
            <>
                {/* <ModelProduct
                    isOpen={this.state.isOpenModalProduct}
                    toggleProduct={this.toggleProductModal}
                    createProductModal={this.createProductModal}
                    errMessage={this.state.errMessage}
                    errCode={this.state.errCode}

                    handleEditProduct={this.handleEditProduct}

                />

                {this.state.isOpenModalEditProduct && <ModelEditProduct
                    isOpen={this.state.isOpenModalEditProduct}
                    toggleProductEdit={this.toggleProductModalEdit}
                    editProduct={this.editProductModal}
                    arrProdcutEdit={this.state.arrProdcutFromParent}
                    errMessage={this.state.errMessage}
                    errCode={this.state.errCode}
                />}


                <div className='header-listproduct'>
                    <button className='button-add' type="button"
                        onClick={() => this.handleCreateNewProduct()}
                    >
                        <i className='fa fa-plus '> Add New Product</i>
                    </button>
                   
                    <h2>List Product</h2>
                </div>

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
                                                <td ><span className="new-price new-price-2">{new Intl.NumberFormat('vi-VN', { style: 'decimal', decimal: 'VND' }).format(item.price) + ' VNĐ'}</span></td>
                                                <td >{item.quantity}</td>
                                                <td>
                                                    <button
                                                        onClick={() => { this.handleEditProduct(item) }}
                                                        className='button-style-eidt' type='button' ><i className="fas fa-pencil-alt"></i></button>
                                                    <button
                                                        onClick={() => { this.handleDeleteProduct(item) }}
                                                        className='button-style-delete' type='button'><i className="fa fa-trash"></i></button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div> */}
                <div>REceipt</div>






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

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptManage);
