import React from 'react';
import Modal from 'react-modal';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchProducts } from '../../actions/productAction';
import Login from './login';
import Body from '../Body';
import { IUser, IProduct } from '../../ActionTypes';
import { AppState } from '../../store';
import { logOutUser } from '../../actions/userAction';

type Actions = {
    searchProducts: (keywords: string) => Promise<void>;
    logOutUser: () => Promise<void>;
};

interface IProps extends RouteComponentProps {
    actions: Actions;
    user: IUser;
};

type IState = {
    keywords: string;
    isOpen: boolean;
};

class Header extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { keywords: '', isOpen: false };
    }
    openModal = () => {
        this.setState((state) => ({ ...state, isOpen: true }));
    };

    closeModal = () => {
        this.setState((state) => ({ ...state, isOpen: false }));
    };

    handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState((state) => ({ ...state, [event.target.name]: event.target.value }));
    };

    handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.actions.searchProducts(this.state.keywords);
        this.props.history.push(`/search`);
    };
    handleLogOut = () => {
        const { user } = this.props;
        this.props.actions.logOutUser();
    }
    render() {
        const { keywords } = this.state;
        const { user } = this.props;
        return (
            <div className="flex flex-row bg-blue-800 text-white text-xl justify-between p-4 items-center">
                <Link to="/" className="block lg:hidden">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" stroke="currentColor" 
                        viewBox="0 0 24 24"
                        className="w-6 h-6 text-white"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                    </svg>
                </Link>
                <Link to="/" className="hidden lg:block border border-blue-800 focus:border-white p-2">
                    Home
                </Link>
                <form className="flex flex-row items-center border rounded border-white" onSubmit={this.handleSearch}>
                    <button type="submit" className="mx-2 focus:outline-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>

                    <label htmlFor="keywords">
                        <input
                            id="keywords"
                            name="keywords"
                            type="text"
                            onChange={this.handleInput}
                            placeholder="Search for products"
                            className="p-2 text-sm text-gray-700 focus:outline-none flex flex-grow"
                        />
                    </label>
                </form>
                <div className="flex flex-row justify-between items-center gap-x-10">
                    {user._id == "" ?
                        <Link to="/login" className="hidden lg:block border border-blue-800 focus:border-white p-2">
                            Login
                        </Link> : <p className="hidden lg:block text text-sm">Welcome {user.firstName}!!</p>}
                    {user._id == "" ?
                        <Link to="/register" className="hidden lg:block border border-blue-800 focus:border-white p-2">
                            Register
                        </Link> : <button onClick={this.handleLogOut} type="button"
                            className="hidden lg:block border border-blue-800 focus:border-white p-2">Logout</button>}
                    <Link to="/cart" className="border border-blue-800 focus:border-white p-2">
                        <svg
                            className="focus:outline-none h-6 w-6 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        );
    }
}

interface StateProps {
    user: IUser;
}

const mapStateToProps = (state: AppState): StateProps => ({
    user: state.user.user,
});


const mapDispatchToProps = (dispatch: any): { actions: Actions } => ({
    actions: {
        searchProducts: (keywords: string) => dispatch(searchProducts(keywords)),
        logOutUser: () => dispatch(logOutUser()),
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
