import React from 'react';
import Products from './Products';

interface IProps{
    products?: IProduct[];
    size?: string;
    sort?: string;
}

interface IProduct {
  id: string;
  title: string;
  image: string;
  description: string;
  price: number;
  availableSizes: string[];
}

interface IState {
  products: IProduct[];
  size: string;
  sort:string;
}


const Body  = (props: IProps) => {
        const {products} = props;
    return(
        <div className="flex flex-row justify-between w-full">
            <div className="w-3/4">
                <Products products={products}/>
            </div>
            <div className="w-1/4">Cart Items</div>

        </div>
    )
} 
    

export default Body;