import React from 'react';
import { IUser } from '../../ActionTypes';
import Checkout from './Checkout';

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
  user: IUser;
}

interface IState {
  isOpen: boolean;
}

class CartSummary extends React.Component<IProps, IState> {
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

  getTotalPrice = () => {
    return this.props.cartItems.length
      ? this.props.cartItems
          .map((item) => (item.count ? item.count * item.price : 0))
          .reduce((accumulator, currentValue) => accumulator + currentValue)
      : 0;
  };
  render() {
    const { cartItems, user } = this.props;
    return (
      <div>
        <div className="border rounded shadow flex flex-col p-5">
          <h2 className="text-blue-800 text-lg border text-center font-semibold">Cart Summary</h2>
          <div className="flex flex-col space-y-8 m-2 mt-4">
            <div>
              <div className="flex flex-row justify-between">
                <p>Number of items: </p>
                <p>{cartItems.length}</p>
              </div>
              <div className="flex flex-row justify-between mt-3">
                <p>Total: </p>
                <p>{this.getTotalPrice()}€</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Checkout cartItems={cartItems} user={user} />
        </div>
      </div>
    );
  }
}

export default CartSummary;
