import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './NewsManage.scss';
import { getAllnews, createnews, deletenews, updatenews } from '../../services/newsService';
import ModalCreateNews from './ModalCreateNews';
import ModalEditNews from './ModalEditNews';
import { db } from '../../firebaseConnect';
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import _ from "lodash";
import * as actions from "../../store/actions";
import { USER_ROLE } from '../../utils/constant';

class NewsManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrNews: [],

            arrNewsFromParent: [],

            isOpenModalProduct: false,
            isOpenModalEditProduct: false,


            errCode: '',
            errMessage: '',
        }
    }

    async componentDidMount() {
        let resopnse = await getAllnews();
        if (resopnse && resopnse.errCode === 0) {
            this.setState({
                arrNews: resopnse.news
            })

        }

    }
    handlegetAllnews = async () => {
        let resopnse = await getAllnews();
        if (resopnse && resopnse.errCode === 0) {
            this.setState({
                arrNews: resopnse.news
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

    createNewsModal = async (data) => {

        try {
            let res = await createnews(data);
            if (res) {
                toast.success("Create News Success");
                this.handlegetAllnews();
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
    editNewsModal = async (data) => {
        try {
            let res = await updatenews(data);
            if (res) {
                toast.success("Update News Success");
                this.handlegetAllnews();
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
    handleDeleteProduct = async (News) => {
        try {
            let res = await deletenews(News.id)
            if (res) {
                toast.success("Delete News Success");
                this.handlegetAllnews();
            } else { toast.error("Delete Product Failed"); }
        } catch (error) {
            console.log(error)
        }

    }


    handleTestHidden = () => {
        alert("check check");
    }


    handleEditNews = (news) => {

        this.setState({
            isOpenModalEditProduct: true,
            arrNewsFromParent: news
        })
    }
    render() {
        let arrNews = this.state.arrNews;
        const { processLogout, userInfo } = this.props;



        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.id_permission;
            if (role === USER_ROLE.ADMIN) {
                return (
                    <>
                        <ModalCreateNews
                            isOpen={this.state.isOpenModalProduct}
                            toggleProduct={this.toggleProductModal}

                            createNewsModal={this.createNewsModal}

                            errMessage={this.state.errMessage}
                            errCode={this.state.errCode}

                            handleEditNews={this.handleEditNews}

                        />

                        {this.state.isOpenModalEditProduct && <ModalEditNews
                            isOpen={this.state.isOpenModalEditProduct}
                            toggleProductEdit={this.toggleProductModalEdit}

                            editNews={this.editNewsModal}
                            arrNewsEdit={this.state.arrNewsFromParent}

                            errMessage={this.state.errMessage}
                            errCode={this.state.errCode}
                        />}


                        <div className='header-listproduct'>
                            <button className='button-add' type="button"
                                onClick={() => this.handleCreateNewCate()}
                            >
                                <i className='fa fa-plus '> Add New News</i>
                            </button>

                            <h2>List News</h2>
                        </div>

                        <div className="table-wrapper">
                            <table className="fl-table">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Content</th>
                                        <th>Picture</th>
                                        <th>Name User</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        arrNews && arrNews.map((item, index) => {

                                            return (
                                                <>
                                                    <tr>

                                                        <td >{item.id}</td>
                                                        <td >{item.name}</td>
                                                        <td>{item.content}</td>
                                                        <td>{item.picture}</td>
                                                        <td>{item.id_user}</td>

                                                        <td>
                                                            <button
                                                                onClick={() => { this.handleEditNews(item) }}
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
                    </>
                );
            } else if (role === USER_ROLE.STAFF) {
                return (
                    <>
                        <ModalCreateNews
                            isOpen={this.state.isOpenModalProduct}
                            toggleProduct={this.toggleProductModal}

                            createNewsModal={this.createNewsModal}

                            errMessage={this.state.errMessage}
                            errCode={this.state.errCode}

                            handleEditNews={this.handleEditNews}

                        />

                        {this.state.isOpenModalEditProduct && <ModalEditNews
                            isOpen={this.state.isOpenModalEditProduct}
                            toggleProductEdit={this.toggleProductModalEdit}

                            editNews={this.editNewsModal}
                            arrNewsEdit={this.state.arrNewsFromParent}

                            errMessage={this.state.errMessage}
                            errCode={this.state.errCode}
                        />}


                        <div className='header-listproduct'>
                            <button className='button-add' type="button"
                                onClick={() => this.handleCreateNewCate()}
                            >
                                <i className='fa fa-plus '> Add New News</i>
                            </button>

                            <h2>List News</h2>
                        </div>

                        <div className="table-wrapper">
                            <table className="fl-table">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Content</th>
                                        <th>Picture</th>
                                        <th>Name User</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        arrNews && arrNews.map((item, index) => {

                                            return (
                                                <>
                                                    <tr>

                                                        <td >{item.id}</td>
                                                        <td >{item.name}</td>
                                                        <td>{item.content}</td>
                                                        <td>{item.picture}</td>
                                                        <td>{item.id_user}</td>

                                                        <td>
                                                            <button
                                                                onClick={() => { this.handleEditNews(item) }}
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

export default connect(mapStateToProps, mapDispatchToProps)(NewsManage);
