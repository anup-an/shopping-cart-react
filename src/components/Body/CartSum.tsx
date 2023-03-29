import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Checkout from './Checkout';
import { IUser } from '../../ActionTypes';

interface IProps extends RouteComponentProps {
    cartItems: ICart[];
    user: IUser;
}

export type ICart = {
    _id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    availableSizes: string[];
    count?: number;
};

class CartSum extends React.Component<IProps> {
    render() {
        const { cartItems, history } = this.props;
        return (
            <div className="hidden xl:block">
                {cartItems.length > 0 ? (
                    <div className="flex flex-col md:flex-row justify-between items-center mx-5 mt-10 text-sm">
                        <div>
                            Total: €
                            {cartItems
                                .map((item) => (item.count ? item.count * item.price : 0))
                                .reduce((accumulator, currentValue) => accumulator + currentValue)}
                        </div>
                        <button
                            onClick={() => history.push('/cart')}
                            className="bg-blue-400 hover:bg-blue-800 border rounded text-white p-2 focus:outline-none"
                            type="button"
                        >
                            Go To Cart
                        </button>
                    </div>
                ) : (
                    ''
                )}
            </div>
        );
    }
}

export default withRouter(CartSum);
