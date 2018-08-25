import React from 'react'

const LoadingSplash = () => {
    return (
        <React.Fragment>
            <br />
            <h1 className='text-center logo'>RhymeFlow</h1>
            <br />
            <h3 className='text-center'><i className="fa fa-spinner fa-spin"></i></h3>
        </React.Fragment>
    );
};

export default LoadingSplash;