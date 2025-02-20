import React, { useContext, useState } from 'react'
import styles from './Products.module.css'
import axios from 'axios'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import Loader from '../Loader/Loader';
import ProductPriceRating from '../ProductPriceRating/ProductPriceRating';
import { CartContext } from '../../Context/Cart';
import { WishlistContext } from '../../Context/Wishlist';
const Products = () => {
    let { addProductToCartContext, setNumCartItems, setIsEmpty, setCartID } = useContext(CartContext);
    let { addProductToWishListContext } = useContext(WishlistContext);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isDisabledWish, setIsDisabledWish] = useState(false);
    function callProductsAPI() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    }
    let { data, isLoading } = useQuery('Products', callProductsAPI);
    async function addProductToCart(id) {
        setIsDisabled(true);
        addProductToCartContext(id).then((response) => {
            setNumCartItems(response.data.numOfCartItems);
            toast.success(response.data.message);
            setCartID(response?.data?.data?._id);
            setIsDisabled(false);
            setIsEmpty(false);
        })
            .catch((error) => {
                toast.error(error.message);
                setIsDisabled(false);
            });
    }
    async function addProductToWishList(id) {
        setIsDisabledWish(true);
        addProductToWishListContext(id).then((response) => {
            toast.success(response.data.message);
            setIsDisabledWish(false);
        })
            .catch((error) => {
                toast.error(error.message);
                console.log(error)
                setIsDisabledWish(false);
            });
    }
    return (
        <>
            <Helmet>
                <title>
                    Freshcart Featured Products
                </title>
            </Helmet>
            <Toaster />
            {isLoading ? <Loader /> : <>
                <section>
                    <div className="container">
                        <div className="row py-5 gy-5 mt-5">
                            <h2 className='text-capitalize'>featured products</h2>
                            {data?.data?.data?.map((product) => <div key={product._id} className='col-sm col-md-3 col-lg-2'>
                                <div className='product cursor-pointer p-3'>
                                    <Link to={`productdetails/${product._id}`}>
                                        <img src={product.imageCover} className='w-100' alt="" />
                                        <h5 className='text-main'>{product.category.name}</h5>
                                        <h2 className='h4 fs-5'>{product.title.split(" ").slice(0, 2).join(" ")}</h2>
                                        <ProductPriceRating productPrice={product.price} productRating={product.ratingsAverage} />
                                    </Link>
                                    <button className='btn bg-main text-uppercase text-white w-100 my-1'
                                        disabled={isDisabled ? isDisabled : ""}
                                        onClick={() => {
                                            addProductToCart(product._id)
                                        }}>{isDisabled ? <i className='fa fa-spinner fa-spin'></i> : 'add to cart'}</button>
                                    <button className='btn bg-info text-uppercase text-white w-100'
                                        disabled={isDisabledWish ? isDisabledWish : ""}
                                        onClick={() => {
                                            addProductToWishList(product._id)
                                        }}>{isDisabledWish ? <i className='fa fa-spinner fa-spin'></i> : 'add to wishlist'}</button>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                </section>
            </>
            }
        </>
    )
}
export default Products;