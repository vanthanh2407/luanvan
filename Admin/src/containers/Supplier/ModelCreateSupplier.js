import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';

import { getAllSupplier } from '../../services/supplierService';
// import { db, storage } from '../../firebaseConnect';
// import { doc, setDoc } from "firebase/firestore";
// import { ref, uploadBytesResumable, getDownloadURL, listAll, list, uploadBytes } from "firebase/storage";
// import { v4 } from "uuid";

// import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './ModelCreateSupplier.scss'
class ModalCreateSupplier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrSupplier: [],


            isOpen: false,


            name: null, //name picture phone address email
            picture: null,
            phone: null,
            address: null,
            email: null,

        }
    }

    async componentDidMount() {

        let resopnse = await getAllSupplier();

        if (resopnse && resopnse.errCode === 0) {
            this.setState({
                arrSupplier: resopnse.supplier
            })

        }



    }
    toggle = () => {
        this.props.toggleProduct();
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


    handleAddnew = async () => {
        let isValid = this.checkValueInput();
        if (isValid === true) {
            this.props.createSupplierModal(this.state)
        }
    }
    onChageInput = (event, id) => {
        let copystate = { ...this.state }
        copystate[id] = event.target.value;
        this.setState({
            ...copystate
        })
    }
    // upLoadImage = () => {
    //     // imageUpload: null,
    //     // setImageUpload: null,

    //     // fileUrl: [],
    //     // setFileUrl: [],
    //     if (this.state.imageUpload === null) return;
    //     const imageREf = ref(storage, `images/${this.state.imageUpload.name + v4()}`);
    //     uploadBytes(imageREf, this.state.imageUpload).then(() => {
    //         console.log('check upload anh', imageREf)
    //     })

    // }

    render() {
        let {
            name, picture, phone, address, email } = this.state;
        // console.log('check anh: ', imageREf)
        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                size="lg"

            >
                <ModalHeader toggle={() => { this.toggle() }}
                >
                    Create new Suplier
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateSupplier);
