import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Slide } from 'react-awesome-reveal';
import Modal from 'react-modal';
import Checkout from './Checkout';

Modal.setAppElement('#root');

interface IProduct {
    id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    availableSizes: string[];
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

interface IProps {
    products?: IProduct[];
    count?: number;
    size?: string;
    sort?: string;
    cartItems: ICart[];
    removeFromCart: (item: ICart) => void;
    createOrder: (order: IOrder) => void;
}

interface IOrder {
    name: string;
    email: string;
    address: string;
    postalcode: string;
    city: string;
    country: string;
}

interface IState {
    isOpen: boolean;
}
class Cart extends React.Component<IProps, IState> {
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

    render(): JSX.Element {
        const { cartItems, removeFromCart, createOrder } = this.props;
        const { isOpen } = this.state;
        return (
            <div className="flex flex-col">
                <div className="flex flex-row justify-center h-16 items-center border-b-2 mx-4">
                    <div>You have {cartItems.length} items in the cart </div>
                </div>
                <ul className="mx-5 flex flex-col space-y-4 text-sm mt-4">
                    {cartItems.map((item) => (
                        <Slide direction="right" key={item.id}>
                            <li key={item.id} className="flex flex-row items-center space-x-2">
                                <div className="flex flex-row justify-between border shadow  p-2 items-center text-sm space-x-2">
                                    <img
                                        className="w-20 h-auto"
                                        loading="eager"
                                        src={`${item.image}`}
                                        alt={`${item.title}`}
                                    />
                                    <div>{item.title}</div>
                                    <div>
                                        {item.count} x ${item.price}
                                    </div>
                                </div>
                                <button onClick={() => removeFromCart(item)} type="button">
                                    <svg
                                        className="w-6 h-6 text-red-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </button>
                            </li>
                        </Slide>
                    ))}
                </ul>
                {cartItems.length > 0 ? (
                    <div className="flex flex-row justify-between items-center mx-5 mt-10">
                        <div>
                            Total: $
                            {cartItems
                                .map((item) => (item.count ? item.count * item.price : 0))
                                .reduce((accumulator, currentValue) => accumulator + currentValue)}
                        </div>
                        <button
                            onClick={this.openModal}
                            className="bg-blue-400 hover:bg-blue-800 border rounded text-white p-2"
                            type="button"
                        >
                            Checkout
                        </button>
                    </div>
                ) : (
                    ''
                )}
                <div>
                    <Modal
                        isOpen={isOpen}
                        onRequestClose={this.closeModal}
                        overlayClassName="fixed inset-0 flex justify-center items-center bg-blue-800 bg-opacity-75"
                        className="relative bg-white overflow-y-auto rounded-lg focus:outline-none"
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
                        <Checkout cartItems={cartItems} createOrder={createOrder} />
                    </Modal>
                </div>
            </div>
        );
    }
}

export default Cart;
