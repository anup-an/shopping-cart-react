import React from 'react';

import Cart from '../../components/Body/Cart';
import Filter from '../../components/Body/Filter';
import Products from '../../components/Body/Products';

class ProductsPage extends React.Component {
    render() {
        return (
            <div className="mt-20">
                <div className="flex flex-row justify-between w-full">
                    <div className="w-full xl:w-3/4">
                        <div className="mx-10 mt-4">
                            <Filter />
                        </div>
                        <div className="mt-4 border-t-2 mx-4 mb-16">
                            <Products />
                        </div>
                    </div>
                    <div className="hidden lg:block fixed right-0 lg:w-1/4">
                        <Cart />
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductsPage;
