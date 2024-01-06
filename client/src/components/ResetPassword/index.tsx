import React from 'react';

import { isSuccess, useMapData } from '../../types/mapDataTypes';
import { resetPassword } from '../../api/user';
import Loader from '../ui/Loader';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppNotification } from '../../types/notifications/ActionTypes';
import { displayNotification } from '../../actions/notificationAction';
import { getErrorMessage } from '../../utils';
import { uuid } from 'uuidv4';

interface IProps extends RouteComponentProps {
  actions: Actions;
}

interface Actions {
  displayNotification: (notification: AppNotification) => Promise<void>;
}

interface IState {
  password: string;
  isResetSuccessful: boolean;
  token: string | null;
  isTokenParsed: boolean;
}

class ResetPassword extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { password: '', isResetSuccessful: false, token: null, isTokenParsed: false };
  }
  handleInput = (event: any) => {
    this.setState({ password: event.target.value });
  };
  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (this.state.token) {
      const result = await resetPassword({ password: this.state.password, resetToken: this.state.token });
      useMapData(
        result,
        () => {
          this.setState({ isResetSuccessful: true });
        },
        (error) => {
          this.props.actions.displayNotification({
            id: uuid(),
            title: 'Password reset failed',
            description: getErrorMessage(error),
            type: 'failure',
          });
        },
      );
    }
  };

  componentDidMount(): void {
    const token = new URLSearchParams(window.location.search).get('token');
    this.setState({ token, isTokenParsed: true });
  }

  render() {
    const { isTokenParsed, isResetSuccessful } = this.state;
    if (isTokenParsed && !this.state.token) {
      return (
        <div className="shadow-xl flex flex-col items-center sm:w-1/2 lg:w-1/3">
          <div className="rounded-t text-xl bg-blue-400 p-2 w-full text-white text-center">Reset password</div>
          <div className="p-8 text-center">
            <p>Invalid password reset link</p>
          </div>
        </div>
      );
    }
    return (
      <div className="flex justify-center w-full">
        {isTokenParsed ? (
          <div className="shadow-xl flex flex-col items-center sm:w-1/2 lg:w-1/3">
            <div className="rounded-t text-xl bg-blue-400 p-2 w-full text-white text-center">Reset password</div>
            {isResetSuccessful ? (
              <div className="p-8 text-center">
                <p className="mb-6">Password has been successfully reset. Please proceed to login</p>
                <Link
                  to="/login"
                  className="p-2 hover:bg-blue-800 bg-blue-400 border rounded border-blue-400 text-white"
                >
                  Go to login
                </Link>
              </div>
            ) : (
              <div className="p-8">
                <p className="text-center">
                  Please enter a new password. Password must have greater than 8 characters and contain at least one
                  uppercase letter, one lowercase letter, one number and one symbol
                </p>
                <form className="mt-4 flex flex-col" onSubmit={this.handleSubmit}>
                  <label htmlFor="email" className="mx-4 border rounded p-2">
                    <input
                      className="text-sm w-full focus:outline-none"
                      id="email"
                      name="email"
                      placeholder="Enter your password"
                      required
                      onChange={this.handleInput}
                    />
                  </label>
                  <button
                    className="p-2 m-4 hover:bg-blue-800 bg-blue-400 border rounded border-blue-400 text-white"
                    type="submit"
                  >
                    <div>Reset</div>
                  </button>
                </form>
              </div>
            )}
          </div>
        ) : (
          <Loader message="Loading page. Please wait ....." />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any): { actions: Actions } => ({
  actions: {
    displayNotification: (notification: AppNotification) => dispatch(displayNotification(notification)),
  },
});

export default withRouter(connect(null, mapDispatchToProps)(ResetPassword));
