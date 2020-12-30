import React from 'react';

interface IProduct {
    id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    availableSizes: string[];
    count?: number;
}

interface IProps {
    product: IProduct | null;
    addToCart: (product: IProduct) => void;
}

const ProductDetails: React.FC<IProps> = ({ product, addToCart }) => {
    return (
        <div>
            {product ? (
                <div className="flex flex-row space-x-10 items-center">
                    <img className="w-1/3 h-auto" src={`${product?.image}`} loading="eager" alt={`${product?.title}`} />
                    <div className="flex flex-col space-y-6">
                        <div className="text-lg font-bold">{product?.title}</div>
                        <div>{product?.description}</div>
                        <div className="flex flex-row space-x-2 items-center">
                            <div className="text-md">Available Sizes:</div>
                            {product?.availableSizes.map((size) => (
                                <div key={size} className="p-2 text-xl border bg-gray-200 w-14 text-center">
                                    {size}
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-row justify-between items-center">
                            <div>Price: {product.price}€</div>

                            <button
                                type="button"
                                onClick={() => addToCart(product)}
                                className="bg-blue-400 hover:bg-blue-800 text-white p-2 border rounded"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

export default ProductDetails;
