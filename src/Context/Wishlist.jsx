import axios from 'axios';
import React, { createContext, useContext, useEffect } from 'react'
export let WishlistContext = createContext();
export default function WishlistContextProvider(props) {
    let headers = {
        token: localStorage.getItem('UserToken'),
    }
    function getLoggedWishListContext() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers
        })
    }
    function addProductToWishListContext(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId }, { headers })
    }
    function removeProductFromWishListContext(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers })
    }
    useEffect(() => {
        if (localStorage.getItem('UserToken') !== null) {
            getLoggedWishListContext();
        }
    }, [])
    return (
        <WishlistContext.Provider value={{ getLoggedWishListContext, addProductToWishListContext, removeProductFromWishListContext }}>
            {props.children}
        </WishlistContext.Provider>
    )
}
