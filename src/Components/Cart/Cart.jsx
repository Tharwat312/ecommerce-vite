import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css'
import toast, { Toaster } from 'react-hot-toast';
import emptyCart from '../../assets/images/empty-cart.svg'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/Cart';
import Loader from '../Loader/Loader';
const Cart = () => {
    let { isEmpty,setIsEmpty,getLoggedUserCartContext, removeCartItemContext, clearUserCartContext, updateQuantityContext, setNumCartItems } = useContext(CartContext);
    const [isLoading, setLoading] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [cart, setCart] = useState([]);
    async function removeCartItem(id) {
        setIsRemoving(true);
        removeCartItemContext(id).then((response) => {
            if (response.data.numOfCartItems === 0) {
                setIsEmpty(true);
                setNumCartItems(0);
            }
            else {
                toast.success('Removed Item Successfully');
                setNumCartItems(response.data.numOfCartItems);
                setCart(response.data);
                setIsRemoving(false);
            }
        }).catch((error) => {
            toast.error(error.message)
            setIsRemoving(false);
        })
    }
    async function updateCount(id, count) {
        setIsDisabled(true);
        updateQuantityContext(id, count).then((response) => {
            toast.success(response.data.status);
            setCart(response.data);
            setIsDisabled(false)
        }).catch((error) => {
            toast.error(error.message);
            setIsDisabled(false)
        })
    }
    async function getLoggedCart() {
        setLoading(true);
        getLoggedUserCartContext().then((response) => {
            setCart(response?.data);
            setLoading(false);
        }).catch((error) => {
            setLoading(false);
            console.log(error)
        }
        )
    }
    async function clearCart() {
        clearUserCartContext().then((response) => {
            toast.success(response.data.message);
            setNumCartItems(0);
            setCart([]);
            setIsEmpty(true);
        }).catch((error) => {
            toast.error(error.message);
        })
    }
    useEffect(() => {
        getLoggedCart();
    }, [])
    return (
        <>
            <Helmet>
                <title>Freshcart Cart Page</title>
            </Helmet>
            <Toaster />
            {isLoading ? <Loader /> :
                !isEmpty ? <section className={`${styles.cart} bg-main-light p-5 container`}>
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="left">
                            <h3 className='text-capitalize mb-2'>your shopping cart:</h3>
                            <h4 className='h6 text-capitalize text-main fw-bold'>total cart price: {cart.data?.totalCartPrice}</h4>
                            <h4 className='h6 text-capitalize text-main fw-bold'>total cart items: {cart.numOfCartItems}</h4>
                        </div>
                        <div className="right">
                            <button onClick={clearCart} className='btn btn-outline-danger text-capitalize'>delete all cart items</button>
                        </div>
                    </div>
                    {cart?.data?.products.map((product) => <div className='row py-1 border-bottom mb-3' key={product.product.id}>
                        <div className="col-md-1">
                            <img src={product.product.imageCover} alt={product.product.title} className='w-100' />
                        </div>
                        <div className="col-md-11">
                            <h3 className='h6'>{product.product.title}</h3>
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="left">
                                    <h6 className='text-main'>Price : {product.price} EGP</h6>
                                    <button disabled={isRemoving ? isRemoving : ""} onClick={() => { removeCartItem(product.product._id) }} className='btn text-capitalize cursor-pointer'><i className="fa-solid fa-trash text-danger me-1"></i>
                                        {isRemoving ? <i className='fa fa-spinner fa-spin'></i> : 'Remove'}
                                    </button>
                                </div>
                                <div className="right">
                                    <button onClick={() => {
                                        updateCount(product.product.id, product.count - 1);
                                    }} className='btn btn-outline-danger btn-sm'
                                        disabled={product.count === 1 ? true : false}>
                                        {isDisabled ? <i className='fa fa-spinner fa-spin'></i> : '-'}
                                    </button>
                                    <span className='mx-1'>{product.count}</span>
                                    <button onClick={() => {
                                        updateCount(product.product.id, product.count + 1);
                                    }} className='btn btn-outline-success btn-sm'
                                        disabled={product.count === product.product.quantity ? true : false}>
                                        {isDisabled ? <i className='fa fa-spinner fa-spin'></i> : '+'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>)}
                    <Link to={'/checkout'} className='btn bg-main text-uppercase mt-2 text-white w-100'>checkout</Link>
                </section>
                    : <div className='bg-main-light py-3 mx-auto mt-5 d-flex align-items-center justify-content-center flex-column'>
                        <span className='fs-2'>Your cart is empty!</span>
                        <img src={emptyCart} alt="empty cart image" />
                    </div>}
        </>
    )
}
export default Cart;