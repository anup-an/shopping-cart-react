import { connect } from 'react-redux';
import React from 'react';
import { addToCart } from '../../actions/cartAction';
import { AppState } from '../../store';
import { IUser } from '../../ActionTypes';
import { addToUserCart } from '../../actions/userAction';

interface IProduct {
    _id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    availableSizes: string[];
    count?: number;
}

type ICart = {
    _id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    availableSizes: string[];
    count: number;
};

interface IProps {
    product: IProduct | null;
    cartItems: ICart[];
    action: Action;
    user: IUser | null;
}

interface Action {
    addToCart: (cartItems: ICart[], product: IProduct) => Promise<void>;
    addToUserCart: (user: IUser, product: IProduct) => Promise<void>;
}

class ProductDetails extends React.Component<IProps> {
    constructor(props: IProps){
        super(props)
    }
    handleAddToCart = (product: IProduct) => {
        this.props.action.addToCart(this.props.cartItems, product);

    }
    render(): JSX.Element{
    const {product, user} = this.props;

    return (
        <div>
            {console.log(user)}
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
                                onClick={() => this.handleAddToCart(product)}
                                type="button"
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

    )
}
};

interface StateProps {
    cartItems: ICart[];
    user: IUser | null;
}

const mapStateToProps = (state: AppState): StateProps => ({
    cartItems: state.cartProducts.cartItems,
    user: state.user.user,
});

const mapDispatchToProps = (dispatch: any): {action: Action} => ({
    action: {
        addToCart: (cartItems: ICart[], product: IProduct) => dispatch(addToCart(cartItems, product)),
        addToUserCart: (user: IUser, product: IProduct) => dispatch(addToUserCart(user,product))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
