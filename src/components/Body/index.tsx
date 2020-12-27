import React from 'react';
import Filter from './Filter';
import Products from './Products';

interface IProps {
    products?: IProduct[];
    count?: number;
    size?: string;
    sort?: string;
    sortByPrice: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    filterBySize: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface IProduct {
    id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    availableSizes: string[];
}

const Body: React.FC<IProps> = ({ products, count, size, sort, sortByPrice, filterBySize }): JSX.Element => {
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
                <div className="mt-2">
                    <Products products={products} />
                </div>
            </div>
            <div className="w-1/4">Cart Items</div>
        </div>
    );
};

export default Body;
