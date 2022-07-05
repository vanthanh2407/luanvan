import axiosClient from './axiosClient'

const Product = {

    Get_All_Product: () => {
        const url = '/products'
        return axiosClient.get(url)
    },

    Get_Category_Product: (id_cate) => {
        const url = `/cate_product/${id_cate}`
        return axiosClient.get(url)
    },

    Get_Detail_Product: (id) => {
        const url = `/products/${id}`
        return axiosClient.get(url)
    },

    Get_Category_Gender: (query) => {
        const url = `/api/Product/category/gender${query}`
        return axiosClient.get(url)
    },

    Get_Pagination: (query) => {
        const url = `/api/Product/category/pagination${query}`
        return axiosClient.get(url)
    },

    get_search_list: (key) => {
        // const url = `/search-product${key}`
        // return axiosClient.get(url)
    }

}

export default Product
const getAllProduct = () => {
    return axiosClient.get('/products');
}
const getProduct = (id) => {
    return axiosClient.get(`/products/${id}`);
}
const searchProduct = (key) => {
    return axiosClient.get(`/search-product/${key}`)
}
export { getAllProduct,getProduct,searchProduct }