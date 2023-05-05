import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { IUser } from '../../ActionTypes';

type IProps = RouteComponentProps<{}, {}, IUser>;

interface IComponentProps extends IProps {
    focus: string;
}

class Profile extends React.Component<IComponentProps> {
    render() {
        const user = this.props.location.state;
        const { focus } = this.props;
        return (
            <div className="w-full flex flex-row lg:flex-col lg:space-y-10">
                <div className="hidden lg:block text-2xl lg:text-3xl p-2 mt-10">My Account</div>
                <div className="w-full flex flex-row justify-between lg:flex-col lg:space-y-6">
                    <button
                        type="button"
                        onClick={() => this.props.history.push('/user/profile')}
                        className={`flex flex-row items-center space-x-4 hover:bg-gray-300 ${
                            focus === 'details' ? 'bg-blue-400 hover:bg-blue-800 text-white' : ''
                        } focus:outline-none border-0 rounded px-2 py-1`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <p>My details</p>
                    </button>
                    <button
                        type="button"
                        onClick={() => this.props.history.push('/user/address')}
                        className={`flex flex-row items-center space-x-4 hover:bg-gray-300 ${
                            focus === 'address' ? 'bg-blue-400 hover:bg-blue-800 text-white' : ''
                        } focus:outline-none border-0 rounded px-2 py-1`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                        <p>My Address</p>
                    </button>
                    <button
                        type="button"
                        onClick={() => this.props.history.push('/user/orders')}
                        className={`flex flex-row items-center space-x-4 hover:bg-gray-300 ${
                            focus === 'orders' ? 'bg-blue-400 hover:bg-blue-800 text-white' : ''
                        } focus:outline-none border-0 rounded px-2 py-1`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                        </svg>
                        <p>My orders</p>
                    </button>
                </div>
            </div>
        );
    }
}

export default withRouter(Profile);
