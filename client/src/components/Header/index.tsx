import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link, RouteComponentProps } from 'react-router-dom';
import { IProduct, IUser } from '../../ActionTypes';
import { searchProducts } from '../../actions/productAction';
import { logOutUser } from '../../actions/userAction';
import { AppState } from '../../store';
import { SearchState } from '../../types/common';

type Actions = {
  logOutUser: () => Promise<void>;
};

interface IProps extends RouteComponentProps {
  actions: Actions;
  user: IUser;
  focus: string;
}

type IState = {
  isOpen: boolean;
};

class Header extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { isOpen: false };
  }
  openModal = () => {
    this.setState((state) => ({ ...state, isOpen: true }));
  };

  closeModal = () => {
    this.setState((state) => ({ ...state, isOpen: false }));
  };

  handleLogOut = () => {
    const { user } = this.props;
    this.props.actions.logOutUser();
    this.props.history.push('/');
  };
  render() {
    const { user, focus } = this.props;
    return (
      <div className={`flex flex-row bg-blue-800 text-white text-md justify-between p-3 items-center`}>
        <Link
          to="/"
          className={`p-1 border hover:border-white ${focus === 'home' ? 'border-white' : 'border-blue-800'}`}
        >
          <img src="/logo-shoe-eshop.jpg" className="h-6" />
        </Link>
        <div className="flex flex-row justify-between items-center gap-x-14">
          {!user._id ? (
            <Link
              to="/login"
              className={`hidden lg:flex border hover:border-white ${
                this.props.focus === 'login' ? 'border-white' : 'border-blue-800'
              } flex-row items-center p-1`}
            >
              <p>Login</p>
              <i className="fa fa-sign-in ml-1" aria-hidden="true"></i>
            </Link>
          ) : (
            <div className="flex flex-row items-center space-x-6">
              <p className="hidden lg:block text text-sm">Welcome {user.firstName}!</p>
              <button
                type="button"
                onClick={() =>
                  this.props.history.push({
                    pathname: '/user/profile',
                    state: user,
                  })
                }
                className={`hidden lg:block lg:hover:border-white border ${
                  focus === 'profile' ? 'lg:border-white' : 'lg:border-blue-800'
                } focus:outline-none p-2`}
              >
                My account
              </button>
            </div>
          )}
          {!user._id ? (
            <Link
              to="/register"
              className={`hidden lg:flex flex-row items-center p-1 border hover:border-white ${
                this.props.focus === 'register' ? 'border-white' : 'border-blue-800'
              }`}
            >
              <p>Register</p>
              <i className="fa fa-user-plus ml-1"></i>
            </Link>
          ) : (
            <button
              onClick={this.handleLogOut}
              type="button"
              className="hidden lg:block lg:hover:border-white border border-blue-800 p-2"
            >
              Logout
            </button>
          )}
          <Link
            to="/cart"
            className={`border hover:border-white ${focus === 'cart' ? 'border-white' : 'border-blue-800'} p-1`}
          >
            <svg
              className="focus:outline-none h-5 w-5 text-white"
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
    logOutUser: () => dispatch(logOutUser()),
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
