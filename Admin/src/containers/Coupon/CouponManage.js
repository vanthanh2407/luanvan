import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './CouponManage.scss';
import { getAllcoupon, createcoupon, deletecoupon, updatecoupon } from '../../services/couponService';
import ModalCreateCoupon from './ModalCreateCoupon';
import ModalEditCoupon from './ModalEditCoupon';
import { db } from '../../firebaseConnect';
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import _ from "lodash";
import * as actions from "../../store/actions";
import { USER_ROLE } from '../../utils/constant';

class CouponManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrCoupon: [],

            isOpenModalProduct: false,
            isOpenModalEditProduct: false,

            arrCouponFromParent: [],

            errCode: '',
            errMessage: '',
        }
    }

    async componentDidMount() {
        let resopnse = await getAllcoupon();
        console.log('check coupon: ', resopnse)
        if (resopnse && resopnse.errCode === 0) {
            this.setState({
                arrCoupon: resopnse.user
            })

        }

    }
    handleGetAllCoupon = async () => {
        let resopnse = await getAllcoupon();
        if (resopnse && resopnse.errCode === 0) {
            this.setState({
                arrCoupon: resopnse.user
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

    createcouponModal = async (data) => {
        try {
            let res = await createcoupon(data);
            if (res) {
                toast.success("Create coupon Success");
                this.handleGetAllCoupon();
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
    editCouponModal = async (data) => {
        try {
            let res = await updatecoupon(data);
            if (res) {
                toast.success("Update coupon Success");
                this.handleGetAllCoupon();
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
    handleDeleteCoupon = async (coupon) => {
        try {
            let res = await deletecoupon(coupon.id)
            if (res) {
                toast.success("Delete coupon Success");
                this.handleGetAllCoupon();
            }
        } catch (error) {

            console.log(error)
        }
    }
    handleEditCoupon = (coupon) => {

        this.setState({
            isOpenModalEditProduct: true,
            arrCouponFromParent: coupon
        })
    }
    render() {
        let arrCoupon = this.state.arrCoupon;
        const { processLogout, userInfo } = this.props;



        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.id_permission;
            if (role === USER_ROLE.ADMIN) {
                return (
                    <>
                        <ModalCreateCoupon
                            isOpen={this.state.isOpenModalProduct}
                            toggleProduct={this.toggleProductModal}
                            createcouponModal={this.createcouponModal}
                            errMessage={this.state.errMessage}
                            errCode={this.state.errCode}

                            handleEditCoupon={this.handleEditCoupon}

                        />

                        {this.state.isOpenModalEditProduct && <ModalEditCoupon
                            isOpen={this.state.isOpenModalEditProduct}
                            toggleProductEdit={this.toggleProductModalEdit}
                            editcoupon={this.editCouponModal}
                            arrCouponEdit={this.state.arrCouponFromParent}
                            errMessage={this.state.errMessage}
                            errCode={this.state.errCode}
                        />}


                        <div className='header-listproduct'>
                            <button className='button-add' type="button"
                                onClick={() => this.handleCreateNewProduct()}
                            >
                                <i className='fa fa-plus '> Add New Coupon</i>
                            </button>

                            <h2>List Coupon</h2>
                        </div>

                        <div className="table-wrapper">
                            <table className="fl-table">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        {/* <th>Date</th> */}
                                        <th>Cost</th>
                                        <th>Describe</th>
                                        <th>Quantity</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        arrCoupon && arrCoupon.map((item, index) => {

                                            return (
                                                <>
                                                    <tr>
                                                        <td >{item.id}</td>
                                                        <td >{item.name}</td>
                                                        {/* <td >{item.date}</td> */}
                                                        <td >{item.cost} %</td>
                                                        <td >{item.describe}</td>
                                                        <td >{item.quantity}</td>
                                                        <td>
                                                            <button
                                                                onClick={() => { this.handleEditCoupon(item) }}
                                                                className='button-style-eidt' type='button' ><i className="fas fa-pencil-alt"></i></button>
                                                            <button
                                                                onClick={() => { this.handleDeleteCoupon(item) }}
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
            } else if (role === USER_ROLE.STAFF) {
                return (
                    <>
                        <ModalCreateCoupon
                            isOpen={this.state.isOpenModalProduct}
                            toggleProduct={this.toggleProductModal}
                            createcouponModal={this.createcouponModal}
                            errMessage={this.state.errMessage}
                            errCode={this.state.errCode}

                            handleEditCoupon={this.handleEditCoupon}

                        />

                        {this.state.isOpenModalEditProduct && <ModalEditCoupon
                            isOpen={this.state.isOpenModalEditProduct}
                            toggleProductEdit={this.toggleProductModalEdit}
                            editcoupon={this.editCouponModal}
                            arrCouponEdit={this.state.arrCouponFromParent}
                            errMessage={this.state.errMessage}
                            errCode={this.state.errCode}
                        />}


                        <div className='header-listproduct'>
                            <button className='button-add' type="button"
                                onClick={() => this.handleCreateNewProduct()}
                            >
                                <i className='fa fa-plus '> Add New Coupon</i>
                            </button>

                            <h2>List Coupon</h2>
                        </div>

                        <div className="table-wrapper">
                            <table className="fl-table">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        {/* <th>Date</th> */}
                                        <th>Cost</th>
                                        <th>Describe</th>
                                        <th>Quantity</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        arrCoupon && arrCoupon.map((item, index) => {

                                            return (
                                                <>
                                                    <tr>
                                                        <td >{item.id}</td>
                                                        <td >{item.name}</td>
                                                        {/* <td >{item.date}</td> */}
                                                        <td >{item.cost} %</td>
                                                        <td >{item.describe}</td>
                                                        <td >{item.quantity}</td>
                                                        <td>
                                                            <button
                                                                onClick={() => { this.handleEditCoupon(item) }}
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
                    </>
                );
            }
        }
        // console.log('check coupon', arrCoupon)

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

export default connect(mapStateToProps, mapDispatchToProps)(CouponManage);
