import React from 'react';

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
}
const Cart: React.FC<IProps> = ({ cartItems, removeFromCart }) => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-center h-16 items-center border-b-2 mx-4">
                <div>You have {cartItems.length} items in the cart </div>
            </div>
            <ul className="mx-5 flex flex-col space-y-4 text-sm mt-4">
                {cartItems.map((item) => (
                    <li key={item.id} className="flex flex-row items-center space-x-2">
                        <div className="flex flex-row justify-between border shadow  p-2 items-center text-sm space-x-2">
                            <img className="w-20 h-auto" src={`${item.image}`} alt={`${item.title}`} />
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
                ))}
            </ul>
            {cartItems.length !== 0 ? (
                <div className="flex flex-row justify-between items-center mx-5 mt-10">
                    <div>
                        Total: $
                        {cartItems
                            .map((item) => (item.count ? item.count * item.price : 0))
                            .reduce((accumulator, currentValue) => accumulator + currentValue)}
                    </div>
                    <button className="bg-blue-400 hover:bg-blue-800 border rounded text-white p-2" type="button">
                        Checkout
                    </button>
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

export default Cart;
