import React from 'react';
import { Slide } from 'react-awesome-reveal';
import Modal from 'react-modal';
import Checkout from './Checkout';
import Counter from '../CartPage/Counter';


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
    count: number;
};


interface IProps {
    cartItems: ICart[];
    handleRemoveFromCart: (item: ICart) => void;
    handleDecrement: (item: IProduct) => void;
    handleIncrement: (item: IProduct) => void;
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
        if (this.props.cartItems.length > 4) {
            cartIndex < this.props.cartItems.length - 4 ? this.setState({ cartIndex: this.state.cartIndex + 1 }) : '';
        }        
    }
    scrollDownCart = (cartIndex: number) => {
        if (this.props.cartItems.length > 4) {
            cartIndex < this.props.cartItems.length && cartIndex > 0 ? this.setState({ cartIndex: this.state.cartIndex - 1 }) : '';
        }
        
    }
    render() {
        const { cartItems, handleRemoveFromCart, handleDecrement, handleIncrement } = this.props;
        const { cartIndex } = this.state;
        return (
            <div className="flex flex-col hidden xl:block">
                <div className="flex flex-row justify-center h-16 items-center border-b-2 mx-4">
                    <div className="text-sm">{cartItems.length} items in cart</div>
                </div>
                
                <ul className="mx-5 flex flex-col space-y-4 text-sm mt-4">
                    <li className="flex justify-center">
                        <button
                            type="button"
                            className={`border shadow 
                                        ${cartIndex < this.props.cartItems.length - 4 && this.props.cartItems.length > 4 ? 'visible':'invisible'}
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
                    {cartItems.map((item, index) => (index >= cartIndex && index < cartIndex + 4) ? (
                        <Slide direction="right" key={item._id}>
                            <li key={item._id} className="flex flex-row space-x-2 justify-center">
                                <div className="flex flex-row border shadow p-2 text-sm space-x-2 w-3/4">
                                    <div>
                                        <img
                                            loading="eager"
                                            src={`${item.image}`}
                                            alt={`${item.title}`}
                                        />
                                        
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <div className="hidden lg:block h-2/3">{item.title}</div>
                                        <div className="flex flex-row items-center space-x-2">
                                            <button 
                                                onClick={() => handleRemoveFromCart(item)} 
                                                type="button"
                                            >
                                                <svg 
                                                    className="text-red-500 w-6 h-6 hover:bg-red-500 hover:text-white"
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round" 
                                                        strokeWidth="2" 
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    />
                                                </svg>
                                            </button>
                                            <Counter 
                                                handleDecrement={handleDecrement} 
                                                handleIncrement={handleIncrement} 
                                                item={item}
                                            />
                                            <div className="hidden lg:block">
                                                €{item.price}
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                
                            </li>
                        </Slide>
                    ) : '')}
                <li className="flex justify-center">
                    <button
                        type="button"
                        className={`border shadow 
                            ${cartIndex < this.props.cartItems.length && cartIndex > 0 && this.props.cartItems.length > 4 ? 'visible':'invisible'}
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