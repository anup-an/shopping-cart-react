import React from 'react';
import Modal from 'react-modal';
import Counter from './Counter';
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
    handleIncrement: (item: IProduct) => void;
    handleDecrement: (item: IProduct) => void;
}
interface IState {
    cartIndex: number;
}

class CartDisplay extends React.Component<IProps> {

    render() {
        const { cartItems, handleRemoveFromCart, handleIncrement, handleDecrement } = this.props;
        return (
            <div>
                
                <ul className="flex flex-col text-sm p-2 lg:p-4">
                    
                    {cartItems.map((item, index) => (
                            <li key={item._id} className={`flex flex-row justify-between items-center ${index < cartItems.length - 1 ? 'border-b': ''}`}>
                                
                                <div className="grid grid-cols-2 lg:grid-cols-3 grid-flow-row gap-4 p-4 w-full">
                                    <div className="flex lg:items-center justify-center p-2">
                                        <img
                                            className="w-auto lg:w-full h-1/2 lg:h-auto"                                       
                                            loading="eager"
                                            src={`${item.image}`}
                                            alt={`${item.title}`}
                                        />
                                    </div>
                                    <div className="grid grid-rows-2">
                                        <div>
                                            <p className="lg:text-lg font-semibold">{item.title}</p>
                                            <p>PRICE: €{item.price}</p>
                                        </div>
                                        <div className="flex items-end">
                                            <button 
                                                onClick={() => handleRemoveFromCart(item)} 
                                                type="button"
                                                className="flex flex-row"
                                            >
                                                <svg 
                                                    className="text-red-500 w-5 h-5 hover:bg-red-500 hover:text-white"
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
                                                <p>REMOVE ITEM</p>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-rows-2">
                                        <div className="flex lg:items-start">
                                            <Counter 
                                                handleIncrement={handleIncrement} 
                                                handleDecrement={handleDecrement}
                                                item={item}
                                            />
                                        </div>
                                        <div className="flex flex-row items-end">
                                            <p>TOTAL: €{item.count* item.price}</p>
                                        
                                        </div>
                                    </div>
                                    

                                </div>
                                
                            </li>
                    ))}
                
                </ul>
                    
            </div>

        )
    }
}

export default CartDisplay;