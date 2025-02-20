import React from 'react'
const ProductPriceRating = (props) => {
    return (
        <>
            <div className="d-flex align-items-center justify-content-between my-3">
                <p className='mb-0'><span className='fw-bold'>{props.productPrice}</span> EGP</p>
                <span><i className='fa-solid fa-star rating-color'></i>{props.productRating}</span>
            </div>
        </>
    )
}
export default ProductPriceRating;