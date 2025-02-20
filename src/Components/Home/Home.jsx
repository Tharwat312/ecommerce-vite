import React from 'react'
import { Helmet } from 'react-helmet';
import Mainslider from '../Mainslider/Mainslider';
import Products from '../Products/Products';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
const Home = () => {

    return (
        <>
            <Mainslider />
            <CategoriesSlider />
            <Products />
            <Helmet>
                <title>Freshcart Home Page</title>
            </Helmet>
        </>
    )
}
export default Home;