import React from 'react';
import Modal from 'react-modal';
import { IUser } from '../../ActionTypes';
import Login from '../Header/login';
import Checkout from './Checkout';
import { Link } from 'react-router-dom';

type ICart = {
    _id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    availableSizes: string[];
    count?: number;
};

interface IProps {
    cartItems: ICart[];
    user: IUser;
}

interface IState {
    isOpen: boolean;
}

class CartSummary extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { isOpen: false };
    }
    closeModal = (): void => {
        this.setState({ isOpen: false });
    };

    openModal = (): void => {
        this.setState({ isOpen: true });
    };

    getTotalPrice = () => {
        return this.props.cartItems.length
            ? this.props.cartItems
                  .map((item) => (item.count ? item.count * item.price : 0))
                  .reduce((accumulator, currentValue) => accumulator + currentValue)
            : 0;
    };
    render() {
        const { cartItems, user } = this.props;
        return (
            <div>
                <div className="border rounded shadow flex flex-col p-5">
                    <h2 className="text-gray-800 text-lg border text-center font-semibold">Cart Summary</h2>
                    <div className="flex flex-col space-y-8 m-2 mt-4">
                        <div>
                            <div className="flex flex-row justify-between">
                                <p>Number of items: </p>
                                <p>{cartItems.length}</p>
                            </div>
                            <div className="flex flex-row justify-between mt-3">
                                <p>Total: </p>
                                <p>{this.getTotalPrice()}€</p>
                            </div>
                        </div>
                        <button
                            className="flex items-center justify-center boreder rounded bg-blue-400 hover:bg-blue-800 text-white p-2 focus:outline-none"
                            type="button"
                            onClick={this.openModal}
                        >
                            <p>Checkout</p>
                        </button>
                    </div>
                </div>
                <div>
                    <Modal
                        isOpen={this.state.isOpen}
                        onRequestClose={this.closeModal}
                        overlayClassName="fixed inset-0 flex justify-center items-center z-20 bg-blue-800 bg-opacity-75"
                        className="relative h-4/5 w-4/5 bg-white overflow-y-auto rounded-lg focus:outline-none"
                    >
                        <div className="p-1">
                            <div className="flex justify-end">
                                <button onClick={this.closeModal} type="button">
                                    <svg
                                        className="w-6 h-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        {user._id ? (
                            <Checkout cartItems={cartItems} user={user} />
                        ) : (
                            <div className="absolute w-full flex flex-col items-center mt-20">
                                <img src="/images/undraw_secure_login_pdn4.svg" className="h-64" />
                                <Link
                                    to={{ pathname: '/login', state: { redirectPath: '/cart' } }}
                                    className="w-40 px-2 bg-blue-400 hover:bg-blue-800 text text-white flex items-center justify-center border rounded"
                                >
                                    Go to login
                                </Link>
                                <p className="text-center text-semibold mt-2">Please login to continue...</p>
                            </div>
                        )}
                    </Modal>
                </div>
            </div>
        );
    }
}

export default CartSummary;
