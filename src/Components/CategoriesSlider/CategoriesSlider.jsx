import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import Slider from 'react-slick';
import Loader from '../Loader/Loader';
const CategoriesSlider = () => {
    function callCategoriesAPI() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    }
    let { data, isLoading } = useQuery('Categories', callCategoriesAPI)
    let settings = {
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 8,
        slidesToScroll: 1,
        arrows: false,
        autoplay: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    dots: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                }
            }
        ]
    };
    return (
        <>
            {isLoading ? <Loader /> :
                <section>
                    <div className="container">
                        <h2 className='text-capitalize py-3'>shop popular categories</h2>
                        <Slider {...settings}>
                            {data?.data.data.map((category) =>
                                <div className="item px-1" key={category._id}>
                                    <img src={category.image} height={'200px'} className='w-100 py-1' alt="" />
                                    <h5>{category.name}</h5>
                                </div>
                            )}
                        </Slider>
                    </div>
                </section>}
        </>
    )
}
export default CategoriesSlider;