import React from 'react';
import Cart from './Cart';
import Filter from './Filter';
import Products from './Products';

const Body = (): JSX.Element => {
    return (
        <div className="flex flex-row justify-between w-full">
            <div className="w-3/4">
                <div className="mx-10 mt-4">
                    <Filter />
                </div>
                <div className="mt-4 border-t-2 mx-4">
                    <Products />
                </div>
            </div>
            <div className="w-1/4">
                <Cart />
            </div>
        </div>
    );
};

export default Body;
