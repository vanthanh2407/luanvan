import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Redirect, Route, Switch, BrowserRouter, Link } from 'react-router-dom';
import './OrderManage.scss';
import { getAllOrder, updateOrder } from '../../services/orderService';
import { getAlluser } from '../../services/userService';
import { getAllStatus } from '../../services/statusService';
import DetailOrderManage from './DetailOrderManage';

import ModalEditOrder from './ModalEditOrder';
// import { db } from '../../firebaseConnect';
// import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

class OrderManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrOrder: [],
            arrStatus: [],
            arrUser: [],

            arrOrderFromParent: [],

            isOpenDetailOrder: false,
            arrDetailOrder: null,

            isOpenModalProduct: false,
            isOpenModalEditProduct: false,


            errCode: '',
            errMessage: '',
        }
    }

    async componentDidMount() {
        let resStatus = await getAllStatus();
        let resUser = await getAlluser();
        let resopnse = await getAllOrder();
        if (resopnse && resopnse.errCode === 0) {
            this.setState({
                arrOrder: resopnse.order
            })
        }
        if (resUser && resUser.errCode === 0) {
            this.setState({
                arrUser: resUser.user
            })
        }
        if (resStatus && resStatus.errCode === 0) {
            this.setState({
                arrStatus: resStatus.status
            })
        }

    }
    handleGetAllOrder = async () => {
        let resopnse = await getAllOrder();
        if (resopnse && resopnse.errCode === 0) {
            this.setState({
                arrOrder: resopnse.order
            })

        }
    }
    handleCreateNewCate = () => {
        this.setState({
            isOpenModalProduct: true
        })
    }
    toggleDetailOrderModal = () => {
        this.setState({
            isOpenDetailOrder: !this.state.isOpenDetailOrder,
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


    editOrderModal = async (data) => {
        try {
            let res = await updateOrder(data);
            if (res && res.errCode === 0 || res.errCode === 3) {
                toast.success("Update Order Success");
                this.handleGetAllOrder();
                this.setState({
                    isOpenModalEditProduct: false,
                    errMessage: res.errMessage,
                    errCode: res.errCode
                })
            } else if (res && res.errCode === 11 || res.errCode === 5 || res.errCode === 4) {
                toast.error("Update Order Failed");
                this.handleGetAllOrder();
                this.setState({
                    isOpenModalEditProduct: false,
                    errMessage: res.errMessage,
                    errCode: res.errCode
                })
            }
            // else if () {

            // }
        } catch (error) {
            console.log(error)
        }
    }

    // handleDetailOrder = () => {
    //     <BrowserRouter>
    //         <Switch>
    //             <Route path="/system/detailorder-manage" component={DetailOrderManage} />
    //         </Switch>
    //     </BrowserRouter>
    //     console.log('check detail')
    // }

    handleDetailOrder = (IdOrder) => {
        this.setState({
            isOpenDetailOrder: true,
            arrDetailOrder: IdOrder
        }, () => {
            console.log('check detail order: ', this.state.arrDetailOrder)
        })
    }


    handleEditOrder = (Order) => {
        this.setState({
            isOpenModalEditProduct: true,
            arrOrderFromParent: Order
        })
    }
    render() {
        let arrOrder = this.state.arrOrder;
        let arrUser = this.state.arrUser;
        let arrStatus = this.state.arrStatus;



        return (
            <>

                {this.state.isOpenDetailOrder && < DetailOrderManage
                    isOpen={true}
                    toggleDetailOrder={this.toggleDetailOrderModal}
                    idOrder={this.state.arrDetailOrder}
                />}


                {this.state.isOpenModalEditProduct && <ModalEditOrder
                    isOpen={this.state.isOpenModalEditProduct}
                    toggleProductEdit={this.toggleProductModalEdit}

                    editOrder={this.editOrderModal}
                    arrOrderEdit={this.state.arrOrderFromParent}

                    errMessage={this.state.errMessage}
                    errCode={this.state.errCode}
                />}



                <div className='header-listproduct'>

                    <h2>List Order</h2>
                </div>

                <div className="table-wrapper">
                    <table className="fl-table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Note</th>
                                <th>Trạng thái đơn hàng</th>
                                <th>Tên khách hàng</th>
                                <th>Email</th>
                                {/* <th>Phương thức thanh toán</th> */}
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                arrOrder && arrOrder.map((item, index) => {

                                    return (
                                        <>
                                            <tr  >

                                                <td onClick={() => { this.handleDetailOrder(item.id) }}>{item.id}</td>
                                                <td onClick={() => { this.handleDetailOrder(item.id) }}>{item.note}</td>
                                                {
                                                    arrStatus && arrStatus.map((status) => {
                                                        if (status.id === item.id_status)
                                                            return <td onClick={() => { this.handleDetailOrder(item.id) }} >{status.name}</td>
                                                    })
                                                }
                                                {
                                                    arrUser && arrUser.map((user) => {
                                                        if (user.id === item.id_user)
                                                            return <td onClick={() => { this.handleDetailOrder(item.id) }}>{user.firstname}</td>
                                                    })
                                                }
                                                {
                                                    arrUser && arrUser.map((user) => {
                                                        if (user.id === item.id_user)
                                                            return <td onClick={() => { this.handleDetailOrder(item.id) }} >{user.email}</td>
                                                    })
                                                }

                                                {/* <td >{item.payment}</td> */}
                                                <td onClick={() => { this.handleDetailOrder(item.id) }}>{item.total}</td>
                                                <td>
                                                    <button
                                                        onClick={() => { this.handleEditOrder(item) }}
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

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderManage);
