import React, { Component } from 'react';

import { connect } from 'react-redux';

import _ from "lodash";

import { USER_ROLE } from '../../utils/constant';

import './UserManage.scss';
import { getAllPermiss } from '../../services/permissService';
import { getAlluser, createuser, deleteuser, GetUserByType } from '../../services/userService';
import ModelCreateStaff from './ModelCreateStaff';
// import { db } from '../../firebaseConnect';
// import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUser: [],
            arrPermiss: [],

            arrCustomer: [],
            isOpenModalProduct: false,
            isOpenModalEditProduct: false,

            arrUserFromParent: [],

            errCode: '',
            errMessage: '',
        }
    }

    async componentDidMount() {
        let resCustomer = await GetUserByType(3);
        let resPermiss = await getAllPermiss();
        console.log('check permiss', resPermiss)
        let resopnse = await getAlluser();
        if (resopnse && resopnse.errCode === 0) {
            this.setState({
                arrUser: resopnse.user
            })
        }
        if (resCustomer && resCustomer.errCode === 0) {
            this.setState({
                arrCustomer: resCustomer.data
            })
        }
        if (resPermiss && resPermiss.errCode === 0) {
            this.setState({
                arrPermiss: resPermiss.permiss
            })
        }


    }
    handleGetAllUser = async () => {
        let resopnse = await getAlluser();
        if (resopnse && resopnse.errCode === 0) {
            this.setState({
                arrUser: resopnse.user
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

    createUserModal = async (data) => {

        try {
            let res = await createuser(data);
            if (res) {
                toast.success("Create User Success");
                this.handleGetAllUser();
                this.setState({
                    isOpenModalProduct: false,
                    errMessage: res.errMessage,
                    errCode: res.errCode
                })
            }

        } catch (error) {

            console.log(error)
        }
    }



    handleDeleteUser = async (user) => {
        try {
            let res = await deleteuser(user.id)
            if (res) {
                toast.success("Delete User Success");
                this.handleGetAllUser();
            }
        } catch (error) {
            console.log(error)
        }
    }


    render() {
        const { userInfo } = this.props;
        let arrUser = this.state.arrUser;
        let arrCustomer = this.state.arrCustomer;
        let arrPermiss = this.state.arrPermiss;




        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.id_permission;

            if (role === USER_ROLE.ADMIN) {

                return (
                    <>
                        <ModelCreateStaff
                            isOpen={this.state.isOpenModalProduct}
                            toggleProduct={this.toggleProductModal}
                            createUserModal={this.createUserModal}
                            errMessage={this.state.errMessage}
                            errCode={this.state.errCode}
                        />
                        <div className='header-listproduct'>
                            <button className='button-add' type="button"
                                onClick={() => this.handleCreateNewProduct()}
                            >
                                <i className='fa fa-plus '> Add New STAFF</i>
                            </button>
                            <h2>List User</h2>
                        </div>
                        <div className="table-wrapper">
                            <table className="fl-table">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Firstname</th>
                                        <th>Lastname</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Permission</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        arrUser && arrUser.map((item, index) => {

                                            return (
                                                <>
                                                    <tr>
                                                        <td >{item.id}</td>
                                                        <td >{item.firstname}</td>
                                                        <td >{item.lastname}</td>
                                                        <td >{item.email}</td>
                                                        <td >{item.phone}</td>
                                                        {
                                                            arrPermiss && arrPermiss.map((permiss, index) => {
                                                                if (permiss.id === item.id_permission)
                                                                    return <td >{permiss.permission}</td>
                                                            })
                                                        }

                                                        <button
                                                            onClick={() => { this.handleDeleteUser(item) }}
                                                            className='button-style-delete' type='button'><i className="fa fa-trash"></i></button>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
                )

            } else if (role === USER_ROLE.STAFF) {
                return (
                    <>
                        <div className='header-listproduct'>
                            {/* <button className='button-add' type="button"
                                onClick={() => this.handleCreateNewProduct()}
                            >
                                <i className='fa fa-plus '> Add New STAFF</i>
                            </button> */}

                            <h2>List User</h2>
                        </div>

                        <div className="table-wrapper">
                            <table className="fl-table">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Firstname</th>
                                        <th>Lastname</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Permission</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        arrCustomer && arrCustomer.map((item, index) => {

                                            return (
                                                <>
                                                    <tr>
                                                        <td >{item.id}</td>
                                                        <td >{item.firstname}</td>
                                                        <td >{item.lastname}</td>
                                                        <td >{item.email}</td>
                                                        <td >{item.phone}</td>
                                                        <td >{item.id_permission}</td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
                )
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
