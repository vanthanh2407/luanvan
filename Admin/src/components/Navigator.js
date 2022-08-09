import React, { Component, Fragment } from 'react';
import { Link, NavLink, withRouter, BrowserRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../store/actions";
import _ from "lodash";

// import * as actions from "../../store/actions";
import { USER_ROLE } from '../utils/constant';

import './Navigator.scss';

class MenuGroup extends Component {

    render() {
        const { name, children } = this.props;
        return (
            <li className="menu-group">
                <div className="menu-group-name">
                    <FormattedMessage id={name} />
                </div>
                <ul className="menu-list list-unstyled">
                    {children}
                </ul>
            </li>
        );
    }
}

class Menu extends Component {

    render() {
        const { name, active, link, children, onClick, hasSubMenu, onLinkClick } = this.props;
        return (
            <li className={"menu" + (hasSubMenu ? " has-sub-menu" : "") + ("") + (active ? " active" : "")}>
                {hasSubMenu ? (
                    <Fragment>
                        <span
                            data-toggle="collapse"
                            className={"menu-link collapsed"}
                            onClick={onClick}
                            aria-expanded={"false"}
                        >
                            <FormattedMessage id={name} />
                            <div className="icon-right">
                                <i className={"far fa-angle-right"} />
                            </div>
                        </span>
                        <div>
                            <ul className="sub-menu-list list-unstyled">
                                {children}
                            </ul>
                        </div>
                    </Fragment>
                ) : (
                    <Link to={link} className="menu-link" onClick={onLinkClick}>
                        <FormattedMessage id={name} />
                    </Link>
                )}
            </li>
        );
    }
}

class SubMenu extends Component {

    getItemClass = path => {
        return this.props.location.pathname === path ? "active" : "";
    };

    render() {
        const { name, link, onLinkClick } = this.props;
        return (
            <li className={"sub-menu " + this.getItemClass(link)}>
                <Link to={link} className="sub-menu-link" onClick={onLinkClick}>
                    <FormattedMessage id={name} />
                </Link>
            </li>
        );
    }
}

const MenuGroupWithRouter = withRouter(MenuGroup);
const MenuWithRouter = withRouter(Menu);
const SubMenuWithRouter = withRouter(SubMenu);

const withRouterInnerRef = (WrappedComponent) => {

    class InnerComponentWithRef extends React.Component {
        render() {
            const { forwardRef, ...rest } = this.props;
            return <WrappedComponent {...rest} ref={forwardRef} />;
        }
    }

    const ComponentWithRef = withRouter(InnerComponentWithRef, { withRef: true });

    return React.forwardRef((props, ref) => {
        return <BrowserRouter><ComponentWithRef {...props} forwardRef={ref} /></BrowserRouter>;
    });
};

class Navigator extends Component {
    state = {
        expandedMenu: {}
    };



    render() {
        const { menus, location, onLinkClick, processLogout, userInfo } = this.props;
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.id_permission;
            if (role === USER_ROLE.ADMIN) {
                return (
                    <div>
                        <div className="container-nav">
                            <div className="card">
                                <div className="header">
                                    <h3>Manager</h3>
                                </div>
                                <div className="body">
                                    <ul>
                                        <li><i className="fas fa-home icon"></i> <a className='disable-gachchan' href='/system/'>Home</a></li>
                                        <li><i className="fas fa-boxes icon"></i> <a className='disable-gachchan' href='/system/product-manage'>Product</a></li>
                                        <li><i className="fas fa-boxes icon"></i> <a className='disable-gachchan' href='/system/cate-manage'>Category</a></li>
                                        <li><i className="fas fa-table icon"></i>  <a className='disable-gachchan' href='/system/banner-manage'>Banner</a></li>
                                        <li><i className="fab fa-wpforms icon"></i> <a className='disable-gachchan' href='/system/news-manage'>News </a></li>
                                        <li><i className="fas fa-comment icon"></i>  <a className='disable-gachchan' href='/system/comment-manage'>Comment</a></li>
                                        <li><i className="fas fa-user-alt icon"></i>  <a className='disable-gachchan' href='/system/user-manage'> User</a></li>
                                        <li><i className="fa fa-indent icon "></i>  <a className='disable-gachchan' href='/system/order-manage'>Order</a></li>
                                        <li><i className="fas fa-gift icon"></i>  <a className='disable-gachchan' href='/system/coupon-manage'>Coupon</a></li>
                                        <li><i className="fas fa-building icon"></i>  <a className='disable-gachchan' href='/system/supplier-manage'>Supplier</a></li>
                                        <li><i className="fas fa-receipt icon"></i> <a className='disable-gachchan' href='/system/receipt-manage'>Receipt</a></li>
                                        <li>
                                            <div className="btn btn-logout" onClick={processLogout}>
                                                <i className="fas fa-sign-out-alt icon"></i>Logout
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                );
            } else if (role === USER_ROLE.STAFF) {
                return (
                    <div>
                        <div className="container-nav">
                            <div className="card">
                                <div className="header">
                                    <h3>Manager</h3>
                                </div>
                                <div className="body">
                                    <ul>
                                        <li><i className="fas fa-home icon"></i> <a className='disable-gachchan' href='/system/'>Home</a></li>
                                        <li><i className="fas fa-boxes icon"></i> <a className='disable-gachchan' href='/system/product-manage'>Product</a></li>
                                        <li><i className="fas fa-boxes icon"></i> <a className='disable-gachchan' href='/system/cate-manage'>Category</a></li>
                                        <li><i className="fas fa-table icon"></i>  <a className='disable-gachchan' href='/system/banner-manage'>Banner</a></li>
                                        <li><i className="fab fa-wpforms icon"></i> <a className='disable-gachchan' href='/system/news-manage'>News </a></li>
                                        <li><i className="fas fa-comment icon"></i>  <a className='disable-gachchan' href='/system/comment-manage'>Comment</a></li>
                                        <li><i className="fas fa-user-alt icon"></i>  <a className='disable-gachchan' href='/system/user-manage'> User</a></li>
                                        <li><i className="fa fa-indent icon "></i>  <a className='disable-gachchan' href='/system/order-manage'>Order</a></li>
                                        <li><i className="fas fa-gift icon"></i>  <a className='disable-gachchan' href='/system/coupon-manage'>Coupon</a></li>

                                        <li><i className="fas fa-receipt icon"></i> <a className='disable-gachchan' href='/system/receipt-manage'>Receipt</a></li>
                                        <li>
                                            <div className="btn btn-logout" onClick={processLogout}>
                                                <i className="fas fa-sign-out-alt icon"></i>Logout
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
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
        processLogout: () => dispatch(actions.processLogout()),
    }
}

export default withRouterInnerRef(connect(mapStateToProps, mapDispatchToProps)(Navigator));