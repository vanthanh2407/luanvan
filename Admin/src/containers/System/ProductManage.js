import React, { Component } from 'react';

import Pagination from "react-pagination-library";
import "react-pagination-library/build/css/index.css";
import { connect } from 'react-redux';
import './ProductManage.scss';
import { createProduct, deleteProduct, updateProduct, getAllProduct, GetPageProduct } from '../../services/productService';
import ModelProduct from './ModelProduct';
import ModelEditProduct from './ModelEditProduct';
import { db, storage } from '../../firebaseConnect';
import { doc, setDoc, serverTimestamp, addDoc, collection, getDocFromCache, query, where, getDocs } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, listAll, list, uploadBytes, } from "firebase/storage";

import { toast } from "react-toastify";
import _ from "lodash";
// import * as actions from "../../store/actions";
import { USER_ROLE } from '../../utils/constant';


class ProductManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrProduct: [],
            currentPage: 1,

            arrpage: [],
            arrpageCount: [],

            arrImage: [],
            arrImageReal: [],


            isOpenModalProduct: false,
            isOpenModalEditProduct: false,

            arrProdcutFromParent: [],

            errCode: '',
            errMessage: '',
        }
    }

    async componentDidMount() {
        // const querySnapshot = await getDocs(collection(db, "product"));
        // // console.log('check arrImagezxczxczxczxczxczxczxczxczxc:', querySnapshot)
        // querySnapshot.forEach((doc) => {
        //     // doc.data() is never undefined for query doc snapshots
        //     // console.log(doc.id, " => ", doc.data().dataImage);
        //     this.setState({
        //         arrImage: [doc.data()]
        //     })
        // });

        let resPage = await GetPageProduct(this.state.currentPage);
        if (resPage.products.count % 9 !== 0) {
            this.setState({
                arrpageCount: Math.floor(resPage.products.count / 9) + 1
            })
        } else {
            this.setState({
                arrpageCount: Math.floor(resPage.products.count / 9)
            })
        }

        let resopnse = await getAllProduct();
        if (resopnse && resopnse.errCode === 0) {
            this.setState({
                arrProduct: resopnse.product
            })
        }
        if (resPage && resPage.errCode === 0) {
            this.setState({
                arrpage: resPage.products
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.currentPage !== this.state.currentPage) {
            let resPage = await GetPageProduct(this.state.currentPage);
            if (resPage && resPage.errCode === 0) {
                this.setState({
                    arrpage: resPage.products
                })
            }
            this.setState({
                arrpage: this.state.arrpage,
            })
        }
        // if (prevState.arrImageReal === this.state.arrImageReal) {
        //     const querySnapshot = await getDocs(collection(db, "product"));
        //     // console.log('check arrImagezxczxczxczxczxczxczxczxczxc:', querySnapshot)
        //     querySnapshot.forEach((doc) => {
        //         // doc.data() is never undefined for query doc snapshots
        //         // console.log(doc.id, " => ", doc.data().dataImage);
        //         this.setState({
        //             arrImage: [doc.data()]
        //         })
        //     });

        //     // listAll(ref(storage, "images/")).then((resopnse) => {
        //     //     resopnse.items.forEach((item) => {
        //     //         getDownloadURL(item).then((url) => {
        //     //             this.setState({
        //     //                 arrImageReal: url,
        //     //                 // picture: this.state.fileUrl
        //     //             }, () => {
        //     //                 // console.log('check arrImagezxczxczxczxczxczxczxczxczxc:', this.state.arrImage)
        //     //             })
        //     //         })
        //     //     })
        //     // })
        //     // this.setState({
        //     //     arrImage: this.state.arrImage
        //     // }, () => {
        //     //     console.log('check arrImage:', this.state.arrImage)
        //     // })
        // }

    }


    handleGetAllProduct = async () => {
        let resopnse = await getAllProduct();
        if (resopnse && resopnse.errCode === 0) {
            this.setState({
                arrProduct: resopnse.product
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
    pageProduct = async (page, size) => {
        try {
            let res = await GetPageProduct(page, size);
            if (res) {
                this.setState({

                    errMessage: res.errMessage,
                    errCode: res.errCode
                }, () => {
                    console.log('check:', this.state.errMessage)
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
        // console.log('check delete product', product);
    }
    handleEditProduct = (product) => {

        this.setState({
            isOpenModalEditProduct: true,
            arrProdcutFromParent: product
        })
    }
    changeCurrentPage = async numPage => {
        try {
            let res = await GetPageProduct(numPage);
            if (res) {
                this.setState({
                    currentPage: numPage,
                    errMessage: res.errMessage,
                    errCode: res.errCode
                })
                // , () => {
                //     console.log('check:', this.state.currentPage)
                //     console.log('check numpage:', numPage)
                //     console.log('check  zxczxc:', 10 / 9)
                // }


            }
        } catch (error) {
            console.log(error)
        }

    };
    render() {
        let arrProdcut = this.state.arrProduct;

        let arrpageCount = this.state.arrpage.count;
        let arrpage = this.state.arrpage.rows;
        let arrImage = this.state.arrImageReal;
        // console.log('check data array: ', arrImage)


        const { userInfo } = this.props;



        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.id_permission;
            if (role === USER_ROLE.ADMIN) {
                return (
                    <>
                        <ModelProduct
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
                                        <th>Image</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        arrpage && arrpage.map((item, index) => {

                                            return (
                                                <>
                                                    <tr onClick={() => { this.handleEditProduct(item) }}>

                                                        <td >{item.id}</td>
                                                        <td >{item.name}</td>
                                                        <td ><span className="new-price new-price-2">{new Intl.NumberFormat('vi-VN', { style: 'decimal', decimal: 'VND' }).format(item.price) + ' VNĐ'}</span></td>
                                                        <td >{item.quantity}</td>
                                                        {/* {
                                                            arrImage && arrImage.map((image) => {
                                                                if (image.id === item.id_user)
                                                                    return <td >{user.firstname}</td>
                                                            })
                                                        } */}
                                                        <td><img style={{ width: '30px', height: '30px' }} src={item.picture}></img></td>
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
                        </div>

                        <div>
                            <Pagination
                                currentPage={this.state.currentPage}
                                totalPages={this.state.arrpageCount}
                                changeCurrentPage={this.changeCurrentPage}
                                theme="square-i"
                            />
                        </div>
                    </>
                );
            } else if (role === USER_ROLE.STAFF) {
                return (
                    <>
                        <ModelProduct
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
                                        <th>Image</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        arrpage && arrpage.map((item, index) => {

                                            return (
                                                <>
                                                    <tr onClick={() => { this.handleEditProduct(item) }} >

                                                        <td >{item.id}</td>
                                                        <td >{item.name}</td>
                                                        <td ><span className="new-price new-price-2">{new Intl.NumberFormat('vi-VN', { style: 'decimal', decimal: 'VND' }).format(item.price) + ' VNĐ'}</span></td>
                                                        <td >{item.quantity}</td>
                                                        <td><img style={{ width: '30px', height: '30px' }} src={item.picture}></img></td>
                                                        <td>
                                                            <button
                                                                onClick={() => { this.handleEditProduct(item) }}
                                                                className='button-style-eidt' type='button' ><i className="fas fa-pencil-alt"></i></button>
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <Pagination
                                currentPage={this.state.currentPage}
                                totalPages={this.state.arrpageCount}
                                changeCurrentPage={this.changeCurrentPage}
                                theme="square-i"
                            />
                        </div>





                    </>
                );
            }
        }


    }

}

const mapStateToProps = state => {
    return {
        userInfo: state.admin.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
