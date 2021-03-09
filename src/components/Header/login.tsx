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
    handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        const { email, password } = this.state;
        axios.post('/api/login',{ email, password }).then((response) => {
            console.log(response.data);
        })
    }
    render(){
        return(
            <div>
                <form onSubmit={this.handleLogin}>
                <label htmlFor="email"><input id="email" name="email" placeholder="Type your e-mail" required onChange={this.handleInput}/></label>
                <label htmlFor="passpord"><input id="password" name="password" placeholder="Type your password" required onChange={this.handleInput}/></label>
                <button type="submit">Login</button>
                </form>
            </div>
        )
    }
}

export default Login;