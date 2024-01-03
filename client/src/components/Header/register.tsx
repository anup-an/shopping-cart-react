import React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { uuid } from 'uuidv4';

import { ICart, IUser } from '../../ActionTypes';
import { displayNotification } from '../../actions/notificationAction';
import { logInUser } from '../../actions/userAction';
import { signupUser } from '../../api/user';
import { AppState } from '../../store';
import { useMapData } from '../../types/mapDataTypes';
import { AppNotification } from '../../types/notifications/ActionTypes';
import { getErrorMessage } from '../../utils';

interface IState {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface IProps extends RouteComponentProps {
  actions: Actions;
  user: IUser;
  cartItems: ICart[];
}

interface Actions {
  displayNotification: (notification: AppNotification) => void;
}

class Register extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { email: '', password: '', firstName: '', lastName: '' };
  }
  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState((state) => ({ ...state, [event.target.name]: event.target.value }));
  };
  handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const { email, password, firstName, lastName } = this.state;
    const result = await signupUser({
      email,
      password,
      firstName,
      lastName,
    });
    useMapData(
      result,
      (data) => {
        this.props.history.push('/login');
        this.props.actions.displayNotification({
          id: uuid(),
          title: 'Registration successful',
          description: 'You have successfully created an account. Please log into your account to buy our products',
          type: 'success',
        });
      },
      (error) => {
        this.props.actions.displayNotification({
          id: uuid(),
          title: 'Registration failed',
          description: getErrorMessage(error) || 'Something went wrong during registration. Please try again.',
          type: 'failure',
        });
      },
    );
  };
  render() {
    const { user } = this.props;

    return (
      <div className="flex flex-row flex items-center justify-center w-full h-full lg:pt-14">
        {!user?._id ? (
          <div className="w-full lg:w-1/3 bg-white flex flex-col items-center justify-center space-y-8 p-4">
            <div className="text-2xl text-blue-800 text-left">Signup</div>

            <form onSubmit={this.handleRegister} className="flex flex-col space-y-10 w-full">
              <div className="flex flex-col space-y-10">
                <label
                  className="flex flex-row w-full border-b shadow-xl border-gray-800 items-end justify-between"
                  htmlFor="firstName"
                >
                  <input
                    className="focus:outline-none text-sm w-full"
                    id="firstName"
                    name="firstName"
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
                  className="flex flex-row w-full border-b shadow-xl border-gray-800 items-end justify-between"
                  htmlFor="lastName"
                >
                  <input
                    className="focus:outline-none text-sm w-full"
                    id="lastName"
                    name="lastName"
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
                  className="flex flex-row w-full border-b shadow-xl border-gray-800 items-end justify-between"
                  htmlFor="email"
                >
                  <input
                    className="focus:outline-none text-sm w-full"
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
                  className="flex flex-row w-full border-b shadow-xl border-gray-800 items-end justify-between"
                >
                  <input
                    className="w-full focus:outline-none text-sm"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                    onChange={this.handleInput}
                    type="password"
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
              <div className="flex flex-row items-center space-x-2">
                <div>Already registered, login to your account</div>
                <Link
                  to="/login"
                  className="bg-blue-400 hover:bg-blue-800 p-1 text-white border rounded shadow text-sm focus:outline-none"
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <Redirect to="/user" />
          </div>
        )}
      </div>
    );
  }
}

interface StateProps {
  user: IUser;
  cartItems: ICart[];
}

const mapStateToProps = (state: AppState): StateProps => ({
  user: state.user.user,
  cartItems: state.cartProducts.cartItems,
});

const mapDispatchToProps = (dispatch: any): { actions: Actions } => ({
  actions: {
    displayNotification: (notification: AppNotification) => dispatch(displayNotification(notification)),
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));
