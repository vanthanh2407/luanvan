import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './CommentManage.scss';
import { getAllComment, createComment, deleteComment, updatecomment } from '../../services/commentService';
import { getAllBooks, createProduct, deleteProduct, updateProduct, FindByIdProduct, getAllProduct } from '../../services/productService';
import { getAlluser } from '../../services/userService';
// import ModelProduct from './ModelProduct';
// import ModelEditProduct from './ModelEditProduct';
import { db } from '../../firebaseConnect';
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

class CommentManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrComment: [],

            arrUser: [],

            arrProduct: [],

            isOpenModalProduct: false,
            isOpenModalEditProduct: false,
            arrCommentFromParent: [],
            errCode: '',
            errMessage: '',
        }
    }

    async componentDidMount() {
        let resUser = await getAlluser();
        let resProduct = await getAllProduct();
        let resopnse = await getAllComment();
        if (resopnse && resopnse.errCode === 0) {
            this.setState({
                arrComment: resopnse.comment
            })
        }
        if (resUser && resUser.errCode === 0) {
            this.setState({
                arrUser: resUser.user
            })
        }
        if (resProduct && resProduct.errCode === 0) {
            this.setState({
                arrProduct: resProduct.product
            })
        }


    }
    handleGetAllComment = async () => {
        let resopnse = await getAllComment();
        if (resopnse && resopnse.errCode === 0) {
            this.setState({
                arrComment: resopnse.comment
            })

        }
    }
    // handleCreateNewProduct = () => {
    //     this.setState({
    //         isOpenModalProduct: true
    //     })
    // }
    // toggleProductModal = () => {
    //     this.setState({
    //         isOpenModalProduct: !this.state.isOpenModalProduct,
    //     })
    // }

    // handleEditProduct = () => {
    //     this.setState({
    //         isOpenModalEditProduct: true
    //     })
    // }
    // toggleProductModalEdit = () => {
    //     this.setState({
    //         isOpenModalEditProduct: !this.state.isOpenModalEditProduct,
    //     })
    // }

    // createProductModal = async (data) => {
    //     // data.preventDefault()
    //     // await setDoc(doc(db, "cities", "LA"), {
    //     //     name: "Los Angeles",
    //     //     state: "CA",
    //     //     country: "USA"
    //     // });
    //     try {
    //         let res = await createProduct(data);
    //         if (res) {
    //             toast.success("Create Product Success");
    //             this.handleGetAllProduct();
    //             this.setState({
    //                 isOpenModalProduct: false,
    //                 errMessage: res.errMessage,
    //                 errCode: res.errCode
    //             })
    //             console.log('check api product', this.state.errMessage)
    //         } else { toast.error("Create Product Failed"); }

    //     } catch (error) {

    //         console.log(error)
    //     }
    // }
    // editProductModal = async (data) => {
    //     try {
    //         let res = await updateProduct(data);
    //         if (res) {
    //             toast.success("Update Product Success");
    //             this.handleGetAllProduct();
    //             this.setState({
    //                 isOpenModalEditProduct: false,
    //                 errMessage: res.errMessage,
    //                 errCode: res.errCode
    //             })
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    handleDeleteComment = async (comment) => {
        try {
            let res = await deleteComment(comment.id)
            if (res) {
                toast.success("Delete Comment Success");
                this.handleGetAllComment();
            }
        } catch (error) {

            console.log(error)
        }

    }


    // handleTestHidden = () => {
    //     alert("check check");
    // }


    // handleEditProduct = (product) => {

    //     this.setState({
    //         isOpenModalEditProduct: true,
    //         arrCommentFromParent: product
    //     })
    // }
    render() {
        let arrComment = this.state.arrComment;
        // console.log('check product', arrComment)
        return (
            <>
                <div className='header-listproduct'>
                    {/* <button className='button-add' type="button"
                        onClick={() => this.handleCreateNewProduct()}
                    >
                        <i className='fa fa-plus '> Add New Product</i>
                    </button> */}

                    <h2>List Comment</h2>
                </div>

                <div className="table-wrapper">
                    <table className="fl-table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Content</th>
                                <th>Start</th>
                                <th>Status</th>
                                <th>Name Product</th>
                                <th>User</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                arrComment && arrComment.map((item, index) => {

                                    return (
                                        <>
                                            <tr>

                                                <td >{item.id}</td>
                                                <td >{item.content}</td>
                                                <td >{item.star}</td>
                                                <td >{item.status}</td>
                                                <td >{item.id_product}</td>
                                                <td >{item.id_user}</td>
                                                <td>
                                                    {/* <button
                                                        onClick={() => { this.handleEditProduct(item) }}
                                                        className='button-style-eidt' type='button' ><i className="fas fa-pencil-alt"></i></button> */}
                                                    <button
                                                        onClick={() => { this.handleDeleteComment(item) }}
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

export default connect(mapStateToProps, mapDispatchToProps)(CommentManage);
