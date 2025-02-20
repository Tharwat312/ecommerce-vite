import React from 'react'
import styles from './NotFound.module.css'
import errorImg from '../../assets/images/error.svg'
const NotFound = () => {
    return (
        <>
            <section className='container text-center my-5'>
                <img src={errorImg} alt="not found image" />
                <h2 className='fs-1'>Oops, This page is not found.</h2>
            </section>
        </>
    )
}
export default NotFound;