import React, { useContext, useState } from 'react'
import styles from './Login.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { TokenContext } from '../../Context/Token';
const Login = () => {
    let navigate = useNavigate();
    let { setToken } = useContext(TokenContext);
    const [loader, setLoader] = useState(false);
    async function callLoginAPI(userData) {
        setLoader(true);
        await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, userData).then((response) => {
            setLoader(false);
            localStorage.setItem("UserToken", response.data.token);
            setToken(response.data.token);
            navigate("/");
        }).catch((error) => {
            setLoader(false);
            toast.error(error.response.data.message);
        });
    }
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email!').required("Email is required!"),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/, "Password must start with a capital letter, 3~8 chars").required("Password is required"),
    })
    const loginForm = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: callLoginAPI,
    })
    const resetFormValues = () => {
        loginForm.resetForm();
        toast.success("Cleared Form!");
    }
    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <Toaster />
            <section>
                <div className="container">
                    <div className="row">
                        <div className="w-75 mx-auto mt-5 py-5">
                            <h2 className='text-capitalize'>Login now!</h2>
                            <form onSubmit={loginForm.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email" className='mb-1'>Email:</label>
                                    <input type="email" id='email' value={loginForm.values.email} onBlur={loginForm.handleBlur} onChange={loginForm.handleChange} name='email' className='form-control' />
                                    {loginForm.errors.email && loginForm.touched.email ? <div className='alert alert-danger my-2'>{loginForm.errors.email}</div> : null}
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="password" className='mb-1'>Password:</label>
                                    <input type="password" id='password' value={loginForm.values.password} onBlur={loginForm.handleBlur} onChange={loginForm.handleChange} name='password' className='form-control' />
                                    {loginForm.errors.password && loginForm.touched.password ? <div className='alert alert-danger my-2'>{loginForm.errors.password}</div> : null}
                                </div>
                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                    <button className='btn bg-main text-capitalize text-white mb-4' type='submit'
                                        disabled={!(loginForm.isValid && loginForm.dirty && !loader)}>
                                        {loader ? <i className='fa fa-spinner fa-spin'></i> : "login"}
                                    </button>
                                    <Link className='btn btn-info text-white mb-4' to={'/forgetpw'}>Forgot password?</Link>
                                    <button className='btn bg-danger text-capitalize text-white mb-4' type='reset' onClick={resetFormValues}>clear form</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Login;