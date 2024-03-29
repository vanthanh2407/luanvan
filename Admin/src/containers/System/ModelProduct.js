import React, { Component } from 'react';
import CommonUtils from '../../utils/CommonUtils';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { getAllCate } from '../../services/cateService';
import { getAllBooks } from '../../services/productService';
import { db, storage } from '../../firebaseConnect';
import { doc, setDoc, serverTimestamp, addDoc, collection, getDocFromCache, query, where, getDocs } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, listAll, list, uploadBytes, } from "firebase/storage";
// import { v4 } from "uuid";

// import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './ModelProduct.scss'
class ModelProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrCategory: [],
            arrProductStatus: [],
            previewImageURL: '',



            arrProductFromParent: [],

            isOpen: false,


            name: null,
            price: null,
            quantity: null,
            picture: '',
            content: null,
            summary: null,
            ram: null,
            chip: null,
            card: null,
            display: null,
            memory: null,
            port: null,
            operation: null,
            pin: null,
            dpi: null,
            micro_switch: null,
            scroll_switch: null,
            durability: null,
            keyboard_type: null,
            model: null,
            connect: null,
            weight: null,
            size: null,
            color: null,
            material: null,
            insurance: null,
            status: null,
            id_cate: '',


            imageUpload: null,
            setImageUpload: null,

            fileUrl: '',


        }
    }

    async componentDidMount() {
        // const querySnapshot = await getDocs(collection(db, "product"));
        // querySnapshot.forEach((doc) => {
        //     // doc.data() is never undefined for query doc snapshots
        //     console.log(doc.id, " => ", doc.data().dataImage);
        // });
        // const q = query(collection(db, "cities"), where("LA", "==", true));
        // console.log('check q:', q);
        // const querySnapshot = await getDocs(q);
        // console.log('check query:', querySnapshot);
        // querySnapshot.forEach((doc) => {
        //     // doc.data() is never undefined for query doc snapshots
        //     console.log(doc.id, " => ", doc.data());
        // });
        // try {
        //     const doc = await getDocFromCache(docRef);
        //     console.log("Cached document data:", doc.data());
        // } catch (error) {
        //     console.log(error);
        // }
        let resopnseStatus = await getAllBooks();
        let resopnse = await getAllCate();

        if (resopnse) {
            this.setState({
                arrCategory: resopnse
            })
        }
        if (resopnseStatus && resopnseStatus.errCode === 0) {
            this.setState({
                arrProductStatus: resopnseStatus.product
            })
        }
    }
    toggle = () => {
        this.props.toggleProduct();
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
            }, () => {
                console.log('check name picture:', this.state.picture.name)

            })
        }

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.picture !== this.state.picture) {
            console.log('check prestate: ', prevState.picture);
            let uploadImageToFirebase = ref(storage, `images/${this.state.picture.name}`);

            uploadBytes(uploadImageToFirebase, this.state.picture)
                .then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((url) => {
                        this.setState({
                            fileUrl: url,
                            // picture: this.state.fileUrl
                        })
                        // console.log('check url', url.slice((-36, -1) + 1))

                        console.log('check picture', this.state.fileUrl)
                    })
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
    handleAddnew = async () => {
        let dataImage = ''

        try {
            let dataId = await addDoc(collection(db, "product"), {
                dataImage: this.state.fileUrl,
                timeStamp: serverTimestamp(),
            });
            this.setState({
                picture: dataId.id
            })
            console.log('check dataId: ', this.state.picture)
            console.log('check state: ', this.state)
        } catch (error) {
            console.log(error)
        }
        let isValid = this.checkValueInput();
        if (isValid === true) {
            this.props.createProductModal(this.state)
        }

    }
    onChageInput = (event, id) => {
        let copystate = { ...this.state }
        copystate[id] = event.target.value;
        this.setState({
            ...copystate
        })
    }
    upLoadImage = () => {
        let uploadImageToFirebase = ref(storage, `images/${this.state.picture.name}`);

        uploadBytes(uploadImageToFirebase, this.state.picture)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    this.setState({
                        fileUrl: url,
                        // picture: this.state.fileUrl
                    })
                    // console.log('check url', url.slice((-36, -1) + 1))
                    console.log('check url', this.state.fileUrl)
                    console.log('check picture', this.state.picture)
                })
            })

    }

    render() {
        let arrCategory = this.state.arrCategory;

        let {
            name, price, quantity, picture, content, summary, ram, chip, card, display, memory, port, operation, pin, dpi, micro_switch, scroll_switch,
            durability, keyboard_type, model, connect, weight, size, color, material, insurance, status, id_cate
        } = this.state;
        // console.log('check anh: ', picture)
        // console.log('check url state: ', picture)
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
                                <div className="name">
                                    <div className='preview-image-container'>
                                        <label for="card-num">Image</label>
                                        <input type="file"
                                            // value={picture}
                                            onChange={(event) => { this.handleOnchangeImage(event) }}

                                        />
                                        <div className='preview-image'
                                            style={{ backgroundImage: `url(${this.state.previewImageURL})` }}
                                            onClick={() => this.openPreviewImage()}

                                        >

                                        </div>

                                    </div>

                                    <div>
                                        <label for="card-num">Category</label>
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
                                    {/* <button id='new' hidden
                                        onClick={() => { this.testHandle(); alert("Hello!"); }}>Purchase</button>
                                    <label className='label-create' htmlFor='new'>Add New</label> */}
                                </div>
                            </form>
                            {/* {this.state.isOpen === true &&
                                <Lightbox
                                    mainSrc={this.state.previewImageURL}
                                    onCloseRequest={() => this.setState({ isOpen: false })}

                                />
                            } */}
                        </div>
                        {/* <div>
                            <button id='new' hidden></button>
                            <button className='btn btn-primary' htmlFor="new">asc</button>
                        </div> */}


                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => { this.handleAddnew(); }} //this.upLoadImage();
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
