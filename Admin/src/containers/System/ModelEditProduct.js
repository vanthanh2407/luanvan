import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input } from 'reactstrap';
import { getAllCate } from '../../services/cateService';
import { getAllBooks, createProduct, deleteProduct, updateProduct } from '../../services/productService';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './ModelEditProduct.scss'
class ModelEditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrCategory: [],
            arrProductStatus: [],
            previewImageURL: '',

            arrProductFromParent: [],

            isOpen: false,

            id: this.props.arrProdcutEdit.id,
            name: this.props.arrProdcutEdit.name,
            price: this.props.arrProdcutEdit.price,
            quantity: this.props.arrProdcutEdit.quantity,
            picture: this.props.arrProdcutEdit.picture,
            content: this.props.arrProdcutEdit.content,
            summary: this.props.arrProdcutEdit.summary,
            ram: this.props.arrProdcutEdit.ram,
            chip: this.props.arrProdcutEdit.chip,
            card: this.props.arrProdcutEdit.card,
            display: this.props.arrProdcutEdit.display,
            memory: this.props.arrProdcutEdit.memory,
            port: this.props.arrProdcutEdit.port,
            operation: this.props.arrProdcutEdit.operation,
            pin: this.props.arrProdcutEdit.pin,
            dpi: this.props.arrProdcutEdit.dpi,
            micro_switch: this.props.arrProdcutEdit.micro_switch,
            scroll_switch: this.props.arrProdcutEdit.scroll_switch,
            durability: this.props.arrProdcutEdit.durability,
            keyboard_type: this.props.arrProdcutEdit.keyboard_type,
            model: this.props.arrProdcutEdit.model,
            connect: this.props.arrProdcutEdit.connect,
            weight: this.props.arrProdcutEdit.weight,
            size: this.props.arrProdcutEdit.size,
            color: this.props.arrProdcutEdit.color,
            material: this.props.arrProdcutEdit.material,
            insurance: this.props.arrProdcutEdit.insurance,
            status: this.props.arrProdcutEdit.status,
            id_cate: this.props.arrProdcutEdit.id_cate,


        }
    }

    async componentDidMount() {
        let resEdit = this.props.arrProdcutEdit;
        let resopnseStatus = await getAllBooks();
        let resopnse = await getAllCate();

        if (resopnse && resopnse.errCode === 0) {
            this.setState({
                arrCategory: resopnse.user
            })

        }
        if (resopnseStatus && resopnseStatus.errCode === 0) {
            this.setState({
                arrProductStatus: resopnseStatus.product
            })
        }
        this.setState({
            name: resEdit.name,
            price: resEdit.price,
            quantity: resEdit.quantity,
            picture: resEdit.picture,
            content: resEdit.content,
            summary: resEdit.summary,
            ram: resEdit.ram,
            chip: resEdit.chip,
            card: resEdit.card,
            display: resEdit.display,
            memory: resEdit.memory,
            port: resEdit.port,
            operation: resEdit.operation,
            pin: resEdit.pin,
            dpi: resEdit.dpi,
            micro_switch: resEdit.micro_switch,
            scroll_switch: resEdit.scroll_switch,
            durability: resEdit.durability,
            keyboard_type: resEdit.keyboard_type,
            model: resEdit.model,
            connect: resEdit.connect,
            weight: resEdit.weight,
            size: resEdit.size,
            color: resEdit.color,
            material: resEdit.material,
            insurance: resEdit.insurance,
            status: resEdit.status,
            id_cate: resEdit.id_cate,
        })
        // let arrProductFromParent =
        //     this.props.handleEditProductFromParent('data from parent')
        // this.props.handleEditProduct(arrProductFromParent)

    }
    toggle = () => {
        this.props.toggleProductEdit();
    }
    handleOnchangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectURL = URL.createObjectURL(file);
            this.setState({
                previewImageURL: objectURL,
                picture: file
            })
        }
    }

    checkValueInput = () => {
        let isValid = true;
        let arrCheck = ['name', 'price', 'quantity', 'id_cate']
        // , 'content', 'summary', 'model', 'connect', 'weight', 'size', 'color', 'material', 'insurance'
        for (let i = 0; i < arrCheck.length; i++) {

            if (!this.state[arrCheck[i]]) {
                isValid = false;

                alert('This input is required: ' + arrCheck[i]);
                break;
            }

        }
        return isValid;
    }

    openPreviewImage = () => {
        if (!this.state.previewImageURL) return;
        this.setState({
            isOpen: true
        })
    }
    handleUpdate = () => {
        // const handleClose = () => setShow(false);
        let isValid = this.checkValueInput();
        if (isValid === false) return;

        this.props.editProduct(this.state)
        // if (this.props.errCode === 0) {
        //     this.props.toggleProduct();
        // }


    }
    onChageInput = (event, id) => {
        let copystate = { ...this.state }


        copystate[id] = event.target.value;


        this.setState({
            ...copystate
        })
        // , () => {
        //     console.log('check thu xem co hoat dong khong: ', this.state)
        // }
    }

    render() {
        let arrCategory = this.state.arrCategory;
        let arrProductStatus = this.state.arrProductStatus;



        let {
            name, price, quantity, picture, content, summary, ram, chip, card, display, memory, port, operation, pin, dpi, micro_switch, scroll_switch,
            durability, keyboard_type, model, connect, weight, size, color, material, insurance, status, id_cate
        } = this.state;

        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                size="lg"

            >
                <ModalHeader toggle={() => { this.toggle() }}
                >
                    Edit Product
                </ModalHeader>
                <ModalBody>
                    {/* <div className='body'></div> */}
                    <div className="wrapper">
                        <div className="container">
                            <form action="">
                                <div>
                                    <label for="f-name">Name</label>
                                    <input type="text" name="f-name"
                                        value={name}
                                        onChange={(event) => { this.onChageInput(event, 'name') }}
                                    />
                                </div>
                                <div className="name">
                                    <div>
                                        <label for="l-name">Price</label>
                                        <input type="text" name="l-name"
                                            value={price}
                                            onChange={(event) => { this.onChageInput(event, 'price') }}
                                        />
                                    </div>
                                    <div className="street">
                                        <label for="name">Quantity</label>
                                        <input type="text" name="address"
                                            value={quantity}
                                            onChange={(event) => { this.onChageInput(event, 'quantity') }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label for="city">Content</label>
                                    <input type="text" name="city"
                                        value={content}
                                        onChange={(event) => { this.onChageInput(event, 'content') }}
                                    />
                                </div>
                                <div>
                                    <label for="state">Summary</label>
                                    <input type="text" name="state"
                                        value={summary}
                                        onChange={(event) => { this.onChageInput(event, 'summary') }}
                                    />
                                </div>
                                <div className="cc-num">
                                    <label for="card-num">Display</label>
                                    <input type="text" name="card-num"
                                        value={display}
                                        onChange={(event) => { this.onChageInput(event, 'display') }}
                                    />
                                </div>
                                <div className="name">
                                    <div>
                                        <label for="city">Durability</label>
                                        <input type="text" name="city"
                                            value={durability}
                                            onChange={(event) => { this.onChageInput(event, 'durability') }}
                                        />
                                    </div>
                                    <div>
                                        <label for="city">Keyboard_type</label>
                                        <input type="text" name="city"
                                            value={keyboard_type}
                                            onChange={(event) => { this.onChageInput(event, 'keyboard_type') }}
                                        />
                                    </div>
                                </div>

                                <div className="name">
                                    <div>
                                        <label for="city">Weight</label>
                                        <input type="text" name="city"
                                            value={weight}
                                            onChange={(event) => { this.onChageInput(event, 'weight') }}
                                        />
                                    </div>
                                    <div>
                                        <label for="city">Size</label>
                                        <input type="text" name="city"
                                            value={size}
                                            onChange={(event) => { this.onChageInput(event, 'size') }}
                                        />
                                    </div>


                                </div>

                                <div className="address-info">
                                    <div>
                                        <label for="city">Ram</label>
                                        <input type="text" name="city"
                                            value={ram}
                                            onChange={(event) => { this.onChageInput(event, 'ram') }}
                                        />
                                    </div>
                                    <div>
                                        <label for="city">Chip</label>
                                        <input type="text" name="city"
                                            value={chip}
                                            onChange={(event) => { this.onChageInput(event, 'chip') }}
                                        />
                                    </div>

                                    <div>
                                        <label for="zip">Card</label>
                                        <input type="text" name="zip"
                                            value={card}
                                            onChange={(event) => { this.onChageInput(event, 'card') }}
                                        />
                                    </div>

                                </div>


                                <div className="address-info">
                                    <div>
                                        <label for="city">Memory</label>
                                        <input type="text" name="city"
                                            value={memory}
                                            onChange={(event) => { this.onChageInput(event, 'memory') }}
                                        />
                                    </div>
                                    <div>
                                        <label for="city">Port</label>
                                        <input type="text" name="city"
                                            value={port}
                                            onChange={(event) => { this.onChageInput(event, 'port') }}
                                        />
                                    </div>

                                    <div>
                                        <label for="zip">Operation</label>
                                        <input type="text" name="zip"
                                            value={operation}
                                            onChange={(event) => { this.onChageInput(event, 'operation') }}
                                        />
                                    </div>

                                </div>

                                <div className="address-info">
                                    <div>
                                        <label for="city">Pin</label>
                                        <input type="text" name="city"
                                            value={pin}
                                            onChange={(event) => { this.onChageInput(event, 'pin') }}
                                        />
                                    </div>
                                    <div>
                                        <label for="city">Model</label>
                                        <input type="text" name="city"
                                            value={model}
                                            onChange={(event) => { this.onChageInput(event, 'model') }}
                                        />
                                    </div>

                                    <div>
                                        <label for="zip">Connect</label>
                                        <input type="text" name="zip"
                                            value={connect}
                                            onChange={(event) => { this.onChageInput(event, 'connect') }}
                                        />
                                    </div>
                                </div>

                                <div className="address-info">
                                    <div>
                                        <label for="city">DPI</label>
                                        <input type="text" name="city"
                                            value={dpi}
                                            onChange={(event) => { this.onChageInput(event, 'dpi') }}
                                        />
                                    </div>
                                    <div>
                                        <label for="city">Micro_switch</label>
                                        <input type="text" name="city"
                                            value={micro_switch}
                                            onChange={(event) => { this.onChageInput(event, 'micro_switch') }}
                                        />
                                    </div>

                                    <div>
                                        <label for="zip">Scroll_switch</label>
                                        <input type="text" name="zip"
                                            value={scroll_switch}
                                            onChange={(event) => { this.onChageInput(event, 'scroll_switch') }}
                                        />
                                    </div>
                                </div>





                                <div className="address-info">
                                    <div>
                                        <label for="city">Color</label>
                                        <input type="text" name="city"
                                            value={color}
                                            onChange={(event) => { this.onChageInput(event, 'color') }}
                                        />
                                    </div>
                                    <div>
                                        <label for="city">Material</label>
                                        <input type="text" name="city"
                                            value={material}
                                            onChange={(event) => { this.onChageInput(event, 'material') }}
                                        />
                                    </div>

                                    <div>
                                        <label for="zip">insurance</label>
                                        <input type="text" name="zip"
                                            value={insurance}
                                            onChange={(event) => { this.onChageInput(event, 'insurance') }}
                                        />
                                    </div>
                                </div>
                                {/* // cc-info */}
                                <div className="address-info">
                                    <div className='preview-image-container'>
                                        <label for="card-num">Image</label>
                                        <input type="file"
                                            onChange={(event) => this.handleOnchangeImage(event)}
                                        />
                                        <div className='preview-image'
                                            style={{ backgroundImage: `url(${this.state.previewImageURL})` }}
                                            onClick={() => this.openPreviewImage()}

                                        >

                                        </div>

                                    </div>
                                    <div>
                                        <label for="card-num">Product Display Status </label>
                                        <select className='form-control'
                                            onChange={(event) => { this.onChageInput(event, 'status') }}
                                        >
                                            <option>Co</option>
                                            <option>Khong</option>
                                            {/* {
                                                arrProductStatus && arrProductStatus.map((item, index) => {
                                                    // console.log('check id cate: ', item.id);
                                                    return (

                                                        <>
                                                            <option >{item.status}</option>
                                                        </>
                                                    )
                                                })

                                            } */}
                                        </select>
                                    </div>
                                    <div>
                                        <label for="card-num">Category</label>
                                        {/* <input type="text" name="zip"

                                            onChange={(event) => { this.onChageInput(event, 'id_cate') }}
                                        /> */}
                                        <select className='form-control'
                                            value={id_cate}
                                            onChange={(event) => { this.onChageInput(event, 'id_cate') }}
                                        >

                                            {
                                                arrCategory && arrCategory.map((item, index) => {

                                                    return (

                                                        <>
                                                            <option value={item.id}>{item.category}</option>
                                                        </>
                                                    )
                                                })

                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="btns">
                                    {/* <button>Purchase</button>
                                    <button>Back to cart</button> */}
                                </div>
                            </form>
                            {/* {this.state.isOpen === true &&
                                <Lightbox
                                    mainSrc={this.state.previewImageURL}
                                    onCloseRequest={() => this.setState({ isOpen: false })}

                                />
                            } */}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModelEditProduct);
