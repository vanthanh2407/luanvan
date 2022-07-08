import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './CateManage.scss';
import { getAllCate, createCate, deleteCate, updateCate, FindByIdCate } from '../../services/cateService';
import ModalCreateCate from './ModalCreateCate';
import ModalEditCate from './ModalEditCate';
import { db } from '../../firebaseConnect';
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

class CateManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrCate: [],

            arrCateFromParent: [],

            isOpenModalProduct: false,
            isOpenModalEditProduct: false,


            errCode: '',
            errMessage: '',
        }
    }

    async componentDidMount() {
        let resopnse = await getAllCate();
        if (resopnse && resopnse.errCode === 0) {
            this.setState({
                arrCate: resopnse.user
            })

        }

    }
    handleGetAllCate = async () => {
        let resopnse = await getAllCate();
        if (resopnse && resopnse.errCode === 0) {
            this.setState({
                arrCate: resopnse.user
            })

        }
    }
    handleCreateNewCate = () => {
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

    createCateModal = async (data) => {

        try {
            let res = await createCate(data);
            if (res) {
                toast.success("Create Category Success");
                this.handleGetAllCate();
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
    editCateModal = async (data) => {
        try {
            let res = await updateCate(data);
            if (res) {
                toast.success("Update Category Success");
                this.handleGetAllCate();
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
    handleDeleteProduct = async (cate) => {
        try {
            let res = await deleteCate(cate.id)
            if (res) {
                toast.success("Delete Cate Success");
                this.handleGetAllCate();
            } else { toast.error("Delete Product Failed"); }
        } catch (error) {
            console.log(error)
        }

    }


    handleTestHidden = () => {
        alert("check check");
    }


    handleEditCate = (cate) => {

        this.setState({
            isOpenModalEditProduct: true,
            arrCateFromParent: cate
        })
        console.log('check:....', cate)
    }
    render() {
        let arrCate = this.state.arrCate;
        // console.log('check product', arrProdcut)
        return (
            <>
                <ModalCreateCate
                    isOpen={this.state.isOpenModalProduct}
                    toggleProduct={this.toggleProductModal}

                    createCateModal={this.createCateModal}

                    errMessage={this.state.errMessage}
                    errCode={this.state.errCode}

                    handleEditCate={this.handleEditCate}

                />

                {this.state.isOpenModalEditProduct && <ModalEditCate
                    isOpen={this.state.isOpenModalEditProduct}
                    toggleProductEdit={this.toggleProductModalEdit}

                    editCate={this.editCateModal}
                    arrCateEdit={this.state.arrCateFromParent}

                    errMessage={this.state.errMessage}
                    errCode={this.state.errCode}
                />}


                <div className='header-listproduct'>
                    <button className='button-add' type="button"
                        onClick={() => this.handleCreateNewCate()}
                    >
                        <i className='fa fa-plus '> Add New Category</i>
                    </button>

                    <h2>List Category</h2>
                </div>

                <div className="table-wrapper">
                    <table className="fl-table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                arrCate && arrCate.map((item, index) => {

                                    return (
                                        <>
                                            <tr>

                                                <td >{item.id}</td>
                                                <td >{item.category}</td>

                                                <td>
                                                    <button
                                                        onClick={() => { this.handleEditCate(item) }}
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
                {/* <div>zxc,nzx,cmnz,xcmnz,xcnz,cn,mzxcn,mzcn,mznxc,mznxc,nz,xcn,mznxc,</div> */}






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

export default connect(mapStateToProps, mapDispatchToProps)(CateManage);
