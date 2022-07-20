import React, { Component } from 'react';

import { connect } from 'react-redux';



import './SupplierManage.scss';
import { getAllSupplier, createSupplier, deleteSupplier, updateSupplier } from '../../services/supplierService';
import ModelCreateSupplier from './ModelCreateSupplier';
import ModelEditSupplier from './ModelEditSupplier';
// import { db } from '../../firebaseConnect';
// import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

class SupplierManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrSupplier: [],

            isOpenModalProduct: false,
            isOpenModalEditProduct: false,

            arrSupplierFromParent: [],

            errCode: '',
            errMessage: '',
        }
    }

    async componentDidMount() {
        let resopnse = await getAllSupplier();

        if (resopnse && resopnse.errCode === 0) {
            this.setState({
                arrSupplier: resopnse.supplier
            })

        }

    }
    handleGetAllSupplier = async () => {
        let resopnse = await getAllSupplier();
        if (resopnse && resopnse.errCode === 0) {
            this.setState({
                arrSupplier: resopnse.supplier
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

    createSupplierModal = async (data) => {

        try {
            let res = await createSupplier(data);
            if (res) {
                toast.success("Create Supplier Success");
                this.handleGetAllSupplier();
                this.setState({
                    isOpenModalProduct: false,
                    errMessage: res.errMessage,
                    errCode: res.errCode
                })
            } else { toast.error("Create Product Failed"); }

        } catch (error) {

            console.log(error)
        }
    }
    editSupplierModal = async (data) => {
        try {
            let res = await updateSupplier(data);
            if (res) {
                toast.success("Update Supplier Success");
                this.handleGetAllSupplier();
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
    handleDeleteSupplier = async (Supplier) => {
        try {
            let res = await deleteSupplier(Supplier.id)
            if (res) {
                toast.success("Delete Supplier Success");
                this.handleGetAllSupplier();
            }
        } catch (error) {
            toast.error("Delete Supplier Failed");
            console.log(error)
        }

    }


    // handleTestHidden = () => {
    //     alert("check check");
    // }


    handleEditSupplier = (Supplier) => {

        this.setState({
            isOpenModalEditProduct: true,
            arrSupplierFromParent: Supplier
        })
    }
    render() {
        let arrSupplier = this.state.arrSupplier;
        // console.log('check product', arrSupplier)
        return (
            <>
                <ModelCreateSupplier
                    isOpen={this.state.isOpenModalProduct}
                    toggleProduct={this.toggleProductModal}
                    createSupplierModal={this.createSupplierModal}
                    errMessage={this.state.errMessage}
                    errCode={this.state.errCode}

                    handleEditSupplier={this.handleEditSupplier}

                />

                {this.state.isOpenModalEditProduct && <ModelEditSupplier
                    isOpen={this.state.isOpenModalEditProduct}
                    toggleProductEdit={this.toggleProductModalEdit}
                    editSupplier={this.editSupplierModal}
                    arrSupplierEdit={this.state.arrSupplierFromParent}
                    errMessage={this.state.errMessage}
                    errCode={this.state.errCode}
                />}


                <div className='header-listproduct'>
                    <button className='button-add' type="button"
                        onClick={() => this.handleCreateNewProduct()}
                    >
                        <i className='fa fa-plus '> Add New Supplier</i>
                    </button>

                    <h2>List Supplier</h2>
                </div>

                <div className="table-wrapper">
                    <table className="fl-table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Picture</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                arrSupplier && arrSupplier.map((item, index) => {

                                    return (
                                        <>
                                            <tr>

                                                <td >{item.id}</td>
                                                <td >{item.name}</td>
                                                <td >{item.picture.substring(0, 100) + "..."}</td>
                                                <td >{item.phone}</td>
                                                <td >{item.address}</td>
                                                <td >{item.email}</td>
                                                <td>
                                                    <button
                                                        onClick={() => { this.handleEditSupplier(item) }}
                                                        className='button-style-eidt' type='button' ><i className="fas fa-pencil-alt"></i></button>
                                                    <button
                                                        onClick={() => { this.handleDeleteSupplier(item) }}
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

export default connect(mapStateToProps, mapDispatchToProps)(SupplierManage);
