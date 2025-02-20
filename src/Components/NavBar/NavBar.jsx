import React, { useContext } from 'react'
import styles from './NavBar.module.css'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.svg'
import { TokenContext } from '../../Context/Token';
import { CartContext } from '../../Context/Cart';
const NavBar = () => {
    let navigate = useNavigate();
    let { token, setToken } = useContext(TokenContext);
    let { numCartItems } = useContext(CartContext);
    function logUserOut() {
        localStorage.removeItem("UserToken");
        setToken(null);
        navigate("/login");
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to={"/"}>
                        <img src={logo} alt="main site logo" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {token ? (<ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to={"/"}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"products"}>Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"categories"}>Categories</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"brands"}>Brands</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link position-relative" to={"cart"}>Cart
                                    <i className="fa-solid fa-cart-shopping text-main"></i>
                                    <span className='badge text-main position-absolute top-0 start-100 translate-middle-x'>
                                        {numCartItems}
                                    </span>
                                </Link>
                            </li>
                        </ul>) : null}
                        <ul className='navbar-nav ms-auto'>
                            <li className='align-self-start fs-5'>
                                <i className='fa-brands fa-instagram p-1 cursor-pointer'></i>
                                <i className='fa-brands fa-facebook p-1 cursor-pointer'></i>
                                <i className='fa-brands fa-tiktok p-1 cursor-pointer'></i>
                                <i className='fa-brands fa-twitter p-1 cursor-pointer'></i>
                            </li>
                            {token ?
                                <>
                                    <li className="nav-item">
                                        <button className="nav-link" onClick={logUserOut}>Logout</button>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/wishlist"}>
                                            <span className='mx-1'>Wishlist</span>
                                            <i className="fa-solid fa-heart text-main"></i>
                                        </Link>
                                    </li>
                                </>
                                : <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"register"}>Register</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"login"}>Login</Link>
                                    </li>
                                </>}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default NavBar;