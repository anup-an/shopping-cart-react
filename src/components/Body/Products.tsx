import React, { Component } from 'react'

interface IProduct {
    id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    availableSizes: string[];
  }
interface IProps{
    products?: IProduct[];
    size?: string;
    sort?: string;
}
const  Products = (props: IProps) => {
    const {products} = props;

    return (
        <div>
            <ul className="grid grid-cols-4 gap-10 w-full border p-2 text-sm">
                {products?.map(product => (
                    <li key={product.id} className="border shadow p-2">
                        <div>
                            <img src={`${product.image}`} />
                            <div className="mt-1">{product.title}</div>
                            <div className="flex flex-row justify-between mt-2">
                                <div>€{product.price}</div>
                                <button className="bg-blue-400 hover:bg-blue-700 text-white border rounded px-1 w-7 h-7">
                                <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" stroke="currentColor" 
                                viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
} 

export default Products;
