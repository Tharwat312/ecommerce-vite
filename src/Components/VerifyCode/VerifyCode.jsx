import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
const VerifyCode = () => {
    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const validationSchema = Yup.object({
        resetCode: Yup.number().required("Reset code is required!").min(6, "Minimum length 6 numbers")
    })
    const resetFormValues = () => {
        formik.resetForm();
        toast.success("Cleared Form!");
    }
    async function callVerifyAPI(values) {
        setIsLoading(true);
        return axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values)
            .then(() => {
                setIsLoading(false);
                toast.success("Verified successfully");
                setTimeout(() => {
                    navigate('/resetpw')
                }, 1500)
            }).catch((error) => {
                setIsLoading(false);
                toast.error(error.response.data.message);
            });
    }
    let formik = useFormik({
        initialValues: {
            resetCode: "",
        },
        validationSchema,
        onSubmit: callVerifyAPI,
    })
    return (
        <>
            <Helmet>
                <title>
                    Freshcart APP Verify Code
                </title>
            </Helmet>
            <Toaster />
            <div className="w-50 mx-auto mt-5 py-5">
                <h2 className='text-capitalize h4'>Please enter the code sent to your email:</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="code" className='mb-1'>Verification Code:</label>
                        <input type="tel" id='code' value={formik.values.resetCode} onBlur={formik.handleBlur} onChange={formik.handleChange} name='resetCode' className='form-control' />
                        {formik.errors.resetCode && formik.touched.resetCode ? <div className='alert alert-danger'>{formik.errors.resetCode}</div> : null}
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                        <button className='btn btn-success text-capitalize' type='submit'>
                            {isLoading ? <i className='fa fa-spinner fa-spin'></i> : 'verify code'}
                        </button>
                        <button className='btn bg-danger text-capitalize text-white' type='reset' onClick={resetFormValues}>clear form</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default VerifyCode;