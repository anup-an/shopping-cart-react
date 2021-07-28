import React from 'react';
import { Slide } from 'react-awesome-reveal';
import Modal from 'react-modal';
import Checkout from './Checkout';


export type IProduct = {
    _id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    availableSizes: string[];
};

export type ICart = {
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
    handleRemoveFromCart: (item: ICart) => void;
}

interface IState {
    isOpen: boolean;
}
class ViewCart extends React.Component <IProps, IState> {
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
    render() {
        const { cartItems, handleRemoveFromCart} = this.props;
        return (
            <div className="flex flex-col overflow-y-auto">
                <div className="flex flex-row justify-center h-16 items-center border-b-2 mx-4">
                <div className="text-sm">{cartItems.length} items in cart</div>
                </div>
                <ul className="mx-5 flex flex-col space-y-4 text-sm mt-4">
                    {cartItems.map((item) => (
                        <Slide direction="right" key={item._id}>
                            <li key={item._id} className="flex flex-row items-center space-x-2">
                                <div className="flex flex-row justify-between border shadow  p-2 items-center text-sm space-x-2">
                                    <img
                                        className="w-20 h-auto"
                                        loading="eager"
                                        src={`${item.image}`}
                                        alt={`${item.title}`}
                                    />
                                    <div className="hidden lg:block">{item.title}</div>
                                    <div className="hidden lg:block">
                                        {item.count} x ${item.price}
                                    </div>
                                </div>
                                <button onClick={() => handleRemoveFromCart(item)} type="button">
                                    
                                    <svg
                                        className="w-4 h-4 sm:w-6 sm:h-6 text-red-400"
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
                    <div className="flex flex-col md:flex-row justify-between items-center mx-5 mt-10 text-sm">
                        <div>
                            Total: $
                            {cartItems
                                .map((item) => (item.count ? item.count * item.price : 0))
                                .reduce((accumulator, currentValue) => accumulator + currentValue)}
                        </div>
                        <button
                            onClick={this.openModal}
                            className="bg-blue-400 hover:bg-blue-800 border rounded text-white p-2 focus:outline-none"
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
                        isOpen={this.state.isOpen}
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
                        <Checkout cartItems={cartItems} />
                    </Modal>
                </div>
            </div>

        )
    }
}

export default ViewCart;