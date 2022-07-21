import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';

import { getAlluser } from '../../services/userService';
import { getAllPermiss } from '../../services/permissService';
// import { db, storage } from '../../firebaseConnect';
// import { doc, setDoc } from "firebase/firestore";
// import { ref, uploadBytesResumable, getDownloadURL, listAll, list, uploadBytes } from "firebase/storage";
// import { v4 } from "uuid";

// import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './ModelCreateStaff.scss'
class ModalCreateStaff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUser: [],
            arrPermiss: [],
            isOpen: false,


            firstname: null, //firstname, lastname, email, phone, pwd, address, gender, id_permission
            lastname: null,
            email: null,
            phone: null,
            pwd: null,
            address: null,
            gender: null,
            id_permission: '',
        }
    }

    async componentDidMount() {
        let resPermiss = await getAllPermiss();
        let resopnse = await getAlluser();

        if (resopnse && resopnse.errCode === 0) {
            this.setState({
                arrUser: resopnse.user
            })
        }
        if (resPermiss && resPermiss.errCode === 0) {
            this.setState({
                arrPermiss: resPermiss.permiss
            })
        }


    }
    toggle = () => {
        this.props.toggleProduct();
    }



    checkValueInput = () => {
        let isValid = true;
        let arrCheck = ['firstname', 'lastname', 'email', 'phone', 'pwd', 'address', 'gender', 'id_permission']

        for (let i = 0; i < arrCheck.length; i++) {

            if (!this.state[arrCheck[i]]) {
                isValid = false;

                alert('This input is required: ' + arrCheck[i]);
                break;
            }

        }
        return isValid;
    }


    handleAddnew = async () => {
        let isValid = this.checkValueInput();
        if (isValid === true) {
            this.props.createUserModal(this.state)
        }
    }
    onChageInput = (event, id) => {
        let copystate = { ...this.state }
        copystate[id] = event.target.value;
        this.setState({
            ...copystate
        })
    }

    render() {
        let { firstname, lastname, email, phone, pwd, address, gender, id_permission, arrPermiss } = this.state;


        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                size="lg"

            >
                <ModalHeader toggle={() => { this.toggle() }}
                >
                    Create new Staff
                </ModalHeader>
                <ModalBody>

                    <div className="wrapper">
                        <div className="container">
                            <form action="">
                                <div className="name">
                                    <div>
                                        <label for="l-name">First Name</label>
                                        <input type="text" name="l-name"
                                            value={firstname}
                                            onChange={(event) => { this.onChageInput(event, 'firstname') }}
                                        />
                                    </div>
                                    <div className="street">
                                        <label for="name">Last Name</label>
                                        <input type="text" name="address"
                                            value={lastname}
                                            onChange={(event) => { this.onChageInput(event, 'lastname') }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label for="f-name">Password</label>
                                    <input type="password" name="f-name"
                                        value={pwd}
                                        onChange={(event) => { this.onChageInput(event, 'pwd') }}
                                    />
                                </div>
                                <div className="name">
                                    <div>
                                        <label for="l-name">Email</label>
                                        <input type="text" name="l-name"
                                            value={email}
                                            onChange={(event) => { this.onChageInput(event, 'email') }}
                                        />
                                    </div>
                                    <div className="street">
                                        <label for="name">Phone</label>
                                        <input type="text" name="address"
                                            value={phone}
                                            onChange={(event) => { this.onChageInput(event, 'phone') }}
                                        />
                                    </div>
                                </div>
                                <div className="address-info">
                                    <div>
                                        <label for="city">Address</label>
                                        <input type="text" name="city"
                                            value={address}
                                            onChange={(event) => { this.onChageInput(event, 'address') }}
                                        />
                                    </div>
                                    <div>
                                        <label for="city">Gender</label>
                                        <select className='form-control'
                                            value={gender}
                                            onChange={(event) => { this.onChageInput(event, 'gender') }}
                                        >

                                            <option value='0'>Nam</option>
                                            <option value='1'>Nữ</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label for="zip">Permission</label>
                                        <select className='form-control'
                                            value={id_permission}
                                            onChange={(event) => { this.onChageInput(event, 'id_permission') }}
                                        >

                                            {
                                                arrPermiss && arrPermiss.map((item, index) => {

                                                    return (

                                                        <>
                                                            <option value={item.id}>{item.permission}</option>
                                                        </>
                                                    )
                                                })

                                            }
                                        </select>
                                    </div>

                                </div>

                                <div className="btns">

                                </div>
                            </form>

                        </div>



                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => { this.handleAddnew(); }}
                    >
                        Add new
                    </Button>
                    {' '}
                    <Button onClick={() => { this.toggle() }}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateStaff);
