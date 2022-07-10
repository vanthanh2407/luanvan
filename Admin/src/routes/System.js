import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch, BrowserRouter } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import CateManage from '../containers/Category/CateManage';
import BannerManage from '../containers/Banner/BannerManage';
import CommentManage from '../containers/Comment/CommentManage';
import CouponManage from '../containers/Coupon/CouponManage';
import NewsManage from '../containers/News/NewsManage';
import ReceiptManage from '../containers/Receipt/ReceiptManage';
import SupplierManage from '../containers/Supplier/SupplierManage';
import UserManageReal from '../containers/User/UserManage';


import Header from '../containers/Header/Header';
import ProductManage from '../containers/System/ProductManage';
import RegisterPackageGroupOrAcc from '../containers/System/RegisterPackageGroupOrAcc';

class System extends Component {
    render() {
        const { systemMenuPath } = this.props;
        return (
            <div className="system-container">
                <div className="system-list">

                    <BrowserRouter>
                        <Switch>
                            <Route path="/system/user-manage" component={UserManage} />
                            <Route path="/system/product-manage" component={ProductManage} />
                            <Route path="/system/cate-manage" component={CateManage} />
                            <Route path="/system/banner-manage" component={BannerManage} />
                            <Route path="/system/comment-manage" component={CommentManage} />
                            <Route path="/system/coupon-manage" component={CouponManage} />
                            <Route path="/system/news-manage" component={NewsManage} />
                            <Route path="/system/receipt-manage" component={ReceiptManage} />
                            <Route path="/system/supplier-manage" component={SupplierManage} />
                            <Route path="/system/usereal-manage" component={UserManageReal} />


                            <Route path="/system/register-package-group-or-account" component={RegisterPackageGroupOrAcc} />
                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </BrowserRouter>

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
