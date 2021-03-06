import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';


interface IState {
    email: string;
    password: string;
}

interface IProps {}

class Register extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { email: '', password: '' };
    }
    handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState((state) => ({ ...state, [event.target.name]: event.target.value }));
    };
    handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        const { email, password } = this.state;
        await axios.post('/api/signup', { email, password }).then((response) => {
            console.log(response.data);
        });
    };
    render() {
        return (
            <div className="flex flex-row flex items-center justify-center h-full mt-28">
                <div className="bg-white border rounded-lg shadow-xl w-2/3 flex flex-row bg-blue-800">
                    <div className="h-96 w-1/2 text-white p-4 flex items-center justify-center flex-col">
                        <div className="text-2xl">Welcome to the E-Shop!</div>
                        <div>Please fill up your details to create a new account.</div>
                    </div>
                    <div className="w-1/2 h-96 bg-white flex flex-col items-center justify-center space-y-8">
                        <div className="flex flex-row items-center space-x-2">
                            <div>Already registered, login to your account</div>
                            <Link to="/login"
                                className="bg-blue-400 hover:bg-blue-800 p-1 text-white border rounded shadow text-sm focus:outline-none"
                            >
                                Login
                            </Link>
                        </div>
                        <div className="text-2xl text-blue-800 text-left">Signup</div>

                        <form onSubmit={this.handleLogin} className="flex flex-col space-y-8 w-2/3">
                            <div className="flex flex-col space-y-2">
                                <label
                                    className="flex flex-row w-full border-b items-end justify-between"
                                    htmlFor="firstname"
                                >
                                    <input
                                        className="focus:outline-none text-sm"
                                        id="firstname"
                                        name="firstname"
                                        placeholder="First Name"
                                        required
                                        onChange={this.handleInput}
                                    />
                                    <svg
                                        className="h-5 w-5 text-blue-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>{' '}
                                </label>

                                <label
                                    className="flex flex-row w-full border-b items-end justify-between"
                                    htmlFor="lastname"
                                >
                                    <input
                                        className="focus:outline-none text-sm"
                                        id="firstname"
                                        name="lastname"
                                        placeholder="Last Name"
                                        required
                                        onChange={this.handleInput}
                                    />
                                    <svg
                                        className="h-5 w-5 text-blue-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>{' '}
                                </label>

                                <label
                                    className="flex flex-row w-full border-b items-end justify-between"
                                    htmlFor="email"
                                >
                                    <input
                                        className="focus:outline-none text-sm"
                                        id="email"
                                        name="email"
                                        placeholder="E-mail"
                                        required
                                        onChange={this.handleInput}
                                    />
                                    <svg
                                        className="h-5 w-5 text-blue-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                </label>
                                <label
                                    htmlFor="password"
                                    className="flex flex-row w-full border-b items-end justify-between"
                                >
                                    <input
                                        className="w-full focus:outline-none text-sm"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        required
                                        onChange={this.handleInput}
                                    />
                                    <svg
                                        className="h-6 w-6 text-blue-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                </label>
                            </div>
                            <button
                                className="w-full p-2 hover:bg-blue-800 bg-blue-400 border rounded text-white focus:outline-none"
                                type="submit"
                            >
                                <div>Signup</div>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
