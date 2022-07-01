import React, { useState , Component} from 'react';
import PropTypes from 'prop-types';
import { searchProduct } from '../../API/Product';
// import searchProduct from '../../API/Product'

// Search.propTypes = {
//     handler_Search: PropTypes.func
// };

// Search.defaultProps = {
//     handler_Search: null
// }

// function Search(props) {

//     const { handler_Search } = props

//     const [search, set_search] = useState('')

//     const onChangeText = (e) => {

//         const value = e.target.value

//         set_search(value)

//         if (!handler_Search){
//             return
//         }

//         handler_Search(value)

//     }
class Search extends Component{
    constructor(props) {
        super(props);
        this.state = {
            search: {},
            key:''
        }
    }
    handleOnChangeSearch = (event) => {
        this.setState({
            key: event.target.value
        })
    }
    // async componentDidMount(key) {
    //     let resopnse = await searchProduct(key);
    //     if (resopnse && resopnse.errCode === 0) {
    //         this.setState({
    //             search: resopnse.data
    //         })
    //     }
    //     console.log('check: ', resopnse);
    // }

    handleSearch = async () => {
        let resopnse = await searchProduct(this.state.key);
        if (resopnse && resopnse.errCode === 0) {
            this.setState({
                search: resopnse.data
            })
        }
    }

    render() {
        console.log('thanhdeptrai: state',this.state)


    return (
        <form action="#">
            <input type="text" className="li-search-field" placeholder="search here" value={this.state.key} onChange={(event) => this.handleOnChangeSearch(event)}/>
            <button type="submit" className="li-search-btn" disabled={true}><i className="fa fa-search" onClick={() => this.handleSearch()}></i></button>
        </form>
    );
}
}

export default Search;