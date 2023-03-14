import React from 'react';
import { ICart } from './CartDisplay';


interface IProps {
    handleIncrement: (item: ICart) => void;
    handleDecrement: (item: ICart) => void;
    item: ICart;
}

class Counter extends React.Component<IProps> {
    render(){
        const { handleIncrement, handleDecrement, item } = this.props;
        return (
            <div className="flex flex-row space-x-4 items-center">
                <button 
                className="border rounded shadow px-2 hover:bg-blue-800 bg-blue-400 text-white focus:outline-none"
                onClick= {() => handleIncrement(item)}
                >
                    +
                </button>
                <div>{item.count}</div>
                <button 
                className="border rounded shadow px-2 hover:bg-blue-800 bg-blue-400 text-white focus:outline-none"
                onClick= {() => handleDecrement(item)}
                >
                    -
                </button>
            </div>
        )
    }
}


export default Counter;