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
                <div className="border rounded shadow flex flex-col p-4">
                    <h2 className="text-gray-800 text-lg border text-center font-semibold">Cart Summary</h2>
                    <div className="flex flex-col space-y-2 m-2">
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
                            <p>€{cartItems
                                .map((item) => (item.count ? item.count * item.price : 0))
                                .reduce((accumulator, currentValue) => accumulator + currentValue)}</p>
                        </div>
                        <button
                            className="flex items-center justify-center boreder rounded bg-blue-400 hover:bg-blue-800 text-white p-2 focus:outline-none"
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