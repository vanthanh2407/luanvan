import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './OrderManage.scss';
import { getAllOrder, updateOrder} from '../../services/orderService';
import { getAlluser, createuser, updateuser, deleteuser, GetUserByType } from '../../services/userService';
import { getAllStatus} from '../../services/statusService';
// import ModalCreateCate from './ModalCreateCate';
// import ModalEditCate from './ModalEditCate';
import { db } from '../../firebaseConnect';
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

class OrderManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrOrder: [],
            arrStatus: [],
            arrUser: [],

            arrOrderFromParent: [],

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
    handleGetAllCate = async () => {
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

    
    editCateModal = async (data) => {
        // try {
        //     let res = await updateCate(data);
        //     if (res) {
        //         toast.success("Update Category Success");
        //         this.handleGetAllCate();
        //         this.setState({
        //             isOpenModalEditProduct: false,
        //             errMessage: res.errMessage,
        //             errCode: res.errCode
        //         })
        //     }
        // } catch (error) {
        //     console.log(error)
        // }
    }
    


    


    handleEditCate = (cate) => {
        this.setState({
            isOpenModalEditProduct: true,
            arrOrderFromParent: cate
        })
    }
    render() {
        let arrOrder = this.state.arrOrder;
        let arrUser = this.state.arrUser;
        let arrStatus = this.state.arrStatus;

        console.log('check order', arrOrder)
        return (
            <>
                

                {/* {this.state.isOpenModalEditProduct && <ModalEditCate
                    isOpen={this.state.isOpenModalEditProduct}
                    toggleProductEdit={this.toggleProductModalEdit}

                    editCate={this.editCateModal}
                    arrOrderEdit={this.state.arrOrderFromParent}

                    errMessage={this.state.errMessage}
                    errCode={this.state.errCode}
                />}  */}


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
                                            <tr>

                                                <td >{item.id}</td>
                                                <td >{item.note}</td>
                                                {
                                                    arrStatus && arrStatus.map((status)=>{
                                                        if(status.id == item.id_status)
                                                        return <td >{status.name}</td>
                                                    })
                                                }
                                                {
                                                    arrUser && arrUser.map((user)=>{
                                                        if(user.id == item.id_user)
                                                        return <td >{user.firstname}</td>
                                                    })
                                                }
                                                {
                                                    arrUser && arrUser.map((user)=>{
                                                        if(user.id == item.id_user)
                                                        return <td >{user.email}</td>
                                                    })
                                                }
                                                
                                                {/* <td >{item.payment}</td> */}
                                                <td >{item.total}</td>
                                                <td>
                                                    <button
                                                        onClick={() => { this.handleEditCate(item) }}
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
