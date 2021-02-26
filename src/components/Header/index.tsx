import React from 'react';
import { connect } from 'react-redux';
import { searchProducts } from '../../actions/productAction';

type Actions = {
    searchProducts: (keywords: string) => Promise<void>;
}

type IProps = {
    actions: Actions;
};

type IState = {
    keywords: string;
}


class Header extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {keywords : ''};
    }

    handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState((state) => ({...state, [event.target.name]: event.target.value}));
    }

    handleSearch = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.props.actions.searchProducts(this.state.keywords);

    }
    render(){
        const { keywords } = this.state;
        return (
            <div className="flex flex-row bg-blue-800 text-white text-xl justify-between p-4 items-center">
                <div>Home</div>
                <div className="flex flex-row items-center border rounded border-white">
                    <button className="mx-2" type="submit" onClick={this.handleSearch}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </button>
                <label htmlFor="keywords">
                        <input 
                        id="keywords" 
                        name="keywords" 
                        type="text" 
                        onChange= {this.handleInput} 
                        placeholder="Search for products" 
                        className="p-2 text-sm text-gray-700 focus:outline-none flex flex-grow"
                        />
                    </label>
                </div>
                <div className="flex flex-row justify-between gap-x-10">
                    <button className="focus:outline-none">Login</button>
                    <button className="focus:outline-none">Register</button>
                </div>
            </div>
        );
    }

};

const mapDispatchToProps = (dispatch: any) : {actions: Actions} => ({
    actions: {
        searchProducts: (keywords:string) => dispatch(searchProducts(keywords))
    }
})
export default connect(null, mapDispatchToProps)(Header);
