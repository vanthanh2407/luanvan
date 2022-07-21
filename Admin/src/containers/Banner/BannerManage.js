import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './BannerManage.scss';
import { getAllBanner, createBanner, deleteBanner, updateBanner, FindByIdBanner } from '../../services/bannerService';
import ModalCreateBanner from './ModalCreateBanner';
import ModalEditBanner from './ModalEditBanner';
import { db } from '../../firebaseConnect';
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

class BannerManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrBanner: [],

            arrBannerFromParent: [],

            isOpenModalProduct: false,
            isOpenModalEditProduct: false,


            errCode: '',
            errMessage: '',
        }
    }

    async componentDidMount() {
        let resopnse = await getAllBanner();
        if (resopnse && resopnse.errCode === 0) {
            this.setState({
                arrBanner: resopnse.banner
            })

        }

    }
    handleGetAllBanner = async () => {
        let resopnse = await getAllBanner();
        if (resopnse && resopnse.errCode === 0) {
            this.setState({
                arrBanner: resopnse.banner
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

    createBannerModal = async (data) => {

        try {
            let res = await createBanner(data);
            if (res) {
                toast.success("Create Banner Success");
                this.handleGetAllBanner();
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
    editBannerModal = async (data) => {
        try {
            let res = await updateBanner(data);
            if (res) {
                toast.success("Update Banner Success");
                this.handleGetAllBanner();
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
    handleDeleteProduct = async (banner) => {
        try {
            let res = await deleteBanner(banner.id)
            if (res) {
                toast.success("Delete Banner Success");
                this.handleGetAllBanner();
            } else { toast.error("Delete Product Failed"); }
        } catch (error) {
            console.log(error)
        }

    }


    handleTestHidden = () => {
        alert("check check");
    }


    handleEditBanner = (banner) => {

        this.setState({
            isOpenModalEditProduct: true,
            arrBannerFromParent: banner
        })
    }
    render() {
        let arrBanner = this.state.arrBanner;
        // console.log('check product', arrProdcut)
        return (
            <>
                <ModalCreateBanner
                    isOpen={this.state.isOpenModalProduct}
                    toggleProduct={this.toggleProductModal}

                    createBannerModal={this.createBannerModal}

                    errMessage={this.state.errMessage}
                    errCode={this.state.errCode}

                    handleEditBanner={this.handleEditBanner}

                />

                {this.state.isOpenModalEditProduct && <ModalEditBanner
                    isOpen={this.state.isOpenModalEditProduct}
                    toggleProductEdit={this.toggleProductModalEdit}

                    editBanner={this.editBannerModal}
                    arrBannerEdit={this.state.arrBannerFromParent}

                    errMessage={this.state.errMessage}
                    errCode={this.state.errCode}
                />}


                <div className='header-listproduct'>
                    <button className='button-add' type="button"
                        onClick={() => this.handleCreateNewCate()}
                    >
                        <i className='fa fa-plus '> Add New Banner</i>
                    </button>

                    <h2>List Banner</h2>
                </div>

                <div className="table-wrapper">
                    <table className="fl-table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Picture</th>
                                <th>Name Product</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                arrBanner && arrBanner.map((item, index) => {

                                    return (
                                        <>
                                            <tr>

                                                <td >{item.id}</td>
                                                <td >{item.picture}</td>
                                                <td>{item.id_product}</td>

                                                <td>
                                                    <button
                                                        onClick={() => { this.handleEditBanner(item) }}
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

export default connect(mapStateToProps, mapDispatchToProps)(BannerManage);
