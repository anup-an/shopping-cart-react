import React from 'react';

interface IProps {
    count?: number;
    sort?: string;
    size?: string;
    sortByPrice: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    filterBySize: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Filter: React.FC<IProps> = ({ count, sort, size, sortByPrice, filterBySize }): JSX.Element => {
    return (
        <div className="flex flex-row justify-between items-center">
            <div>{count} Products</div>
            <div>
                Order{' '}
                <select className="border rounded p-1 border-gray-300" value={sort} onChange={sortByPrice}>
                    <option value="Newest">Newest</option>
                    <option value="Lowest">Lowest</option>
                    <option value="Highest">Highest</option>
                </select>
            </div>
            <div>
                Filter{' '}
                <select className="border rounded p-1 border-gray-300" value={size} onChange={filterBySize}>
                    <option value="ALL">ALL</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                </select>
            </div>
        </div>
    );
};

export default Filter;
