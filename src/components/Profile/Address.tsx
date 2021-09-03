import React from 'react';
import { connect } from 'react-redux';
import { editUserProfile } from '../../actions/userAction';
import { IUser } from '../../ActionTypes';
import { AppState } from '../../store';


interface IProps {
    user: IUser;
    actions: Actions;
}

interface Actions {
    editUserProfile: (loggedUser: IUser) => void;
}
class Address extends React.Component<IProps>{
    constructor(props: IProps) {
        super(props);
        this.state = { "address": "", "postcode": "", "city": "", "country": "" }
    }
    handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { user } = this.props;
        const loggedUser = { ...user, ...this.state };
        this.props.actions.editUserProfile(loggedUser);
    }

    handleInput = (event: React.ChangeEvent<HTMLInputElement>)  => {
        this.setState({ ...this.state, [event.target.name]: event.target.value })
    }
    componentDidMount = () => {
        const { user } = this.props;
        this.setState({ "address": user.address, "postcode": user.postcode, "city": user.city, "country": user.country})
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
                        <div className="flex flex-col space-y-6">
                            
                            <div>
                                <p>Address</p>
                                <label htmlFor="address">
                                    <input
                                        name="address"
                                        id="address"
                                        className="p-2 bg-gray-200 border rounded w-full"
                                        value={user.address}
                                        onChange={this.handleInput}
                                        required
                                    />
                                </label>
                            </div>
                            <div className="flex flex-row space-x-12">
                                <div>
                                    <p>Post code</p>
                                    <label htmlFor="postcode">
                                        <input
                                            name="postcode"
                                            id="postcode"
                                            className="p-2 bg-gray-200 border rounded"
                                            value={user.postcode}
                                            onChange={this.handleInput}
                                            required
                                        />
                                    </label>
                                </div>
                                <div>
                                    <p>City</p>
                                    <label htmlFor="city">
                                        <input
                                            name="city"
                                            id="city"
                                            className="p-2 bg-gray-200 border rounded"
                                            value={user.city}
                                            onChange={this.handleInput}
                                            required
                                        />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <p>Country</p>
                                <label htmlFor="country">
                                    <input
                                        name="country"
                                        id="country"
                                        className="p-2 bg-gray-200 border rounded"
                                        value={user.country}
                                        onChange={this.handleInput}
                                        required
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
        )
    }
}

interface StateProps {
    user: IUser;
}

const mapStateToProps = (state: AppState): StateProps => ({
    user:state.user.user,
})

const mapDispatchToProps = (dispatch: any): { actions: Actions} => ({
    actions: {
        editUserProfile: (loggedUser: IUser) => dispatch(editUserProfile(loggedUser)),
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Address);