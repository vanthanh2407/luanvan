import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input } from 'reactstrap';
import { getAllBooks } from '../../services/productService';

import { getAllCate, createCate, deleteCate, updateCate, FindByIdCate } from '../../services/cateService';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './ModalEditCoupon.scss'
class ModalEditCoupon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrCoupon: [],



            isOpen: false,

            id: this.props.arrCouponEdit.id,
            name: this.props.arrCouponEdit.name,
            date: this.props.arrCouponEdit.date, //name  date	cost describe quantity
            cost: this.props.arrCouponEdit.cost,
            describe: this.props.arrCouponEdit.describe,
            quantity: this.props.arrCouponEdit.quantity,



        }
    }

    async componentDidMount() {
        let resEdit = this.props.arrCouponEdit;

        let resopnse = await getAllCate();

        if (resopnse && resopnse.errCode === 0) {
            this.setState({
                arrCoupon: resopnse.user
            })

        }


        this.setState({
            name: resEdit.name,
            date: resEdit.date, //name  date	cost describe quantity
            cost: resEdit.cost,
            describe: resEdit.describe,
            quantity: resEdit.quantity,
        })


    }
    toggle = () => {
        this.props.toggleProductEdit();
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


    handleUpdate = () => {

        let isValid = this.checkValueInput();
        if (isValid === false) return;

        this.props.editcoupon(this.state)



    }
    onChageInput = (event, id) => {
        let copystate = { ...this.state }
        copystate[id] = event.target.value;
        this.setState({
            ...copystate
        })
    }

    render() {
        let {
            name, date, cost, describe, quantity } = this.state;


        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                size="lg"

            >
                <ModalHeader toggle={() => { this.toggle() }}
                >
                    Edit Coupon
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
                        onClick={() => { this.handleUpdate() }}

                    >
                        Update
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditCoupon);
