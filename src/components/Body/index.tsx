import React from 'react';
import Cart from './Cart';
import Filter from './Filter';
import Products from './Products';

interface IOrder {
    name: string;
    email: string;
    address: string;
    postalcode: string;
    city: string;
    country: string;
}

interface IProps {
    products?: IProduct[];
    count?: number;
    size?: string;
    sort?: string;
    addToCart: (product: IProduct) => void;
    removeFromCart: (item: ICart) => void;
    createOrder: (order: IOrder) => void;
    cartItems: ICart[];
}

interface ICart {
    id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    availableSizes: string[];
    count?: number;
}

interface IProduct {
    id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    availableSizes: string[];
    count?: number;
}

const Body: React.FC<IProps> = ({ removeFromCart, createOrder, cartItems }): JSX.Element => {
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
                <Cart cartItems={cartItems} removeFromCart={removeFromCart} createOrder={createOrder} />
            </div>
        </div>
    );
};

export default Body;
