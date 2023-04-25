import React from 'react';
import Cart from '../../components/Body/Cart';
import Filter from '../../components/Body/Filter';
import Products from '../../components/Body/Products';
import Loader from '../../components/ui/Loader';
import { IProduct } from '../../types/products/ActionTypes';

type IProps = {};

type IState = {
    isOpen: boolean;
    isLoading: boolean;
    products: IProduct[];
};

class ProductsPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { isOpen: false, isLoading: false, products: [] };
    }
    render() {
        const { isLoading, products } = this.state;
        return (
            <div className="mt-20">
                {!isLoading ? (
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
                ) : (
                    <div className="flex items-center justify-center text-center fixed bottom-1/2 w-full">
                        <Loader />
                    </div>
                )}
            </div>
        );
    }
}

export default ProductsPage;
