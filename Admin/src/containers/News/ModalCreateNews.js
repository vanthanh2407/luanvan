import React, { useEffect, Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input } from 'reactstrap';
import { getAlluser } from '../../services/userService';


import { getAllnews, createnews, deletenews, updatenews } from '../../services/newsService';
import { db, storage } from '../../firebaseConnect';
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, listAll, list, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './ModalCreateNews.scss'
class ModalCreateNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrNews: [],

            arrUser: [],

            isOpen: false,


            name: null,
            content: null,
            picture: null,
            id_user: null
        }
    }

    async componentDidMount() {

        let resopnse = await getAllnews();
        let resUser = await getAlluser();

        if (resopnse && resopnse.errCode === 0) {
            this.setState({
                arrNews: resopnse.news
            })
        }
        if (resUser && resUser.errCode === 0) {
            this.setState({
                arrUser: resUser.user
            })
        }



    }
    toggle = () => {
        this.props.toggleProduct();
    }



    checkValueInput = () => {
        let isValid = true;
        let arrCheck = ['name', 'id_user', 'content']

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
            this.props.createNewsModal(this.state)
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
        let arrUser = this.state.arrUser;
        let { name, content, picture, id_user } = this.state;

        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                size="lg"

            >
                <ModalHeader toggle={() => { this.toggle() }}
                >
                    Create new News
                </ModalHeader>
                <ModalBody>

                    <div className="wrapper">
                        <div className="container">
                            <form action="">
                                <div className="name">
                                    <div>
                                        <label for="l-name">Name</label>
                                        <input type="text" name="l-name"
                                            value={name}
                                            onChange={(event) => { this.onChageInput(event, 'name') }}
                                        />
                                    </div>
                                    <div className="street">
                                        <label for="name">Content</label>
                                        <input type="text" name="address"
                                            value={content}
                                            onChange={(event) => { this.onChageInput(event, 'content') }}
                                        />
                                    </div>
                                </div>
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
                                    <label for="card-num">Id User</label>
                                    <select className='form-control'
                                        value={id_user}
                                        onChange={(event) => { this.onChageInput(event, 'id_user') }}
                                    >

                                        {
                                            arrUser && arrUser.map((item, index) => {

                                                return (

                                                    <>
                                                        <option value={item.id}>{item.firstname}</option>
                                                    </>
                                                )
                                            })

                                        }
                                    </select>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateNews);
