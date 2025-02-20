import React from 'react'
import Slider from 'react-slick';
import img1 from '../../assets/images/slider-image-1.jpeg'
import img2 from '../../assets/images/slider-image-2.jpeg'
import img3 from '../../assets/images/slider-image-3.jpeg'
const Mainslider = () => {
    let settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: false,
    };
    return (
        <>
            <section>
                <div className="container py-5 mt-5">
                    <div className="row">
                        <div className="col-md-8 p-0">
                            <Slider {...settings}>
                                <img src={img1} alt="" />
                                <img src={img2} alt="" />
                                <img src={img3} alt="" />
                            </Slider>
                        </div>
                        <div className="col-md-4 p-0">
                            <img src={img1} className='w-100 my-sm-4 my-md-0 my-lg-0' alt="" />
                            <img src={img3} className='w-100 my-sm-4 my-md-0 my-lg-0' alt="" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Mainslider;