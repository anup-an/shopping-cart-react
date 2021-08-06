import React from 'react';

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
}
class CartSummary extends React.Component<IProps> {
    render() {
        const { cartItems } = this.props;
        return (
            <div>
                <div className="bg-gray-300 border flex flex-col">
                    <h2 className="px-2 py-2 text-gray-800 text-lg">Cart Summary</h2>
                    <div>
                        <div className="flex flex-row justify-between">
                            <p>Number of items: </p>
                            <p>{cartItems.length}</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p>Discount: </p>
                            <p>N/A</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p>Total: </p>
                            <p>{cartItems.length}</p>
                        </div>
                        <button
                            className="w-full flex items-center justify-center bg-blue-400 hover:bg-blue-800 text-white px-2 focus:outline-none"
                            type="button"
                        >
                            <p>Checkout</p>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CartSummary;