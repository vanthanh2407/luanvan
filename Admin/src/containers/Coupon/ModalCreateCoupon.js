import React, { useEffect, Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input } from 'reactstrap';
import { getAllBooks } from '../../services/productService';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";


import { getAllcoupon, createcoupon, deletecoupon, updatecoupon } from '../../services/couponService';
import { db, storage } from '../../firebaseConnect';
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, listAll, list, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './ModalCreateCoupon.scss'
class ModalCreateCoupon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrCoupon: [],


            isOpen: false,


            name: null,
            date: null, // name  date	cost describe quantity
            cost: null,
            describe: null,
            quantity: null,

        }
    }

    async componentDidMount() {

        let resopnse = await getAllcoupon();


        if (resopnse && resopnse.errCode === 0) {
            this.setState({
                arrCoupon: resopnse.user
            })
        }




    }
    toggle = () => {
        this.props.toggleProduct();
    }



    checkValueInput = () => {
        let isValid = true;
        let arrCheck = ['name', 'cost', 'describe', 'quantity']

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
            this.props.createcouponModal(this.state)
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
        let { name, date, cost, describe, quantity } = this.state;
        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                size="lg"

            >
                <ModalHeader toggle={() => { this.toggle() }}
                >
                    Create new Coupon
                </ModalHeader>
                <ModalBody>

                    <div className="wrapper">
                        <div className="container">
                            <form action="">
                                <div className="name">
                                    <div>
                                        <label for="city">Name</label>
                                        <input type="text" name="city"
                                            value={name}
                                            onChange={(event) => { this.onChageInput(event, 'name') }}
                                        />
                                    </div>
                                    {/* <div>
                                        <label for="city">Date</label>
                                        <Datetime
                                            // value={date}
                                            onChange={(event) => { this.onChageInput(event, 'date') }} />
                                    </div> */}

                                    <div>
                                        <label for="zip">Cost</label>
                                        <input type="text" name="zip"
                                            value={cost}
                                            onChange={(event) => { this.onChageInput(event, 'cost') }}
                                        />
                                    </div>

                                </div>
                                <div className="name">
                                    <div>
                                        <label for="city">Describe</label>
                                        <input type="text" name="city"
                                            value={describe}
                                            onChange={(event) => { this.onChageInput(event, 'describe') }}
                                        />
                                    </div>
                                    <div>
                                        <label for="city">Quantity</label>
                                        <input type="text" name="city"
                                            value={quantity}
                                            onChange={(event) => { this.onChageInput(event, 'quantity') }}
                                        />
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateCoupon);
