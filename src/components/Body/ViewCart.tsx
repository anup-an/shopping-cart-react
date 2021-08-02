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
    cartIndex: number;
}

class ViewCart extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { cartIndex: 0};
    }
    scrollUpCart = (cartIndex: number) => {
        if (this.props.cartItems.length > 5) {
            cartIndex < this.props.cartItems.length - 5 ? this.setState({ cartIndex: this.state.cartIndex + 1 }) : '';
        }        
    }
    scrollDownCart = (cartIndex: number) => {
        if (this.props.cartItems.length > 5) {
            cartIndex < this.props.cartItems.length && cartIndex > 0 ? this.setState({ cartIndex: this.state.cartIndex - 1 }) : '';
        }
        
    }
    render() {
        const { cartItems, handleRemoveFromCart } = this.props;
        const { cartIndex } = this.state;
        return (
            <div className="flex flex-col">
                <div className="flex flex-row justify-center h-16 items-center border-b-2 mx-4">
                    <div className="text-sm">{cartItems.length} items in cart</div>
                </div>
                
                <ul className="mx-5 flex flex-col space-y-4 text-sm mt-4">
                    <li>
                        <button
                            type="button"
                            className={`border shadow 
                                        ${cartIndex < this.props.cartItems.length - 5 && this.props.cartItems.length > 5 ? 'visible':'invisible'}
                                        w-3/4 text text-gray-500 hover:text-white hover:bg-blue-800 focus:outline-none
                                        flex items-center justify-center`}
                            onClick={() => this.scrollUpCart(cartIndex)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                className="w-5 h-5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                            </svg>
                        </button>

                    </li>
                    {cartItems.map((item, index) => (index >= cartIndex && index < cartIndex + 5) ? (
                        <Slide direction="right" key={item._id}>
                            <li key={item._id} className="flex flex-row items-center space-x-2">
                                <div className="flex flex-row justify-between border shadow  p-2 items-center text-sm space-x-2 w-3/4">
                                    <div>
                                        <img
                                            className="w-20 h-auto"
                                            loading="eager"
                                            src={`${item.image}`}
                                            alt={`${item.title}`}
                                        />
                                        <div className="hidden lg:block">{item.title}</div>
                                    </div>
                                    <div className="hidden lg:block">
                                        {item.count} x €{item.price}
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
                    ) : '')}
                <li>
                    <button
                        type="button"
                        className={`border shadow 
                            ${cartIndex < this.props.cartItems.length && cartIndex > 0 && this.props.cartItems.length > 5 ? 'visible':'invisible'}
                            w-3/4 text text-gray-500 hover:text-white hover:bg-blue-800 focus:outline-none
                            flex items-center justify-center`}
                        onClick={() => this.scrollDownCart(cartIndex)}
                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        className="w-5 h-5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                    </svg>
                </button>    
                </li>
                </ul>
                    
            </div>

        )
    }
}

export default ViewCart;