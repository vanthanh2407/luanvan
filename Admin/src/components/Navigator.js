import React, { Component, Fragment } from 'react';
import { Link, NavLink, withRouter, BrowserRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../store/actions";

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
        const { menus, location, onLinkClick, processLogout } = this.props;
        return (
            <div>
                <details>
                    <summary></summary>
                    <nav className="menu">
                        <NavLink to="/" activeClassName='active' exact={true}>Home</NavLink>
                        <NavLink to="/product" activeClassName='active' >Product</NavLink>
                        <NavLink to="/category" activeClassName='active' >Category</NavLink>
                        <NavLink to="/banner" activeClassName='active' >Banner</NavLink>
                        <NavLink to="/news" activeClassName='active' >News</NavLink>
                        <NavLink to="/comment" activeClassName='active' >Comment</NavLink>
                        <NavLink to="/user" activeClassName='active' >User</NavLink>
                        <NavLink to="/order" activeClassName='active' >Order</NavLink>
                        <NavLink to="/coupon" activeClassName='active' >Coupon</NavLink>
                        <NavLink to="/supplier" activeClassName='active' >Supplier</NavLink>
                        <NavLink to="/receipt" activeClassName='active' >Receipt</NavLink>





                        {/* <a href="/">Home</a>
                        <a href="/product">Product</a>
                        <a href="/category">Category</a>
                        <a href="/banner">Banner</a>
                        <a href="/news">News</a>
                        <a href="/comment">Comment</a>
                        <a href="/user">User</a>
                        <a href="/order">Order</a>
                        <a href="/coupon">Coupon</a>
                        <a href="/supplier">Supplier</a>
                        <a href="/receipt">Receipt</a> */}
                        <a>
                            <div className="btn btn-logout" onClick={processLogout}>
                                <i className="fas fa-sign-out-alt"></i>
                            </div>
                        </a>
                    </nav>
                </details>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    }
}

export default withRouterInnerRef(connect(mapStateToProps, mapDispatchToProps)(Navigator));