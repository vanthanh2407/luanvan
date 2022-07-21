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
        let resProduct = await getAllProduct();
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



    render() {
        let arrComment = this.state.arrComment;
        let { arrUser, arrProduct } = this.state;
        return (
            <>
                <div className='header-listproduct'>


                    <h2>List Comment</h2>
                </div>

                <div className="table-wrapper">
                    <table className="fl-table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Content</th>
                                <th>Start</th>

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
                                                {
                                                    arrProduct && arrProduct.map((product) => {
                                                        if (product.id === item.id_product)
                                                            return <td >{product.name}</td>
                                                    })
                                                }
                                                {
                                                    arrUser && arrUser.map((user) => {
                                                        if (user.id === item.id_user)
                                                            return <td >{user.firstname}</td>
                                                    })
                                                }

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
