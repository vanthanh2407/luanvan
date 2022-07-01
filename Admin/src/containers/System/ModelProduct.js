import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input } from 'reactstrap';
import './ModelProduct.scss'
class ModelProduct extends Component {

    state = {

    }

    componentDidMount() {
    }
    toggle = () => {
        this.props.toggleProduct();
    }

    render() {
        console.log('check ', this.props)
        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                size="lg"

            >
                <ModalHeader toggle={() => { this.toggle() }}
                >
                    Create new Books
                </ModalHeader>
                <ModalBody>
                    {/* <div className='body'></div> */}
                    <div className="wrapper">
                        <div className="container">
                            <form action="">
                                <div>
                                    <label for="f-name">Name</label>
                                    <input type="text" name="f-name" />
                                </div>
                                <div className="name">
                                    <div>
                                        <label for="l-name">Price</label>
                                        <input type="text" name="l-name" />
                                    </div>
                                    <div className="street">
                                        <label for="name">Quantity</label>
                                        <input type="text" name="address" />
                                    </div>
                                </div>
                                <div>
                                    <label for="city">Content</label>
                                    <input type="text" name="city" />
                                </div>
                                <div>
                                    <label for="state">Summary</label>
                                    <input type="text" name="state" />
                                </div>

                                <div className="address-info">
                                    <div>
                                        <label for="city">Ram</label>
                                        <input type="text" name="city" />
                                    </div>
                                    <div>
                                        <label for="city">Chip</label>
                                        <input type="text" name="city" />
                                    </div>

                                    <div>
                                        <label for="zip">Card</label>
                                        <input type="text" name="zip" />
                                    </div>

                                </div>

                                <div className="cc-num">
                                    <label for="card-num">Display</label>
                                    <input type="text" name="card-num" />
                                </div>
                                <div className="address-info">
                                    <div>
                                        <label for="city">Memory</label>
                                        <input type="text" name="city" />
                                    </div>
                                    <div>
                                        <label for="city">Port</label>
                                        <input type="text" name="city" />
                                    </div>

                                    <div>
                                        <label for="zip">Operation</label>
                                        <input type="text" name="zip" />
                                    </div>

                                </div>
                                <div className="address-info">
                                    <div>
                                        <label for="city">Pin</label>
                                        <input type="text" name="city" />
                                    </div>
                                    <div>
                                        <label for="city">Model</label>
                                        <input type="text" name="city" />
                                    </div>

                                    <div>
                                        <label for="zip">Connect</label>
                                        <input type="text" name="zip" />
                                    </div>

                                </div>
                                <div className="address-info">
                                    <div>
                                        <label for="city">Weight</label>
                                        <input type="text" name="city" />
                                    </div>
                                    <div>
                                        <label for="city">Size</label>
                                        <input type="text" name="city" />
                                    </div>

                                    <div>
                                        <label for="zip">Connect</label>
                                        <input type="text" name="zip" />
                                    </div>
                                </div>



                                <div className="address-info">
                                    <div>
                                        <label for="city">Color</label>
                                        <input type="text" name="city" />
                                    </div>
                                    <div>
                                        <label for="city">Material</label>
                                        <input type="text" name="city" />
                                    </div>

                                    <div>
                                        <label for="zip">insurance</label>
                                        <input type="text" name="zip" />
                                    </div>
                                </div>

                                <div className="cc-info">
                                    <div>
                                        <label for="card-num">Exp</label>
                                        <input type="text" name="expire" />
                                    </div>
                                    <div>
                                        <label for="card-num">CCV</label>
                                        <input type="text" name="security" />
                                    </div>
                                </div>
                                <div className="btns">
                                    <button>Purchase</button>
                                    <button>Back to cart</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => { this.handleAddnew() }}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModelProduct);
