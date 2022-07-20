import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { getAllOrder } from '../../services/orderService';

import { getAllStatus } from '../../services/statusService';


import 'react-image-lightbox/style.css';
import './ModalEditOrder.scss'
class ModalEditOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrOrder: [],
            arrStatus: [],

            arrProductFromParent: [],

            isOpen: false,

            id: this.props.arrOrderEdit.id,
            category: this.props.arrOrderEdit.category,



        }
    }

    async componentDidMount() {
        let resEdit = this.props.arrOrderEdit;
        let resStatus = await getAllStatus();
        let resopnse = await getAllOrder();

        if (resopnse && resopnse.errCode === 0) {
            this.setState({
                arrOrder: resopnse.order
            })
        }
        if (resStatus && resStatus.errCode === 0) {
            this.setState({
                arrStatus: resStatus.status
            })
        }

        this.setState({
            id_status: resEdit.id_status,

        })


    }
    toggle = () => {
        this.props.toggleProductEdit();
    }


    checkValueInput = () => {
        let isValid = true;
        let arrCheck = ['id_status']

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

        this.props.editOrder(this.state)



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
            id_status } = this.state;
        let arrStatus = this.state.arrStatus;


        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                size="lg"

            >
                <ModalHeader toggle={() => { this.toggle() }}
                >
                    Edit Order
                </ModalHeader>
                <ModalBody>
                    {/* <div className='body'></div> */}
                    <div className="wrapper">
                        <div className="container">
                            <form action="">
                                <div>
                                    <label for="f-name">Trạng thái đơn hàng</label>
                                    <select className='form-control'
                                        value={id_status}
                                        onChange={(event) => { this.onChageInput(event, 'id_status') }}
                                    >
                                        {
                                            arrStatus && arrStatus.map((item, index) => {
                                                return (
                                                    <>
                                                        <option value={item.id}>{item.name}</option>
                                                    </>
                                                )
                                            })
                                        }
                                    </select>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditOrder);
