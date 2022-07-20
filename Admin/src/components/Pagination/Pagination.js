import React, { Component } from 'react';
import Pagination from "react-pagination-library";
import "react-pagination-library/build/css/index.css";
// import "./Pagination.scss";

class PaginationReact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            page: this.props.arrPage.page,
        }
    }

    changeCurrentPage = numPage => {
        this.setState({ currentPage: numPage });
        this.props.pageProduct(this.state)
        console.log('check page:', this.state)
        console.log('check errMessage page:', this.props.errMessage)
        //fetch a data
        //or update a query to get data
    };
    render() {
        return (
            <div>
                <Pagination
                    currentPage={this.state.currentPage}
                    totalPages={15}
                    changeCurrentPage={this.changeCurrentPage}
                    theme="square-i"
                />
                <h2>current Page:{this.state.currentPage}</h2>
            </div>
        );
    }
}
export default (PaginationReact);