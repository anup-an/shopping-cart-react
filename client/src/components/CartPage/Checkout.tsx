import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { uuid } from 'uuidv4';

import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { IUser } from '../../ActionTypes';
import { removeAllFromCart } from '../../actions/cartAction';
import { removeAllFromUserCart } from '../../actions/userAction';
import { makeOrder } from '../../api/order';
import { useMapData } from '../../types/mapDataTypes';
import { AppNotification } from '../../types/notifications/ActionTypes';
import { displayNotification } from '../../actions/notificationAction';

interface IProps extends RouteComponentProps {
  cartItems: ICart[];
  user: IUser;
  action: Action;
}

interface IOrder {
  _id: string;
  user_id: string;
  name: string;
  email: string;
  address: string;
  postcode: string;
  city: string;
  country: string;
}

interface IState {
  name: string;
  email: string;
  address: string;
  postcode: string;
  city: string;
  country: string;
  isSubmitted: boolean;
  isModalOpen: boolean;
}

interface ICart {
  _id: string;
  title: string;
  image: string;
  description: string;
  price: number;
  availableSizes: string[];
  count?: number;
}

interface Action {
  removeAllFromUserCart: () => Promise<void>;
  removeAllFromCart: () => Promise<void>;
  displayNotification: (notification: AppNotification) => Promise<void>;
}

class Checkout extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      name: '',
      email: '',
      address: '',
      postcode: '',
      city: '',
      country: '',
      isSubmitted: false,
      isModalOpen: false,
    };
  }

  closeModal = (): void => {
    this.setState({ isModalOpen: false });
  };

  generateOrder = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      event.preventDefault();
      const { name, email, address, postcode, city, country } = this.state;
      const { user, history } = this.props;
      const order = {
        name: name,
        user_id: user._id,
        email: email,
        address: address,
        postcode: postcode,
        city: city,
        country: country,
        cart: user.cart,
      };
      if (user._id) {
        const result = await makeOrder(order);
        useMapData(
          result,
          async () => {
            this.setState({ ...this.state, isSubmitted: true });
            this.props.action.displayNotification({
              id: uuid(),
              title: 'Order sent',
              description: 'You have successfully submitted your order.',
              type: 'success',
            });

            await Promise.all([this.props.action.removeAllFromUserCart(), this.props.action.removeAllFromCart()]);
          },
          (error) => {
            this.props.action.displayNotification({
              id: uuid(),
              title: 'Order failed',
              description: 'Something went wrong. Please try again.',
              type: 'failure',
            });
          },
        );
      } else {
        this.setState({ ...this.state, isModalOpen: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  render(): JSX.Element {
    const { isSubmitted } = this.state;
    const { cartItems } = this.props;
    if (isSubmitted || cartItems.length === 0) {
      return <></>;
    }
    return (
      <div className="mx-5 z-20">
        <div className="text-sm mb-4"> (Fill in the details and click submit to place order)</div>
        <form className="flex flex-col space-y-4" onSubmit={this.generateOrder}>
          <div>
            <label htmlFor="name" className=" flex flex-col">
              {' '}
              <div>Full Name</div>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Type here"
                className="p-2 border rounded"
                required
                onChange={this.handleInput}
              />
            </label>
          </div>
          <div>
            <label htmlFor="email" className="flex flex-col">
              {' '}
              <div>E-mail</div>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Type here"
                className="p-2 border rounded"
                required
                onChange={this.handleInput}
              />
            </label>
          </div>
          <div>
            <label htmlFor="address" className=" flex flex-col">
              {' '}
              <div>Address</div>
              <input
                type="text"
                id="address"
                name="address"
                required
                placeholder="Type here"
                className="p-2 border rounded"
                onChange={this.handleInput}
              />
            </label>
          </div>
          <div>
            <label htmlFor="postcode" className=" flex flex-col">
              {' '}
              <div>Postal code</div>
              <input
                type="text"
                id="postcode"
                name="postcode"
                placeholder="Type here"
                className="p-2 border rounded"
                required
                onChange={this.handleInput}
              />
            </label>
          </div>
          <div>
            <label htmlFor="city" className=" flex flex-col">
              {' '}
              <div>City</div>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Type here"
                className="p-2 border rounded"
                required
                onChange={this.handleInput}
              />
            </label>
          </div>
          <div>
            <label htmlFor="country" className=" flex flex-col">
              {' '}
              Country
              <input
                type="text"
                id="country"
                name="country"
                required
                placeholder="Type here"
                className="p-2 border rounded"
                onChange={this.handleInput}
              />
            </label>
          </div>
          <div className="pb-2 pt-2 flex justify-start">
            <button type="submit" className="p-2 bg-blue-400 hover:bg-blue-800 text-white border rounded">
              Submit
            </button>
          </div>
        </form>
        <div>
          <Modal
            isOpen={this.state.isModalOpen}
            onRequestClose={this.closeModal}
            overlayClassName="fixed inset-0 flex justify-center items-center z-20 bg-blue-800 bg-opacity-75"
            className="relative h-4/5 w-4/5 bg-white overflow-y-auto rounded-lg focus:outline-none"
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="absolute w-full flex flex-col items-center mt-20">
              <img src="/images/undraw_secure_login_pdn4.svg" className="h-64" />
              <Link
                to={{ pathname: '/login', state: { redirectPath: '/cart' } }}
                className="w-40 px-2 bg-blue-400 hover:bg-blue-800 text text-white flex items-center justify-center border rounded"
              >
                Go to login
              </Link>
              <p className="text-center text-semibold mt-2">Please login to continue...</p>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any): { action: Action } => ({
  action: {
    removeAllFromUserCart: () => dispatch(removeAllFromUserCart()),
    removeAllFromCart: () => dispatch(removeAllFromCart()),
    displayNotification: (notification: AppNotification) => dispatch(displayNotification(notification)),
  },
});

export default withRouter(connect(null, mapDispatchToProps)(Checkout));
