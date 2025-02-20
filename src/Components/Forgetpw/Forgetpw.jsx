import React, { useState } from 'react'
import styles from './Forgetpw.module.css'
import { Helmet } from 'react-helmet'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const Forgetpw = () => {
    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email!').required("Email is required!"),
    })
    const resetFormValues = () => {
        formik.resetForm();
        toast.success("Cleared Form!");
    }
    async function callAPI(value) {
        setIsLoading(true);
        return axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, value)
            .then(() => {
                setIsLoading(false);
                toast.success("Sent Verfication Code")
                setTimeout(() => {
                    navigate('/verifycode');
                }, 1500);
            }).catch((error) => error);
    }
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema,
        onSubmit: callAPI
    })
    return (
        <>
            <Helmet>
                <title>
                    Freshcart App Forget Password Page
                </title>
            </Helmet>
            <Toaster />
            <div className="w-50 mx-auto mt-5 py-5">
                <h2 className='text-capitalize'>Please enter your email:</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="email" className='mb-1'>Email:</label>
                        <input type="email" id='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} name='email' className='form-control' />
                        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : null}
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                    <button className='btn btn-success text-capitalize' type='submit'>
                        {isLoading ? <i className='fa fa-spinner fa-spin'></i> : 'send verfication code'}
                    </button>
                    <button className='btn bg-danger text-capitalize text-white' type='reset' onClick={resetFormValues}>clear form</button>
                    </div>
                    
                </form>
            </div>
        </>
    )
}
export default Forgetpw;