import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input } from 'reactstrap';
import { getAllBooks } from '../../services/productService';

import { getAllCate, createCate, deleteCate, updateCate, FindByIdCate } from '../../services/cateService';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './ModalEditBanner.scss'
class ModalEditBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrCategory: [],

            arrProduct: [],

            isOpen: false,

            id: this.props.arrBannerEdit.id,
            picture: this.props.arrBannerEdit.picture,
            id_product: this.props.arrBannerEdit.id_product,



        }
    }

    async componentDidMount() {
        let resEdit = this.props.arrBannerEdit;
        let resProduct = await getAllBooks();
        let resopnse = await getAllCate();

        if (resopnse && resopnse.errCode === 0) {
            this.setState({
                arrCategory: resopnse.user
            })

        }
        if (resProduct && resProduct.errCode === 0) {
            this.setState({
                arrProduct: resProduct.product
            })
        }

        this.setState({
            picture: resEdit.picture,
            id_product: resEdit.id_product

        })


    }
    toggle = () => {
        this.props.toggleProductEdit();
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


    handleUpdate = () => {

        let isValid = this.checkValueInput();
        if (isValid === false) return;

        this.props.editBanner(this.state)



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
            picture, id_product } = this.state;
        let arrProduct = this.state.arrProduct;

        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                size="lg"

            >
                <ModalHeader toggle={() => { this.toggle() }}
                >
                    Edit Banner
                </ModalHeader>
                <ModalBody>

                    <div className="wrapper">
                        <div className="container">
                            <form action="">
                                <div className='preview-image-container'>
                                    <label for="card-num">Image</label>
                                    <input type="file"
                                        // value={picture}
                                        onChange={(event) => this.handleOnchangeImage(event)}

                                    />
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImageURL})` }}
                                        onClick={() => this.openPreviewImage()}

                                    >

                                    </div>

                                </div>
                                <div>
                                    <label for="card-num">Id Product</label>
                                    <select className='form-control'
                                        value={id_product}
                                        onChange={(event) => { this.onChageInput(event, 'id_product') }}
                                    >

                                        {
                                            arrProduct && arrProduct.map((item, index) => {

                                                return (

                                                    <>
                                                        <option value={item.id}>{item.id}</option>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditBanner);
