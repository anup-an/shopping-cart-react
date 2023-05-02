import React from 'react';
import { sendPasswordResetLink } from '../../api/user';
import { isSuccess } from '../../types/mapDataTypes';

interface IProps {}
interface IState {
    email: string;
    isSubmitted: boolean;
}

class SendResetLink extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { email: '', isSubmitted: false };
    }
    handleInput = (event: any) => {
        this.setState({ email: event.target.value });
    };
    handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await sendPasswordResetLink({ email: this.state.email });
        if (isSuccess(result)) this.setState({ isSubmitted: true });
    };
    render() {
        return (
            <div className="shadow-xl flex flex-col items-center sm:w-1/2 lg:w-1/3">
                <p className="rounded-t text-xl bg-blue-400 p-2 w-full text-white">Forgot your password</p>
                <div className="p-8">
                    <p className="text-center">
                        Enter your registered email and we will send an email with instructions to reset your password.
                    </p>
                    <form className="mt-4 flex flex-col" onSubmit={this.handleSubmit}>
                        <label htmlFor="email" className="mx-4 border rounded p-2">
                            <input
                                className="focus:outline-none text-sm"
                                id="email"
                                name="email"
                                placeholder="Enter your e-mail"
                                required
                                onChange={this.handleInput}
                            />
                        </label>
                        <button
                            className="p-2 m-4 hover:bg-blue-800 bg-blue-400 border rounded border-blue-400 text-white"
                            type="submit"
                        >
                            <div>Send e-mail</div>
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default SendResetLink;
