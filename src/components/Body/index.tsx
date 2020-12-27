import React from 'react';
import Products from './Products';

interface IProps {
    products?: IProduct[];
}

interface IProduct {
    id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    availableSizes: string[];
}

const Body: React.FC<IProps> = ({ products }): JSX.Element => {
    return (
        <div className="flex flex-row justify-between w-full">
            <div className="w-3/4">
                <Products products={products} />
            </div>
            <div className="w-1/4">Cart Items</div>
        </div>
    );
};

export default Body;
