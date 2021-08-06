import React from 'react';
import Modal from 'react-modal';
import Checkout from './Checkout';


interface IProps {
    cartItems: ICart[];
}
interface IState {
    isOpen: boolean;
}

export type ICart = {
    _id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    availableSizes: string[];
    count?: number;
};

class CartSum extends React.Component<IProps, IState>{
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
        const { cartItems } = this.props;
        return (
            <div>
                {cartItems.length > 0 ? (
                    <div className="flex flex-col md:flex-row justify-between items-center mx-5 mt-10 text-sm">
                        <div>
                            Total: €
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

export default CartSum;