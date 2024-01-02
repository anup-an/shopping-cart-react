import axios from 'axios';
import React from 'react';
import { Fade } from 'react-awesome-reveal';
import { connect } from 'react-redux';

import { RouteComponentProps, withRouter } from 'react-router-dom';
import { IUser } from '../../ActionTypes';
import { removeAllFromCart } from '../../actions/cartAction';
import { removeAllFromUserCart } from '../../actions/userAction';
import { makeOrder } from '../../api/order';
import { isSuccess } from '../../types/mapDataTypes';

axios.defaults.withCredentials = true;

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
        };
    }

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
            const result = await makeOrder(order);
            if (isSuccess(result)) {
                this.setState({ ...this.state, isSubmitted: true });
                await Promise.all([this.props.action.removeAllFromUserCart(), this.props.action.removeAllFromCart()]);
                history.push('/');
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
        return (
            <div className="mx-5 p-2 z-20">
                {isSubmitted ? (
                    <div>Order submitted successfully</div>
                ) : (
                    <Fade>
                        <div className="text-2xl font-medium text-center text-blue-500">Checkout Form</div>
                        <div className="text-center text-sm mb-4">
                            {' '}
                            (Fill in the details and click submit to place order)
                        </div>
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
                            <div className="pb-2 pt-2 flex justify-center">
                                <button
                                    type="submit"
                                    className="p-2 bg-blue-400 hover:bg-blue-800 text-white border rounded"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </Fade>
                )}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: any): { action: Action } => ({
    action: {
        removeAllFromUserCart: () => dispatch(removeAllFromUserCart()),
        removeAllFromCart: () => dispatch(removeAllFromCart()),
    },
});

export default withRouter(connect(null, mapDispatchToProps)(Checkout));