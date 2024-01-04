import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import { IUser } from '../../ActionTypes';
import { editUserProfile } from '../../actions/userAction';
import { AppState } from '../../store';

interface IProps {
  user: IUser;
  actions: Actions;
}

interface IState {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

interface Actions {
  editUserProfile: (userData: Partial<IUser>) => void;
}

class Details extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      phone: this.props.user.phone,
      email: this.props.user.email,
    };
  }
  handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.actions.editUserProfile({ ...this.state });
  };

  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  };

  componentDidUpdate(prevProps: IProps): void {
    if (
      !_.isEqual(prevProps, this.props) &&
      !_.isEqual(_.pick(this.props.user, ['firstName', 'lastName', 'phone', 'email']), this.state)
    ) {
      this.setState({
        ...this.state,
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        phone: this.props.user.phone,
        email: this.props.user.email,
      });
    }
  }
  render() {
    const { firstName, lastName, phone, email } = this.props.user;
    return (
      <div className="border rounded shadow-xl w-full h-full p-4 flex flex-col space-y-10">
        <p className="text-xl lg:text-2xl">My details</p>
        <form className="flex flex-col space-y-6" onSubmit={this.handleSave}>
          <p className="py-2 border-b w-full">Personal information</p>
          <div className="flex flex-col space-y-4 lg:flex-row items-start lg:space-x-10">
            <div>Edit the fields and click save to update your details.</div>
            <div className="flex flex-col space-y-6 w-full">
              <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 w-full justify-between">
                <div className="w-full md:mr-4">
                  <p>First Name</p>
                  <label htmlFor="firstName" className="md:mr-12">
                    <input
                      name="firstName"
                      id="firstName"
                      className="p-2 bg-gray-200 border rounded w-full"
                      defaultValue={firstName}
                      onChange={this.handleInput}
                      required
                    />
                  </label>
                </div>
                <div className="w-full">
                  <p>Last Name</p>
                  <label htmlFor="lastName">
                    <input
                      name="lastName"
                      id="lastName"
                      className="p-2 bg-gray-200 border rounded w-full"
                      defaultValue={lastName}
                      onChange={this.handleInput}
                      required
                    />
                  </label>
                </div>
              </div>
              <div className="md:mr-4">
                <p>Phone number</p>
                <label htmlFor="phone">
                  <input
                    name="phone"
                    id="phone"
                    className="p-2 bg-gray-200 border rounded w-full md:w-1/2"
                    defaultValue={phone}
                    onChange={this.handleInput}
                  />
                </label>
              </div>
              <button className="w-1/4 border rounded focus:outline-none p-2 bg-blue-400 hover:bg-blue-800 text-white">
                Save
              </button>
            </div>
          </div>
        </form>
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
    editUserProfile: (userData: Partial<IUser>) => dispatch(editUserProfile(userData)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
