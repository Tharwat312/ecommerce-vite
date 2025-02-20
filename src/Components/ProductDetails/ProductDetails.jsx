import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import Slider from 'react-slick';
import ProductPriceRating from '../ProductPriceRating/ProductPriceRating';
import Loader from '../Loader/Loader';
import { CartContext } from '../../Context/Cart';
import { WishlistContext } from '../../Context/Wishlist';
const ProductDetails = () => {
    const [isDisabled, setIsDisabled] = useState(false);
    const [isDisabledWish, setIsDisabledWish] = useState(false);
    let { id } = useParams();
    let { addProductToCartContext, setNumCartItems, setIsEmpty, setCartID } = useContext(CartContext);
    let { addProductToWishListContext } = useContext(WishlistContext);
    async function addProductToCart(id) {
        setIsDisabled(true);
        addProductToCartContext(id).then((response) => {
            toast.success(response.data.message);
            setNumCartItems(response.data.numOfCartItems);
            setCartID(response.data.data._id);
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
            console.log(response)
            setIsDisabledWish(false);
        })
            .catch((error) => {
                toast.error(error.message);
                console.log(error)
                setIsDisabledWish(false);
            });
    }
    const navigate = useNavigate();
    const [productDetails, setProductDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    async function getProductDetails() {
        setIsLoading(true);
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
        setProductDetails(data.data);
        setIsLoading(false);
    }
    function closeProductDetails() {
        navigate('/');
    }
    let settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
    };
    useEffect(() => {
        getProductDetails();
    }, [])
    return (
        <>
            <Helmet>
                <title>{productDetails.title}</title>
            </Helmet>
            <Toaster />
            {isLoading ? <Loader /> : <section className='mt-5'>
                <div className="container py-5 position-relative">
                    <div className='position-absolute py-5 top-0 end-0'>
                        <i className="fa-solid fa-xmark fs-1 cursor-pointer" onClick={closeProductDetails}></i>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <Slider {...settings}>
                                {productDetails?.images?.map((image) => <img alt={`product image title`} key={image[image.length]} src= {image} className='w-100 mb-5'/>)}
                            </Slider>
                        </div>
                        <div className="col-md-8">
                            <h2 className='h5'>{productDetails.title}</h2>
                            <p>{productDetails.description}</p>
                            <div className="d-flex align-items-center justify-content-between">
                                <h6 className='text-main fw-bold'>{productDetails.category?.name}</h6>
                                <p className='text-capitalize'>available in stock: <span className='fw-bold'>{productDetails.quantity}</span> </p>
                            </div>
                            <ProductPriceRating productPrice={productDetails.price} productRating={productDetails.ratingsAverage} />
                            <button className='btn bg-main text-uppercase text-white w-100 my-2'
                                disabled={isDisabled ? isDisabled : ""}
                                onClick={() => {
                                    addProductToCart(productDetails._id)
                                }}>{isDisabled ? <i className='fa fa-spinner fa-spin'></i> : 'add to cart'}</button>
                            <button className='btn bg-info text-uppercase text-white w-100'
                                disabled={isDisabledWish ? isDisabledWish : ""}
                                onClick={() => {
                                    addProductToWishList(productDetails._id)
                                }}>{isDisabledWish ? <i className='fa fa-spinner fa-spin'></i> : 'add to wishlist'}</button>
                        </div>
                    </div>
                </div>
            </section>}
        </>
    )
}
export default ProductDetails;