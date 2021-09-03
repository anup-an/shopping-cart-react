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

class Details extends React.Component<IProps>{
    constructor(props: IProps) {
        super(props);
        this.state = { "firstName": "", "lastName": "", "phone": "", "email": "", "password": ""}
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
        this.setState({
            "firstName": user.firstName,
            "lastName": user.lastName,
            "phone": user.phone,
            "email": user.email,
            "password": user.password,
        })
    }
    render() {
        const { user } = this.props;
        return (
            <div className="border rounded shadow-xl w-full h-full p-4 flex flex-col space-y-10">
                <p className="text-xl lg:text-2xl">My details</p>
                <form className="flex flex-col space-y-6" onSubmit={this.handleSave}>
                    <p className="py-2 border-b w-full">Personal information</p>
                    <div className="flex flex-col space-y-4 lg:flex-row items-start lg:space-x-10">
                        <div>Edit the fields and click save to update your details.</div>
                        <div className="flex flex-col space-y-6">
                            <div className="flex flex-row space-x-12">
                                <div>
                                    <p>First Name</p>
                                    <label htmlFor="firstName">
                                        <input
                                            name="firstName"
                                            id="firstName"
                                            className="p-2 bg-gray-200 border rounded"
                                            value={user.firstName}
                                            required
                                        />
                                    </label>
                                </div>
                                <div>
                                    <p>Last Name</p>
                                    <label htmlFor="lastName">
                                        <input
                                            name="lastName"
                                            id="lastName"
                                            className="p-2 bg-gray-200 border rounded"
                                            value={user.lastName}
                                            required
                                        />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <p>Phone number</p>
                                <label htmlFor="phone">
                                    <input
                                        name="phone"
                                        id="phone"
                                        className="p-2 bg-gray-200 border rounded"
                                        value={user.phone}
                                    />
                                </label>
                            </div>
                            <button
                                className="w-1/4 border rounded focus:outline-none p-2 bg-blue-400 hover:bg-blue-800 text-white"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
                <form className="flex flex-col space-y-6" onSubmit={this.handleSave}>
                    <p className="py-2 border-b w-full">E-mail address</p>
                    <div className="flex flex-col space-y-4 lg:flex-row items-start lg:space-x-10">
                        <div>Edit the fields and click save to update your details.</div>
                        <div className="flex flex-col space-y-6">
                            <div className="flex flex-row space-x-12">
                                <div>
                                    <p>E-mail</p>
                                    <label htmlFor="email">
                                        <input
                                            name="email"
                                            id="email"
                                            className="p-2 bg-gray-200 border rounded"
                                            value={user.email}
                                        />
                                    </label>
                                </div>
                                <div className="invisible">
                                    <p>Last Name</p>
                                    <label htmlFor="lastName">
                                        <input
                                            name="lastName"
                                            id="lastName"
                                            className="p-2 bg-gray-200 border rounded"
                                            required
                                        />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <p>Password</p>
                                <label htmlFor="password">
                                    <input
                                        name="password"
                                        id="password"
                                        className="p-2 bg-gray-200 border rounded"
                                        value={user.password}
                                        type="password"
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

export default connect(mapStateToProps, mapDispatchToProps)(Details);