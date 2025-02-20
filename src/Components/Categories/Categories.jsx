import React from 'react'
import styles from './Categories.module.css'
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import axios from 'axios';
import Loader from 'Components/Loader/Loader';
const Categories = () => {
    const callCategoriesAPI = () => axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    let { data, isLoading } = useQuery('Categories', callCategoriesAPI);
    return (
        <>
            <Helmet>
                <title>Freshcart Categories Page</title>
            </Helmet>
            {isLoading ? <Loader /> :
                <section>
                    <h1 className='text-center text-capitalize py-5 mt-5'>shop by popular categories now</h1>
                    <div className="container">
                        <div className="row py-5 gy-5">
                            {data?.data?.data.map((category) => <div className='col-sm col-md-6 col-lg-3' key={category._id}>
                                <div className={`card cursor-pointer ${styles.card}`}>
                                    <div className="d-flex align-items-center justify-content-center flex-column">
                                        <img src={category.image} alt={`${category.name} category`} className='w-100' height={'400px'} />
                                        <h2 className='h4 p-3 text-main fw-bold'>{category.name}</h2>
                                    </div>
                                </div>
                            </div>)}
                        </div>
                    </div>
                </section>}
        </>
    )
}
export default Categories;