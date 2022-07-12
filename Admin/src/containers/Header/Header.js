import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from "lodash";

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
// import { USER_ROLE } from '../../utils/constant';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            meneApp: []
        }
    }

    componentDidMount() {
        // let { userInfo } = this.props;
        // if (userInfo && !_.isEmpty(userInfo)) {
        //     let role = userInfo.id_permission;
        //     if (role === USER_ROLE.ADMIN) {
        //         <Navigator></Navigator>
        //     }
        //     if (role === USER_ROLE.STAFF) {

        //     }
        //     if (role === USER_ROLE.CUSTOMER) {

        //     }
        // }
    }
    render() {
        const { processLogout, userInfo } = this.props;

        console.log('check user: ', userInfo)
        return (
            <div className="header-container">
                <div className='hello'>
                    <span className='welcome'> Xin chào, {userInfo && userInfo.firstname ? userInfo.firstname : ""}</span>
                </div>
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator />
                    {/* menus={adminMenu} */}
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.admin.isLoggedIn,
        userInfo: state.admin.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
