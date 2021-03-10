import axios from "axios";
import React from 'react';


interface IState {
    email: string;
    password: string;
}

interface IProps{}

class Login extends React.Component<IProps,IState> {
    constructor(props: IProps){
        super(props);
        this.state = {email: '', password: ''}
    }
    handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState((state) => ({...state, [event.target.name]: event.target.value}));
    }
    handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        const { email, password } = this.state;
        await axios.post('/api/login',{ email, password }).then((response) => {
            console.log(response.data);
        })
    }
    render(){
        return(
            <div className="flex flex-row">
            <div>
                <form onSubmit={this.handleLogin}>
                <label className="flex flex-col" htmlFor="email">
                    <div>E-mail</div>
                    <input className="p-2 border rounded" id="email" name="email" placeholder="Type your e-mail" required onChange={this.handleInput}/>
                </label>
                <label htmlFor="passpord">
                    <div>Password</div>
                    <input className="p-2 border rounded" id="password" name="password" placeholder="Type your password" required onChange={this.handleInput}/>
                </label>
                <button type="submit">Login</button>
                </form>
                
            </div>
            <div className="bg-blue-400 text-white w-full h-full">
            Welcome to the e-store. Please login to shop online.
        </div>
        </div>
        )
    }
}

export default Login;