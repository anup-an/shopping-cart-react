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
        <ul className="flex flex-col text-sm">
          {cartItems.map((item, index) => (
            <li
              key={item._id}
              className={`relative flex flex-col space-y-4 sm:space-y-0 sm:flex-row justify-between p-4 ${
                index < cartItems.length - 1 ? 'border-b-2' : ''
              }`}
            >
              <div className="flex lg:items-center justify-center sm:w-1/3">
                <img loading="eager" src={`${item.image}`} alt={`${item.title}`} />
              </div>
              <div className="h-full sm:w-2/3 pl-2 space-y-2 sm:space-y-0">
                <div className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0">
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p>PRICE: €{item.price}</p>
                  </div>
                  <div className="flex lg:items-start">
                    <Counter handleIncrement={handleIncrement} handleDecrement={handleDecrement} item={item} />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="sm:absolute bottom-4 flex items-end">
                    <button
                      onClick={() => handleRemoveFromCart(item)}
                      type="button"
                      className="flex flex-row items-center"
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
                      <p className="hidden sm:block">REMOVE ITEM</p>
                    </button>
                  </div>
                  <div className="sm:absolute bottom-4 right-2 flex flex-row items-end">
                    <p>TOTAL: €{item.count * item.price}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default CartDisplay;
