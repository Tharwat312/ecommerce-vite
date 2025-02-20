import React, { useEffect, useState } from 'react'
import styles from './AllOrders.module.css'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Loader from '../Loader/Loader';
const AllOrders = () => {
    const [purchased, setIsPurchased] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    async function getLastOrders() {
        const decoded = jwtDecode(localStorage.getItem('UserToken'));
        console.log(decoded);
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${decoded.id}`)
        setIsPurchased(data[data.length - 1]);
        setIsLoading(false);
    };
    useEffect(() => {
        getLastOrders();
    }, []);
    return (
        <>
            {isLoading ? <Loader /> : <section className='bg-main-light p-3 mt-5'>
                <h1 className='h3 text-center py-2 text-success'>Your orders are successfully paid!</h1>
                <div className="container">
                    {purchased.cartItems.map((product) => <div className='row py-2 border-bottom' key={product._id}>
                        <div className="col-md-1">
                            <img src={product.product.imageCover} alt={`${product.product.title} image`} className='w-100' />
                        </div>
                        <div className="col-md-11">
                            <h2 className='h6 text-main'>{product.product.title}</h2>
                            <h3 className='h5'>{product.product.category.name}</h3>
                            <div className="d-flex align-items-center justify-content-between">
                                <span className='text-main'>Price: {product.price}EGP</span>
                                <span>Quantity: {product.count}</span>
                            </div>
                        </div>
                    </div>)}
                    <div className="d-flex align-items-start mt-2 fs-5 flex-column">
                        <p className='text-main'>Total Order Price: <span>{purchased.totalOrderPrice}EGP</span> </p>
                        <p className='text-main'>Order Paid At : <span>{purchased.paidAt}</span> </p>
                    </div>
                    <div>
                        <p className='h2'>Your order has been placed to : </p>
                        <p className='h3'>Street: {purchased.shippingAddress.details} </p>
                        <p className='h3'>City:{purchased.shippingAddress.city} </p>
                        <p className='h3'>We will call you at the follow number : {purchased.shippingAddress.phone}</p>
                    </div>
                </div>
            </section>}
        </>
    )
}
export default AllOrders;