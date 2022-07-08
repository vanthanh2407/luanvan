import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input } from 'reactstrap';

import { getAllCate, createCate, deleteCate, updateCate, FindByIdCate } from '../../services/cateService';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './ModalEditCate.scss'
class ModalEditCate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrCategory: [],

            arrProductFromParent: [],

            isOpen: false,

            id: this.props.arrCateEdit.id,
            category: this.props.arrCateEdit.category,



        }
    }

    async componentDidMount() {
        let resEdit = this.props.arrCateEdit;

        let resopnse = await getAllCate();

        if (resopnse && resopnse.errCode === 0) {
            this.setState({
                arrCategory: resopnse.user
            })

        }

        this.setState({
            category: resEdit.category,

        })


    }
    toggle = () => {
        this.props.toggleProductEdit();
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


    handleUpdate = () => {

        let isValid = this.checkValueInput();
        if (isValid === false) return;

        this.props.editCate(this.state)



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
            category } = this.state;

        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                size="lg"

            >
                <ModalHeader toggle={() => { this.toggle() }}
                >
                    Edit Category
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
                                    {/* <button>Purchase</button>
                                    <button>Back to cart</button> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditCate);
