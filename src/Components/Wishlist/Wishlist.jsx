import React, { useContext, useEffect, useState } from 'react'
import styles from './Wishlist.module.css'
import { Helmet } from 'react-helmet';
import toast, { Toaster } from 'react-hot-toast';
import emptyWishlist from '../../assets/images/emptywishlist.png'
import { CartContext } from '../../Context/Cart';
import { WishlistContext } from '../../Context/Wishlist';
import Loader from '../Loader/Loader';

const Wishlist = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRemoving,setIsRemoving] = useState(false);
    const [isAdding,setIsAdding] = useState(false);
    const [wishList, setWishList] = useState([]);
    let { getLoggedWishListContext,removeProductFromWishListContext } = useContext(WishlistContext);
    let {addProductToCartContext,getInitialCart,setIsEmpty,isEmpty} = useContext(CartContext);
    async function getLoggedWishList() {
        setIsLoading(true);
        getLoggedWishListContext().then((response) => {
            setIsLoading(false);
            setWishList(response.data);
            if (response.data.count === 0) {
                setIsEmpty(true);
            }
            else {
                setIsEmpty(false);
            }
        }).catch((error) => {
            setIsLoading(false);
            return error;
        })
    }
    function removeWishListItem(id) {
        setIsRemoving(true);
        removeProductFromWishListContext(id).then((response) => {
            toast.success(response.data.message);
            getLoggedWishList();
            setIsRemoving(false);
        }).catch((error) => {
            toast.error(error.message);
            setIsRemoving(false);
        })
    }
    function addProductToCart(id) {
        setIsAdding(true);
        addProductToCartContext(id).then((response) => {
            toast.success(response.data.message);
            setIsAdding(false);
            setIsEmpty(false);
            getInitialCart();
        }).catch((error) => {
            console.log(error);
        })
    }
    useEffect(() => {
        getLoggedWishList();
    }, [])
    return (
        <>
            <Helmet>
                <title>Freshcart Wishlist Page</title>
            </Helmet>
            <Toaster />
            {isLoading ? <Loader /> :
                isEmpty ? <section className='bg-main-light p-3 mt-5 container d-flex align-items-center justify-content-center flex-column'>
                    <h2 className='py-2'>Your wishlist is empty!</h2>
                    <img src={emptyWishlist} alt='empty wishlist image' />
                </section> :
                    <>
                        <section className={`${styles.Wishlist} bg-main-light p-3 container`}>
                            <h3 className='text-capitalize mb-2'>your wishList:</h3>
                            <h4 className='h6 text-capitalize text-main fw-bold mb-1'>total wishlist items: {wishList.count}</h4>
                            {wishList?.data?.map((product) => <div key={product._id} className='row py-2 border-bottom mb-2'>
                                <div className="col-md-1">
                                    <img src={product.imageCover} alt={`${product.title} image`} className='w-100' />
                                </div>
                                <div className="col-md-11">
                                    <h3 className='h6'>{product.title}</h3>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h6 className='text-main'>Price: {product.price} EGP</h6>
                                        <button disabled={isRemoving ? isRemoving : ""} onClick={() => { removeWishListItem(product._id) }} className='btn text-capitalize cursor-pointer'><i className="fa-solid fa-trash text-danger me-1"></i>
                                            {isRemoving ? <i className='fa fa-spinner fa-spin'></i> : 'Remove'}
                                        </button>
                                    </div>
                                    <button disabled={isAdding ? isAdding : ""} onClick={() => {addProductToCart(product._id)}} className='btn btn-success text-uppercase cursor-pointer'>
                                            {isAdding ? <i className='fa fa-spinner fa-spin'></i> : 'add to cart' }
                                        </button>
                                </div>
                            </div>)}
                        </section>
                    </>
            }
        </>
    )
}
export default Wishlist;