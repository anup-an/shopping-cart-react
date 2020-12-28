import React from 'react';
import Cart from './Cart';
import Filter from './Filter';
import Products from './Products';

interface IProps {
    products?: IProduct[];
    count?: number;
    size?: string;
    sort?: string;
    sortByPrice: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    filterBySize: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    addToCart: (product: IProduct) => void;
    removeFromCart: (item: ICart) => void;
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

const Body: React.FC<IProps> = ({
    products,
    count,
    size,
    sort,
    sortByPrice,
    filterBySize,
    addToCart,
    removeFromCart,
    cartItems,
}): JSX.Element => {
    return (
        <div className="flex flex-row justify-between w-full">
            <div className="w-3/4">
                <div className="mx-10 mt-4">
                    <Filter
                        count={count}
                        size={size}
                        sort={sort}
                        sortByPrice={sortByPrice}
                        filterBySize={filterBySize}
                    />
                </div>
                <div className="mt-4 border-t-2 mx-4">
                    <Products products={products} addToCart={addToCart} />
                </div>
            </div>
            <div className="w-1/4">
                <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
            </div>
        </div>
    );
};

export default Body;
