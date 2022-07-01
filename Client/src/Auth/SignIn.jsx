// import React, { useState } from 'react';
import React, { Component,useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import queryString from 'query-string'
import User from '../API/User';
import { handleLoginApi } from '../API/User';
import { useDispatch, useSelector } from 'react-redux';
import { addSession } from '../Redux/Action/ActionSession';
import Cart from '../API/CartAPI';
import { changeCount } from '../Redux/Action/ActionCount';


    class SignIn extends Component {
        constructor(props) {
            super(props);
            this.state = {
                email: '',
                pwd: '',
                isShowpwd: false,
                errMessage: '',
                redirect: false,
                
            }
    
        }
    
        handleOnChangeEmail = (event) => {
            this.setState({
                email: event.target.value
            })
        }
        handleOnChangepwd = (event) => {
            this.setState({
                pwd: event.target.value
            })
        }
        handleShowHidepwd = () => {
            this.setState({
                isShowpwd: !this.state.isShowpwd
            })
    
        }
        // const count_change = useSelector(state => state.Count.isLoad)
        // const [redirect, set_redirect] = useState(false)

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
                    // const action = addSession(data.id)
                    // dispatch(action)

                    // sessionStorage.setItem('id_user', data.id)
                    
                    // const action_count_change = changeCount(count_change)
                    // dispatch(action_count_change)

                    // set_redirect(true)
                }
            } catch (error) {
                console.log(error);
            }
        }
    
    render() {
        return (
            <div>
                <div className="breadcrumb-area">
                    <div className="container">
                        <div className="breadcrumb-content">
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li className="active">Login</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="page-section mb-60">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-md-12 col-xs-12 col-lg-6 mb-30 mr_signin">
                                <form action="#" >
                                    <div className="login-form">
                                        <h4 className="login-title">Login</h4>
                                        <div className="row">
                                            <div className="col-md-12 col-12 mb-20">
                                                <label>email *</label>
                                                {/* <input className="mb-0" type="text" placeholder="email" value={this.state.email} onChange={(e) => set_email(e.target.value)} />
                                                {
                                                    error_email && <span style={{ color: 'red' }}>* Your Email not exist!</span>
                                                } */}
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter your email"
                                                    value={this.state.email}
                                                    onChange={(event) => this.handleOnChangeEmail(event)}
                                                />
                                            </div>
                                            <div className="col-12 mb-20">
                                                <label>pwd</label>
                                                {/* <input className="mb-0" type="pwd" placeholder="pwd" value={this.state.pwd} onChange={(e) => set_pwd(e.target.value)} />
                                                {
                                                    error_pwd && <span style={{ color: 'red' }}>* Wrong pwd!</span>
                                                } */}
                                                <div className="custom-input-pwd">
                                                    <input
                                                        className="form-control"
                                                        placeholder="Enter your pwd"
                                                        // type={this.state.isShowpwd ? 'text' : 'pwd'}
                                                        type="pwd"
                                                        value={this.state.pwd}
                                                        onChange={(event) => this.handleOnChangepwd(event)}
                                                    /> 
                                                     {/* <span onClick={() => this.handleShowHidepwd()} >
                                                        <i className={this.state.isShowpwd ? "far fa-eye" : "fas fa-eye-slash"} ></i>
                                                    </span> */}
                                                </div>
                                            </div>
                                            <div className="col-12" style={{ color: 'red' }}>
                                                {this.state.errMessage}
                                            </div>
                                            <div className="col-md-8">
                                                <div className="check-box d-inline-block ml-0 ml-md-2 mt-10">
                                                    <Link to="/signup">Do You Have Account?</Link>
                                                </div>
                                            </div>
                                            <div className="col-md-4 mt-10 mb-20 text-left text-md-right">
                                                <a href="#"> Forgotten pasward?</a>
                                            </div>
                                            <div className="col-md-12">
                                                {
                                                    // redirect && <Redirect to="/" />
                                                }
                                                <button className="register-button mt-0" style={{ cursor: 'pointer'}} onClick={() => this.handler_signin()}>Login</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignIn;

// SignIn.propTypes = {
    
// };

// function SignIn(props) {

//     const dispatch = useDispatch()

//     const [email, set_email] = useState('')
//     const [pwd, set_pwd] = useState('')

//     const [error_email, set_error_email] = useState(false)
//     const [error_pwd, set_error_pwd] = useState(false)

//     const [redirect, set_redirect] = useState(false)

//     // Get carts từ redux khi user chưa đăng nhập
//     const carts = useSelector(state => state.Cart.listCart)

//     // Get isLoad từ redux để load lại phần header
//     const count_change = useSelector(state => state.Count.isLoad)

//     const handler_signin = (e) => {

//         e.preventDefault()

//         const fetchData = async () => {

//             const params = {
//                 email,
//                 pwd
//             }

//             // const query = '?' + queryString.stringify(params)

//             const response = await User.handleLoginApi(this.state.email, this.state.pwd)

//             if (response === "Your Email not exist!"){
//                 set_error_email(true)
//             }else{
//                 if (response === "Wrong password"){
//                     set_error_email(false)
//                     set_error_pwd(true)
//                 }else{

//                    console.log(response)

//                     const action = addSession(response._id)
//                     dispatch(action)

//                     sessionStorage.setItem('id_user', response._id)
                    
//                     const action_count_change = changeCount(count_change)
//                     dispatch(action_count_change)

//                     set_redirect(true)

//                 }
//             }

//         }

//         fetchData()

//     }

//     return (
//         <div>
//             <div className="breadcrumb-area">
//                 <div className="container">
//                     <div className="breadcrumb-content">
//                         <ul>
//                             <li><Link to="/">Home</Link></li>
//                             <li className="active">Login</li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//             <div className="page-section mb-60">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-sm-12 col-md-12 col-xs-12 col-lg-6 mb-30 mr_signin">
//                             <form action="#" >
//                                 <div className="login-form">
//                                     <h4 className="login-title">Login</h4>
//                                     <div className="row">
//                                         <div className="col-md-12 col-12 mb-20">
//                                             <label>email *</label>
//                                             <input className="mb-0" type="text" placeholder="email" value={this.state.email} onChange={(e) => set_email(e.target.value)} />
//                                             {
//                                                 error_email && <span style={{ color: 'red' }}>* Wrong email!</span>
//                                             }
//                                         </div>
//                                         <div className="col-12 mb-20">
//                                             <label>pwd</label>
//                                             <input className="mb-0" type="pwd" placeholder="pwd" value={this.state.pwd} onChange={(e) => set_pwd(e.target.value)} />
//                                             {
//                                                 error_pwd && <span style={{ color: 'red' }}>* Wrong pwd!</span>
//                                             }
//                                         </div>
//                                         <div className="col-md-8">
//                                             <div className="check-box d-inline-block ml-0 ml-md-2 mt-10">
//                                                 <Link to="/signup">Do You Have Account?</Link>
//                                             </div>
//                                         </div>
//                                         <div className="col-md-4 mt-10 mb-20 text-left text-md-right">
//                                             <a href="#"> Forgotten pasward?</a>
//                                         </div>
//                                         <div className="col-md-12">
//                                             {
//                                                 redirect && <Redirect to="/" />
//                                             }
//                                             <button className="register-button mt-0" style={{ cursor: 'pointer'}} onClick={handler_signin}>Login</button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default SignIn;