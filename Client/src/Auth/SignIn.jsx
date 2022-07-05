import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import queryString from 'query-string'
import User from '../API/User';
import { useDispatch, useSelector } from 'react-redux';
import { addSession } from '../Redux/Action/ActionSession';
import Cart from '../API/CartAPI';
import { changeCount } from '../Redux/Action/ActionCount';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// import isEmpty from 'validator/lib/isEmpty'


SignIn.propTypes = {
    
};
// const uiConfig = {
//     signInFlow: 'redirect',
//     signInSuccessUrl: '/photos',
//     signInOptions: [
//       firebase.auth.GoogleAuthProvider.PROVIDER_ID
//     ],
//   };
function SignIn(props) {

    const dispatch = useDispatch()

    const [email, set_email] = useState('')
    const [pwd, set_password] = useState('')

    const [error_email, set_error_email] = useState(false)
    const [error_password, set_error_password] = useState(false)
    // const [error_message, set_error_message] = useState(false)
    // const [validationMsg, setValidationMsg] = useState('');

    const [redirect, set_redirect] = useState(false)

    // Get carts từ redux khi user chưa đăng nhập
    const carts = useSelector(state => state.Cart.listCart)

    // Get isLoad từ redux để load lại phần header
    const count_change = useSelector(state => state.Count.isLoad)
    // const validateAll = () => {
    //     const priceRegex = /^[1-9](?=.+[0-9]).{0,}$/
    //     let msg = {}
       
    //     if (isEmpty(email)) {
    //         msg.price = "Email is require!"
    //     } else if (!priceRegex.test(price)) {
    //         msg.price = "Giá sai định dạng"
    //     }
    //     if (isEmpty(pwd)) {
    //         msg.description = "Password is require!"
    //     }

    //     setValidationMsg(msg)
    //     if (Object.keys(msg).length > 0) return false;
    //     return true;
    // }

    const handler_signin = (e) => {

        e.preventDefault()

        const fetchData = async () => {

            // const params = {
            //     email,
            //     pwd
            // }

            // const query = '?' + queryString.stringify(params)

            const response = await User.Get_Detail_User(email, pwd)
            console.log(response)
            try{
                if (response && response.errCode === 1){
                    set_error_email(true)
                }else{
                    if (response && response.errCode === 3){
                        set_error_email(false)
                        set_error_password(true)
                    }if(response && response.errCode === 0){

                    console.log(response)

                        const action = addSession(response.user.id)
                        dispatch(action)

                        sessionStorage.setItem('id_user', response.user.id)
                        
                        const action_count_change = changeCount(count_change)
                        dispatch(action_count_change)

                        set_redirect(true)

                    }
                }
            }catch(e){
                console.log(e);
            }

        }

        fetchData()

    }

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
                                            <label>Email *</label>
                                            <input className="mb-0" type="text" placeholder="Email" value={email} onChange={(e) => set_email(e.target.value)} />
                                            {
                                                error_email && <span style={{ color: 'red' }}>* Wrong email!</span>
                                            }
                                        </div>
                                        <div className="col-12 mb-20">
                                            <label>Password *</label>
                                            <input className="mb-0" type="password" placeholder="Password" value={pwd} onChange={(e) => set_password(e.target.value)} />
                                            {
                                                error_password && <span style={{ color: 'red' }}>* Wrong Password!</span>
                                            }
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
                                                redirect && <Redirect to="/" />
                                            }
                                            <button className="register-button mt-0" style={{ cursor: 'pointer'}} onClick={handler_signin}>Login</button>
                                        </div>
                                        {/* <div className="col-md-12">
                                            <StyledFirebaseAuth
                                                uiConfig={uiConfig}
                                                firebaseAuth={firebase.auth()}
                                            />
                                        </div> */}
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

export default SignIn;