import React from 'react';

type IProduct = {
    _id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    availableSizes: string[];
    count?: number;
};

interface IProps {
    handleIncrement: (item: IProduct) => void;
    handleDecrement: (item: IProduct) => void;
    item: IProduct;
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