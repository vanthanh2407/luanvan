import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import { handleLoginApi } from '../../services/productService';
import './Login.scss';
// import { FormattedMessage } from 'react-intl';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pwd: '',
            isShowPassword: false,
            errMessage: '',
        }

    }

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handleOnChangePassword = (event) => {
        this.setState({
            pwd: event.target.value
        })
    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })

    }
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.email, this.state.pwd);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {


        return (
            <div >
                <div className='bodylogin'></div>
                <div className="materialContainer"  >
                    <div className="box">
                        <div className="title">LOGIN</div>
                        <div>
                            <label htmlFor="name" className='font-size'>Your Email:</label>
                            <div className="input">
                                <input type="text" name="name" id="name" placeholder="Enter your email" value={this.state.email}
                                    onChange={(event) => this.handleOnChangeEmail(event)} />
                                <span className="spin"></span>
                            </div>
                        </div>
                        <div className='password'>
                            <label htmlFor="pass" className='font-size'>Password:</label>
                            <div className="input">
                                <input type="password" name="pass" id="pass" placeholder="Enter your password" value={this.state.pwd} onChange={(event) => this.handleOnChangePassword(event)} />
                                <span className="spin"></span>
                            </div>
                        </div>


                        <div className="button login">
                            <button onClick={() => this.handleLogin()}><span>Đăng Nhập</span> <i className="fa fa-check"></i></button>
                        </div>
                        <div className="col-12" style={{ color: 'red', fontSize: 20 }}>
                            {this.state.errMessage}
                        </div>
                        <a href="" className="pass-forgot">Forgot your password?</a>
                    </div>
                </div>


            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
