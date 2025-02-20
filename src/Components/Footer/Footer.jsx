import React from 'react'
import styles from './Footer.module.css'
const Footer = () => {
    return (
        <>
            <footer className='bg-main-light py-3 text-center'>
                <div className="container">
                    <h5 className='text-capitalize'>get the FreshCart app</h5>
                    <p>We will send you a link, open it with your phone to download the app</p>
                    <div className='d-flex align-items-center justify-content-center flex-wrap w-50 mx-auto py-3'>
                        <input className='form-control w-100 mb-3' type="email" name="email" placeholder='Please enter your email' />
                        <button className='btn btn-info text-white text-capitalize'>send email</button>
                    </div>
                </div>
            </footer>
        </>
    )
}
export default Footer;