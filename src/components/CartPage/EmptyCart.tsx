import React from 'react';
import { Link } from 'react-router-dom';

class EmptyCart extends React.Component {
    render() {
        return (
            <div className="md:mt-20">
                <p className="mb-2">Your shopping cart is empty.</p>
                <div>
                    <img alt="Empty cart" src="/images/undraw_empty_cart_co35.svg" className="h-64" />
                </div>
                <div className="mt-4 text-center text-gray-800 items-center justify-center">
                    <div className="flex flex-row">
                        <Link
                            to="/"
                            className="px-2 bg-blue-400 hover:bg-blue-800 text text-white flex items-center justify-center border rounded"
                        >
                            Click here
                        </Link>
                        <p className="ml-1"> to browse for products.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default EmptyCart;
