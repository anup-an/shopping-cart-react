import React from 'react';
import { Link } from 'react-router-dom';


class EmptyCart extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <svg
                        className="w-20 h-20 text-red-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                </div>
                <div className="flex flex-row text-gray-800 items-center justify-center">
                    <p>Cart is empty.</p>
                    <Link to='/' className="px-2 bg-blue-400 hover:bg-blue-800 text text-white flex items-center justify-center border rounded">Click here</Link>
                    <p> to browse for products.</p>
                </div>
            </div>

        )
    }
}

export default EmptyCart;