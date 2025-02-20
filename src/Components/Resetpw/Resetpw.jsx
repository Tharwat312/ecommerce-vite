import React, { useContext, useState } from 'react'
import styles from './Resetpw.module.css'
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { TokenContext } from '../../Context/Token';
const Resetpw = () => {
    const {setToken} = useContext(TokenContext);
    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email!').required("Email is required!"),
        newPassword: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/, "Password must start with a capital letter, 3~8 chars").required("Password is required"),
    })
    async function callResetPW(values) {
        setIsLoading(true);
        return axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,values)
        .then((response) => {
            setIsLoading(false);
            localStorage.setItem("UserToken", response.data.token);
            setToken(response.data.token);
            toast.success("Password changed successfully");
            setTimeout(() => {
                navigate('/login');
            }, 1500);
            console.log(response);
        })
        .catch((error) => {
            setIsLoading(false);
            toast.error(error.response.data.message);
        })
    }
    const formik = useFormik ({
        initialValues: {
            email: "",
            newPassword: "",
        },
        validationSchema,
        onSubmit: callResetPW
    })
    const resetFormValues = () => {
        formik.resetForm();
        toast.success("Cleared Form!");
    }
    return (
        <>
            <Helmet>
                <title>
                    Freshcart APP Reset Password
                </title>
            </Helmet>
            <Toaster />
            <div className="w-50 mx-auto mt-5 py-5">
                <h2 className='text-capitalize'>Reset your password:</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="email" className='mb-1'>Email:</label>
                        <input type="email" id='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} name='email' className='form-control' />
                        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : null}
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="newPassword" className='mb-1'>New Password:</label>
                        <input type="password" id='newPassword' value={formik.values.newPassword} onBlur={formik.handleBlur} onChange={formik.handleChange} name='newPassword' className='form-control' />
                        {formik.errors.newPassword && formik.touched.newPassword ? <div className='alert alert-danger'>{formik.errors.newPassword}</div> : null}
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                    <button className='btn btn-success text-capitalize' type='submit'>
                        {isLoading ? <i className='fa fa-spinner fa-spin'></i> : 'reset my password'}
                    </button>
                    <button className='btn bg-danger text-capitalize text-white' type='reset' onClick={resetFormValues}>clear form</button>
                    </div> 
                </form>
            </div>
        </>
    )
}
export default Resetpw;