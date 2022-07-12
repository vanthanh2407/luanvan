import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input } from 'reactstrap';

import { getAllSupplier, createSupplier, deleteSupplier, updateSupplier } from '../../services/supplierService';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './ModelEditSupplier.scss'
class ModalEditSupplier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrSupplier: [],

            arrProductFromParent: [],

            isOpen: false,

            id: this.props.arrSupplierEdit.id,
            name: this.props.arrSupplierEdit.name, //name picture phone address email arrSupplierEdit
            picture: this.props.arrSupplierEdit.picture,
            phone: this.props.arrSupplierEdit.phone,
            address: this.props.arrSupplierEdit.address,
            email: this.props.arrSupplierEdit.email,




        }
    }

    async componentDidMount() {
        let resEdit = this.props.arrSupplierEdit;

        let resopnse = await getAllSupplier();

        if (resopnse && resopnse.errCode === 0) {
            this.setState({
                arrSupplier: resopnse.supplier
            })

        }

        this.setState({
            name: resEdit.name, //name picture phone address email
            picture: resEdit.picture,
            phone: resEdit.phone,
            address: resEdit.address,
            email: resEdit.email,
        })


    }
    toggle = () => {
        this.props.toggleProductEdit();
    }


    checkValueInput = () => {
        let isValid = true;
        let arrCheck = ['name', 'phone', 'address', 'email']

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

        this.props.editSupplier(this.state)



    }
    onChageInput = (event, id) => {
        let copystate = { ...this.state }
        copystate[id] = event.target.value;
        this.setState({
            ...copystate
        })
    }

    render() {
        let { name, picture, phone, address, email } = this.state;

        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                size="lg"

            >
                <ModalHeader toggle={() => { this.toggle() }}
                >
                    Edit Supplier
                </ModalHeader>
                <ModalBody>
                    {/* <div className='body'></div> */}
                    <div className="wrapper">
                        <div className="container">
                            <form action="">
                                <div className="address-info">
                                    <div>
                                        <label for="city">Name</label>
                                        <input type="text" name="city"
                                            value={name}
                                            onChange={(event) => { this.onChageInput(event, 'name') }}
                                        />
                                    </div>
                                    <div>
                                        <label for="city">Phone</label>
                                        <input type="text" name="city"
                                            value={phone}
                                            onChange={(event) => { this.onChageInput(event, 'phone') }}
                                        />
                                    </div>

                                    <div>
                                        <label for="zip">Address</label>
                                        <input type="text" name="zip"
                                            value={address}
                                            onChange={(event) => { this.onChageInput(event, 'address') }}
                                        />
                                    </div>
                                </div>
                                <div className="name">
                                    <div>
                                        <label for="city">Email</label>
                                        <input type="text" name="city"
                                            value={email}
                                            onChange={(event) => { this.onChageInput(event, 'email') }}
                                        />
                                    </div>
                                    <div>
                                        <label for="city">Image</label>
                                        <input type="file"
                                            // value={picture}
                                            onChange={(event) => this.handleOnchangeImage(event)}

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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditSupplier);
