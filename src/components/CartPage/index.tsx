import React from 'react';
import { Slide } from 'react-awesome-reveal';
import { connect } from 'react-redux';
import { removeFromCart, addToCart, removeItemsFromCart } from '../../actions/cartAction';
import { removeFromUserCart, addToUserCart, removeItemsFromUserCart } from '../../actions/userAction';
import { AppState } from '../../store';
import { IUser } from '../../ActionTypes';
import CartDisplay from './CartDisplay';
import CartSummary from './CartSummary';
import EmptyCart from './EmptyCart';

type IProduct = {
    _id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    availableSizes: string[];
    count?: number;
};


type ICart = {
    _id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    availableSizes: string[];
    count: number;
};

type IProps = {
    cartItems: ICart[];
    user: IUser;
    actions: Actions;
};

type Actions = {
    removeFromCart: (cartItems: ICart[], item: ICart) => Promise<void>;
    removeItemsFromCart: (cartItems: ICart[], product: IProduct) => Promise<void>; 
    removeItemsFromUserCart: (user: IUser, item: IProduct) => Promise<void>; 
    removeFromUserCart: (user: IUser, item: ICart) => Promise<void>;
    addToCart: (cartItems: ICart[], product: IProduct) => Promise<void>;
    addToUserCart: (user: IUser, product: IProduct) => Promise<void>;
}

type IState = {
    isOpen: boolean;
};
class CartPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { isOpen: false };
    }

    closeModal = (): void => {
        this.setState({ isOpen: false });
    };

    openModal = (): void => {
        this.setState({ isOpen: true });
    };

    handleRemoveFromCart = (item: ICart) => {
        this.props.user._id !== '' ? this.props.actions.removeFromUserCart(this.props.user, item) : this.props.actions.removeFromCart(this.props.cartItems, item);
    }
    handleIncrement = (item: IProduct) => {
        this.props.user._id !== '' ? this.props.actions.addToUserCart(this.props.user, item) : this.props.actions.addToCart(this.props.cartItems, item); 
    }
    handleDecrement = (item: IProduct) => {
        this.props.user._id === '' ? this.props.actions.removeItemsFromCart(this.props.cartItems, item): this.props.actions.removeItemsFromUserCart(this.props.user, item);

    }

    render(): JSX.Element {
        const { cartItems, user } = this.props;
        const { isOpen } = this.state;
        return (
            <div>
                {user.cart.length !== 0 || cartItems.length !== 0 ?
            

                    <div>
                    <h1 className="text-center bg-gray-200 mb-4 lg:mb-16 p-2">
                        Welcome to your shopping cart! Click checkout to place the order.
                    </h1>
                    {user._id != '' ?
                        <div className="flex flex-col lg:flex-row space-y-4 lg:space-x-4 lg:mx-10 items-center justify-center">
                            <div className="w-full lg:w-2/3 border shadow rounded">
                                <CartDisplay 
                                    handleRemoveFromCart={this.handleRemoveFromCart} 
                                    cartItems={user.cart} 
                                    handleIncrement={this.handleIncrement} 
                                    handleDecrement={this.handleDecrement}
                                />
                            </div>
                            <div className="w-full lg:w-1/3">
                                <CartSummary cartItems={user.cart} user={user}/>
                            </div>
    
                        </div> :
                        <div className="flex flex-col lg:flex-row space-y-4 lg:space-x-4 mx-10 items-center justify-center">
                            <div className="w-full lg:w-2/3 border shadow rounded">
                                <CartDisplay 
                                    handleRemoveFromCart={this.handleRemoveFromCart} 
                                    cartItems={cartItems} 
                                    handleIncrement={this.handleIncrement}
                                    handleDecrement={this.handleDecrement}
                                />
                            </div>
                            <div className="w-full lg:w-1/3">
                                <CartSummary cartItems={cartItems} user={user} />
                            </div>
                        </div>
                    }
                    </div> :
                    <div className="w-full flex items-center justify-center">
                        <EmptyCart />
                    </div>
            }
            </div>
        );
    }
}

interface StateProps {
    cartItems: ICart[];
    count: number;
    user: IUser;
}

const mapStateToProps = (state: AppState): StateProps => ({
    cartItems: state.cartProducts.cartItems,
    count: state.cartProducts.count,
    user: state.user.user
});

const mapDispatchToProps = (dispatch: any): {actions: Actions} => ({
    actions: {
        removeFromCart: (cartItems: ICart[], item: ICart) => dispatch(removeFromCart(cartItems, item)),
        removeItemsFromCart: (cartItems: ICart[], product: IProduct) => dispatch(removeItemsFromCart(cartItems, product)),
        removeItemsFromUserCart: (user: IUser, item: IProduct) => dispatch(removeItemsFromUserCart(user, item)),
        removeFromUserCart: (user:IUser, item: ICart) => dispatch(removeFromUserCart(user, item)),
        addToCart: (cartItems: ICart[], product: IProduct) => dispatch(addToCart(cartItems, product)),
        addToUserCart: (user: IUser, product: IProduct) => dispatch(addToUserCart(user, product))

    }
}
);

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
