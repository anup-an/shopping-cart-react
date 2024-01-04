import React from 'react';
import { connect } from 'react-redux';
import { editUserProfile } from '../../actions/userAction';
import { IUser } from '../../ActionTypes';
import { AppState } from '../../store';
import _ from 'lodash';

interface IProps {
  user: IUser;
  actions: Actions;
}

interface Actions {
  editUserProfile: (userData: Partial<IUser>) => void;
}
class Address extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      address: this.props.user.address,
      postcode: this.props.user.postcode,
      city: this.props.user.city,
      country: this.props.user.country,
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
      !_.isEqual(_.pick(this.props.user, ['address', 'postcode', 'city', 'country']), this.state)
    ) {
      this.setState({
        ...this.state,
        address: this.props.user.address,
        postcode: this.props.user.postcode,
        city: this.props.user.city,
        country: this.props.user.country,
      });
    }
  }
  render() {
    const { user } = this.props;
    return (
      <div className="border rounded shadow-xl w-full h-full p-4 flex flex-col space-y-10">
        <p className="text-2xl">My address</p>
        <form className="flex flex-col space-y-6" onSubmit={this.handleSave}>
          <p className="py-2 border-b w-full">Shipping address</p>
          <div className="flex flex-col space-y-4 lg:flex-row items-start lg:space-x-10">
            <div>Edit the fields and click save to update your details.</div>
            <div className="flex flex-col space-y-6 w-full">
              <div>
                <p>Address</p>
                <label htmlFor="address">
                  <input
                    name="address"
                    id="address"
                    className="p-2 bg-gray-200 border rounded w-full"
                    defaultValue={user.address}
                    onChange={this.handleInput}
                  />
                </label>
              </div>
              <div className="flex flex-col md:flex-row space-y-6 md:space-y-0">
                <div className="w-full mr-4">
                  <p>Post code</p>
                  <label htmlFor="postcode" className="md:mr-12">
                    <input
                      name="postcode"
                      id="postcode"
                      className="p-2 bg-gray-200 border rounded w-full"
                      defaultValue={user.postcode}
                      onChange={this.handleInput}
                    />
                  </label>
                </div>
                <div className="w-full">
                  <p>City</p>
                  <label htmlFor="city">
                    <input
                      name="city"
                      id="city"
                      className="p-2 bg-gray-200 border rounded w-full"
                      defaultValue={user.city}
                      onChange={this.handleInput}
                    />
                  </label>
                </div>
              </div>
              <div className="mr-4">
                <p>Country</p>
                <label htmlFor="country">
                  <input
                    name="country"
                    id="country"
                    className="p-2 bg-gray-200 border rounded w-full md:w-1/2"
                    defaultValue={user.country}
                    onChange={this.handleInput}
                  />
                </label>
              </div>
              <button
                type="submit"
                className="w-1/4 border rounded focus:outline-none p-2 bg-blue-400 hover:bg-blue-800 text-white"
              >
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

export default connect(mapStateToProps, mapDispatchToProps)(Address);
