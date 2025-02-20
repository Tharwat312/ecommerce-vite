import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { TokenContext } from "./Token";

export let CartContext = createContext();
export default function CartContextProvider(props) {
    const [numCartItems, setNumCartItems] = useState(null);
    const [isEmpty, setIsEmpty] = useState(false);
    const [cartID, setCartID] = useState(null);
    const {setToken} = useContext(TokenContext);
    let headers = {
        token: localStorage.getItem('UserToken'),
    }
    function addProductToCartContext(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            productId
        }, { headers })
    }
    function getLoggedUserCartContext() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers });
    }
    function removeCartItemContext(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            headers
        })
    }
    function clearUserCartContext() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/`, {
            headers
        })
    }
    function updateQuantityContext(productid, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productid}`,
            { count },
            { headers });
    }
    async function getInitialCart() {
        if (localStorage.getItem('UserToken') !== null) {
            setToken(localStorage.getItem("UserToken"));
            getLoggedUserCartContext().then((response) => {
                setNumCartItems(response.data.numOfCartItems);
                setCartID(response.data.data._id);
            }).catch(() => {
                setIsEmpty(true);
            });
        }
    }
    useEffect(() => {
        getInitialCart();
    }, []);
    return <CartContext.Provider value={{
        addProductToCartContext, getLoggedUserCartContext,
        removeCartItemContext, clearUserCartContext, updateQuantityContext,
        numCartItems, setNumCartItems, getInitialCart,
        isEmpty, setIsEmpty, cartID, setCartID
    }}>
        {props.children}
    </CartContext.Provider>
}