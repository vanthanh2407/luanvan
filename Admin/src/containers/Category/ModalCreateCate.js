import React, { useEffect, Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input } from 'reactstrap';

import { getAllCate, createCate, deleteCate, updateCate, FindByIdCate } from '../../services/cateService';
import { db, storage } from '../../firebaseConnect';
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, listAll, list, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './ModalCreateCate.scss'
class ModalCreateCate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrCategory: [],


            isOpen: false,


            category: null,
        }
    }

    async componentDidMount() {

        let resopnse = await getAllCate();

        if (resopnse && resopnse.errCode === 0) {
            this.setState({
                arrCategory: resopnse.user
            })

        }



    }
    toggle = () => {
        this.props.toggleProduct();
    }



    checkValueInput = () => {
        let isValid = true;
        let arrCheck = ['category']

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
            this.props.createCateModal(this.state)
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
            category } = this.state;
        // console.log('check anh: ', imageREf)
        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                size="lg"

            >
                <ModalHeader toggle={() => { this.toggle() }}
                >
                    Create new Category
                </ModalHeader>
                <ModalBody>
                    {/* <div className='body'></div> */}
                    <div className="wrapper">
                        <div className="container">
                            <form action="">
                                <div>
                                    <label for="f-name">Name</label>
                                    <input type="text" name="f-name"
                                        value={category}
                                        onChange={(event) => { this.onChageInput(event, 'category') }}
                                    />
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateCate);
