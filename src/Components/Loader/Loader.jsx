import React from 'react'
import { Hourglass } from 'react-loader-spinner';
const Loader = () => {

    return (
        <>
        <div className="container text-center py-5 mt-5">
        <Hourglass
                visible={true}
                height="100"
                width="100"
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass=""
                colors={['#000', '#0aad0a']}
            />
        </div>
        </>
    )
}
export default Loader;