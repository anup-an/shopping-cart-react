import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router';
import { logOutUser } from '../../actions/userAction';
import { IUser } from '../../ActionTypes';
import { AppState } from '../../store';

interface IProps extends RouteComponentProps {
  user: IUser;
  actions: Actions;
  focus: string;
}

interface Actions {
  logOutUser: () => Promise<void>;
}

class Footer extends React.Component<IProps> {
  handleLogOut = () => {
    const { user } = this.props;
    this.props.actions.logOutUser();
  };
  render() {
    const { user } = this.props;
    return (
      <div className="bg-blue-800 p-3 text-sm text-white flex flex-row justify-between items-center">
        <div className="flex flex-row justify-between items-center gap-x-10">
          {user._id == '' ? (
            <Link
              to="/login"
              className={`border hover:border-white ${
                this.props.focus === 'login' ? 'border-white' : 'border-blue-800'
              } flex flex-row items-center p-1`}
            >
              <p>Login</p>
              <i className="fa fa-sign-in ml-1" aria-hidden="true"></i>
            </Link>
          ) : (
            <div className="flex flex-row items-center space-x-4">
              <p className="text text-sm">Welcome {user.firstName}!</p>
              <button
                type="button"
                onClick={() =>
                  this.props.history.push({
                    pathname: '/user/profile',
                    state: user,
                  })
                }
                className={`border hover:border-white ${
                  this.props.focus === 'profile' ? 'lg:border-white' : 'lg:border-blue-800'
                } focus:outline-none p-2`}
              >
                My account
              </button>
            </div>
          )}
          {user._id == '' ? (
            <Link
              to="/register"
              className={`flex flex-row items-center p-1 border hover:border-white ${
                this.props.focus === 'register' ? 'border-white' : 'border-blue-800'
              }`}
            >
              <p>Register</p>
              <i className="fa fa-user-plus"></i>
            </Link>
          ) : (
            <button
              onClick={this.handleLogOut}
              type="button"
              className="flex flex-row items-center border border-blue-800 focus:border-white p-2"
            >
              <p>Logout</p>
              <svg
                className="w-6 h-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          )}
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

const mapDispatchToProps = (dispatch: any) => ({
  actions: {
    logOutUser: () => dispatch(logOutUser()),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Footer));
