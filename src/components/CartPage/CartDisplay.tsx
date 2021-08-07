import React from 'react';
import Modal from 'react-modal';

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
}
interface IState {
    cartIndex: number;
}

class CartDisplay extends React.Component<IProps> {

    render() {
        const { cartItems, handleRemoveFromCart } = this.props;
        return (
            <div>
                
                <ul className="mx-5 flex flex-col space-y-4 text-sm mt-4">
                    
                    {cartItems.map((item) => (
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
                    ))}
                
                </ul>
                    
            </div>

        )
    }
}

export default CartDisplay;