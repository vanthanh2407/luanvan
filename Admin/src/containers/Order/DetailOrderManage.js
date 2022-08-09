import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { getAllOrder } from '../../services/orderService';

import { getAllStatus } from '../../services/statusService';
import { getAllDetailOrder } from '../../services/orderService';


import 'react-image-lightbox/style.css';
import './DetailOrderManage.scss'
class DetailOrderManage extends Component {
    constructor(props) {
        super(props);
        this.state = {

            arrdetail: [],
            arroder: [],

        }
    }

    async componentDidMount() {
        let resDetail = await getAllDetailOrder(this.props.idOrder)
        this.setState({
            arrdetail: resDetail
        })
        console.log('check id order', resDetail)


    }
    toggle = () => {
        this.props.toggleDetailOrder();
    }


    checkValueInput = () => {
        // let isValid = true;
        // let arrCheck = ['id_status']

        // for (let i = 0; i < arrCheck.length; i++) {

        //     if (!this.state[arrCheck[i]]) {
        //         isValid = false;

        //         alert('This input is required: ' + arrCheck[i]);
        //         break;
        //     }

        // }
        // return isValid;
    }


    handleUpdate = () => {

        // let isValid = this.checkValueInput();
        // if (isValid === false) return;

        // this.props.editOrder(this.state)



    }
    onChageInput = (event, id) => {
        // let copystate = { ...this.state }
        // copystate[id] = event.target.value;
        // this.setState({
        //     ...copystate
        // })
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
                    Detail Order
                </ModalHeader>
                <ModalBody>

                    <table class="table">
                        <tr>
                            {/* <th >Mã</th> */}

                            <th>Product</th>
                            <th>Count</th>
                            <th className='detailSpace'>Price</th>
                            {/* <th>Oder</th> */}
                            <th className='cssDetail'>Total</th>


                        </tr>
                        {this.state.arrdetail.map(item => {
                            // if (arroder.id === item.idoder)
                            return (
                                <tr>
                                    {/* <td>{item.id}</td> */}

                                    <td>{item.name.substring()}</td>
                                    <td className='cssDetail'>{item.quantity}</td>
                                    <td className='detailSpaceMap'>{new Intl.NumberFormat('vi-VN', { style: 'decimal', decimal: 'VND' }).format(item.price)}</td>
                                    {/* <td>{item.id_order}</td> */}
                                    <td className='detailSpaceMap'>{new Intl.NumberFormat('vi-VN', { style: 'decimal', decimal: 'VND' }).format(item.total)}</td>
                                </tr>
                            )
                        })}
                    </table>
                </ModalBody>
                <ModalFooter>
                    {/* <Button
                        color="primary"
                        onClick={() => { this.handleUpdate() }}

                    >
                        Update
                    </Button> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailOrderManage);
