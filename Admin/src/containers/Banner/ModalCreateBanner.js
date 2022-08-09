import React, { useEffect, Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input } from 'reactstrap';
import { getAllBooks } from '../../services/productService';


import { getAllBanner, createBanner, deleteBanner, updateBanner, FindByIdBanner } from '../../services/bannerService';
import { db, storage } from '../../firebaseConnect';
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, listAll, list, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './ModalCreateBanner.scss'
class ModalCreateBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrBanner: [],

            arrProduct: [],

            isOpen: false,


            picture: null,
            id_product: null
        }
    }

    async componentDidMount() {

        let resopnse = await getAllBanner();
        let resProduct = await getAllBooks();

        if (resopnse && resopnse.errCode === 0) {
            this.setState({
                arrBanner: resopnse.banner
            })
        }
        if (resProduct) {
            this.setState({
                arrProduct: resProduct
            })
        }



    }
    toggle = () => {
        this.props.toggleProduct();
    }



    checkValueInput = () => {
        let isValid = true;
        let arrCheck = ['id_product']

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
            this.props.createBannerModal(this.state)
        }
    }
    onChageInput = (event, id) => {
        let copystate = { ...this.state }
        copystate[id] = event.target.value;
        this.setState({
            ...copystate
        })
    }
    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {

            // console.log('check image: ', base64)
            let objectURL = URL.createObjectURL(file);
            this.setState({
                previewImageURL: objectURL,
                picture: file
            })
        }

    }

    render() {
        let arrProduct = this.state.arrProduct;
        let {
            picture, id_product } = this.state;

        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                size="lg"

            >
                <ModalHeader toggle={() => { this.toggle() }}
                >
                    Create new Banner
                </ModalHeader>
                <ModalBody>

                    <div className="wrapper">
                        <div className="container">
                            <form action="">
                                <div className="name">
                                    <div className='preview-image-container'>
                                        <label for="card-num">Image</label>
                                        <input type="file"
                                            // value={picture}
                                            onChange={(event) => this.handleOnchangeImage(event)}

                                        />
                                        <div className='preview-image'
                                            style={{ backgroundImage: `url(${this.state.previewImageURL})` }}


                                        >

                                        </div>

                                    </div>
                                    <div>
                                        <label for="card-num">Name Product</label>
                                        <select className='form-control'
                                            value={id_product}
                                            onChange={(event) => { this.onChageInput(event, 'id_product') }}
                                        >

                                            {
                                                arrProduct && arrProduct.map((item, index) => {

                                                    return (

                                                        <>
                                                            <option value={item.id}>{item.name.substring(0, 40) + "..."}</option>
                                                        </>
                                                    )
                                                })

                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="btns">
                                    {/* <button id='new' hidden
                                        onClick={() => { this.testHandle(); alert("Hello!"); }}>Purchase</button>
                                    <label className='label-create' htmlFor='new'>Add New</label> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateBanner);
