import React, { useContext, useState } from 'react';
import styles from './Register.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { TokenContext } from '../../Context/Token';
const Register = () => {
    let navigate = useNavigate();
    let { setToken } = useContext(TokenContext);
    const [loader, setLoader] = useState(false);
    async function callRegisterAPI(userData) {
        setLoader(true);
        await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, userData).then((response) => {
            setLoader(false);
            localStorage.setItem("UserToken", response.data.token);
            setToken(response.data.token);
            navigate("/login");
        }).catch((error) => {
            setLoader(false);
            toast.error(error.response.data.message);
        });
    }
    const validationSchema = Yup.object({
        name: Yup.string().min(3, "Name is too short!").max(10, "Name is too long!").required("Name is required"),
        email: Yup.string().email('Invalid email!').required("Email is required!"),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/, "Password must start with a capital letter, 3~8 chars").required("Password is required"),
        rePassword: Yup.string().oneOf([Yup.ref('password')], "Password and Repassword doesn't match").required("RePassword is required"),
        phone: Yup.string().matches(/^01[0125][0-9]{8}/, "Invalid Phone Number").required("Phone number is required"),
    })
    const registerForm = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",
        },
        validationSchema,
        onSubmit: callRegisterAPI,
    })
    const resetFormValues = () => {
        registerForm.resetForm();
        toast.success("Cleared Form!");
    }
    return (
        <>
            <Helmet>
                <title>
                    Register
                </title>
            </Helmet>
            <Toaster />
            <section>
                <div className="container mt-5">
                    <div className="row">
                        <div className="w-75 mx-auto my-4">
                            <h2 className='text-capitalize'>register now!</h2>
                            <form onSubmit={registerForm.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="fullName" className='mb-1'>Full Name:</label>
                                    <input type="text" id='fullName' value={registerForm.values.name} onBlur={registerForm.handleBlur} onChange={registerForm.handleChange} name='name' className='form-control' />
                                    {registerForm.errors.name && registerForm.touched.name ? <div className='alert alert-danger'>{registerForm.errors.name}</div> : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" className='mb-1'>Email:</label>
                                    <input type="email" id='email' value={registerForm.values.email} onBlur={registerForm.handleBlur} onChange={registerForm.handleChange} name='email' className='form-control' />
                                    {registerForm.errors.email && registerForm.touched.email ? <div className='alert alert-danger'>{registerForm.errors.email}</div> : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className='mb-1'>Password:</label>
                                    <input type="password" id='password' value={registerForm.values.password} onBlur={registerForm.handleBlur} onChange={registerForm.handleChange} name='password' className='form-control' />
                                    {registerForm.errors.password && registerForm.touched.password ? <div className='alert alert-danger'>{registerForm.errors.password}</div> : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="rePassword" className='mb-1'>Re-enter Password:</label>
                                    <input type="password" id='rePassword' value={registerForm.values.rePassword} onBlur={registerForm.handleBlur} onChange={registerForm.handleChange} name='rePassword' className='form-control' />
                                    {registerForm.errors.rePassword && registerForm.touched.rePassword ? <div className='alert alert-danger'>{registerForm.errors.rePassword}</div> : null}
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="mobile" className='mb-1'>Mobile Number:</label>
                                    <input type="tel" id='mobile' value={registerForm.values.phone} onBlur={registerForm.handleBlur} onChange={registerForm.handleChange} name='phone' className='form-control' />
                                    {registerForm.errors.phone && registerForm.touched.phone ? <div className='alert alert-danger'>{registerForm.errors.phone}</div> : null}
                                </div>
                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                    <button className='btn bg-main text-capitalize text-white mb-3' type='submit'
                                        disabled={!(registerForm.isValid && registerForm.dirty && !loader)}
                                    >
                                        {loader ? <i className='fa fa-spinner fa-spin'></i> : "register"}
                                    </button>
                                    <button className='btn bg-danger text-capitalize text-white' type='reset' onClick={resetFormValues}>clear form</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}
export default Register;