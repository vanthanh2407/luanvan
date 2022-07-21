import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input } from 'reactstrap';
import { getAlluser } from '../../services/userService';

import { getAllnews, createnews, deletenews, updatenews } from '../../services/newsService';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './ModalEditNews.scss'
class ModalEditNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrNews: [],

            arrUser: [],

            isOpen: false,

            id: this.props.arrNewsEdit.id,
            name: this.props.arrNewsEdit.name,
            content: this.props.arrNewsEdit.content,
            picture: this.props.arrNewsEdit.picture,
            id_user: this.props.arrNewsEdit.id_user,



        }
    }

    async componentDidMount() {
        let resEdit = this.props.arrNewsEdit;
        let resProduct = await getAlluser();
        let resopnse = await getAllnews();

        if (resopnse && resopnse.errCode === 0) {
            this.setState({
                arrNews: resopnse.news
            })

        }
        if (resProduct && resProduct.errCode === 0) {
            this.setState({
                arrUser: resProduct.user
            })
        }

        this.setState({
            name: resEdit.name,
            content: resEdit.content,
            picture: resEdit.picture,
            id_user: resEdit.id_user

        })


    }
    toggle = () => {
        this.props.toggleProductEdit();
    }


    checkValueInput = () => {
        let isValid = true;
        let arrCheck = ['id_user', 'name', 'content',]

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

        this.props.editNews(this.state)



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
            name, id_user, content, picture } = this.state;
        let arrUser = this.state.arrUser;

        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                size="lg"

            >
                <ModalHeader toggle={() => { this.toggle() }}
                >
                    Edit News
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditNews);
