/* eslint-disable react/no-unused-state */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Slide } from 'react-awesome-reveal';

interface IProps {
    cartItems: ICart[];
    createOrder: (order: IOrder) => void;
}

interface IOrder {
    name: string;
    email: string;
    address: string;
    postalcode: string;
    city: string;
    country: string;
}

interface IState {
    name: string;
    email: string;
    address: string;
    postalcode: string;
    city: string;
    country: string;
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

class Checkout extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            name: '',
            email: '',
            address: '',
            postalcode: '',
            city: '',
            country: '',
        };
    }

    generateOrder = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const { name, email, address, postalcode, city, country } = this.state;
        const { createOrder } = this.props;
        const order = {
            name,
            email,
            address,
            postalcode,
            city,
            country,
            cartItems: this.props,
        };
        createOrder(order);
    };

    handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState((state) => ({
            ...state,
            [event.target.name]: event.target.value,
        }));
    };

    render(): JSX.Element {
        return (
            <div className="mx-5 p-2 mt-4">
                <Slide direction="right">
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
                                    className="w-full p-2 border rounded"
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
                                    className="w-full p-2 border rounded"
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
                                    className="w-full p-2 border rounded"
                                    onChange={this.handleInput}
                                />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="postalcode" className=" flex flex-col">
                                {' '}
                                <div>Postal code</div>
                                <input
                                    type="text"
                                    id="postalcode"
                                    name="postalcode"
                                    placeholder="Type here"
                                    className="w-full p-2 border rounded"
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
                                    className="w-full p-2 border rounded"
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
                                    className="w-full p-2 border rounded"
                                    onChange={this.handleInput}
                                />
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="w-full p-2 bg-blue-400 hover:bg-blue-800 text-white border rounded"
                        >
                            Submit
                        </button>
                    </form>
                </Slide>
            </div>
        );
    }
}

export default Checkout;
