import React, { useContext, useState } from 'react'
import styles from './Checkout.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';

import axios from 'axios';
import { TokenContext } from '../../Context/Token';
import { CartContext } from '../../Context/Cart';
const Checkout = () => {
    let {cartID} = useContext(CartContext);
    let {token} = useContext(TokenContext);
    const [isLoading,setIsLoading] = useState(false);
    let headers = {
        token
    }
    const validationSchema = Yup.object({
        details: Yup.string().required("Address details are required!").min(10,"Address is too short!").max(100,"Address is too long!"),
        phone: Yup.string().matches(/^01[0125][0-9]{8}$/, "Invalid Phone Number").required("Phone number is required"),
        city: Yup.string().required('City is required!').matches(/^[a-zA-Z ]*$/,"City name is invalid!").min(5,"City name is too short!").max(20,"City name is too long!"),
    });
    const formik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: "",
        },
        validationSchema,
        onSubmit: callPaymentAPI,
    });
    async function callPaymentAPI(values) {
        setIsLoading(true);
        callPayment(values).then((response) => {
            console.log(response.data.session.url);
            setIsLoading(false);
            window.location.href= response.data.session.url;
        }).catch((error) => {
            setIsLoading(false);
            console.log(error);
        })
    }
    function callPayment (values) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=https://tharwat312.github.io/ecommerce`,{
            shippingAddress:values
        },{headers});
    }
    return (
        <>
        <section className='container global-margin'>
            <div className='bg-main-light p-3 w-75 mx-auto my-3'>
                <h2 className='text-capitalize'>shipping address:</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor='details' className='mb-1'>Details</label>
                        <input type="text" id='details' name='details' className='form-control' value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.details && formik.touched.details ? <div className='alert alert-danger'>{formik.errors.details}</div> : null}
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor='phone' className='mb-1'>Phone</label>
                        <input type="text" id='phone' name='phone' className='form-control' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div> : null}
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor='city' className='mb-1'>City</label>
                        <input type="text" id='city' name='city' className='form-control' value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.city && formik.touched.city ? <div className='alert alert-danger'>{formik.errors.city}</div> : null}
                    </div>
                    <button disabled= {isLoading ? true : false} type='submit' className='btn btn-success text-uppercase w-100'>{isLoading ? <i className='fa fa-spinner fa-spin'></i> : 'pay now!'}</button>
                </form>
            </div>
        </section>
        </>
    )
}
export default Checkout;