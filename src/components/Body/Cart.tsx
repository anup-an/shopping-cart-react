import React from 'react';
import { Slide } from 'react-awesome-reveal';
import { connect } from 'react-redux';
import { removeFromCart, removeItemsFromCart, addToCart } from '../../actions/cartAction';
import { removeFromUserCart, removeItemsFromUserCart, addToUserCart } from '../../actions/userAction';
import { AppState } from '../../store';
import ViewCart from './ViewCart';
import CartSum from './CartSum';
import { IProduct, IUser } from '../../ActionTypes';

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
    removeFromUserCart: (user: IUser, item: ICart) => Promise<void>;
    removeItemsFromCart: (cartItems: ICart[], product: IProduct) => Promise<void>; 
    removeItemsFromUserCart: (user: IUser, item: IProduct) => Promise<void>; 
    addToCart: (cartItems: ICart[], product: IProduct) => Promise<void>;
    addToUserCart: (user: IUser, product: IProduct) => Promise<void>;

}

type IState = {
    isOpen: boolean;
};

class Cart extends React.Component<IProps, IState> {
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
        this.props.user._id != '' ? this.props.actions.removeFromUserCart(this.props.user, item) : this.props.actions.removeFromCart(this.props.cartItems, item);
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
                {user._id != '' ?
                    <div>
                        <ViewCart 
                            handleIncrement={this.handleIncrement}
                            handleDecrement={this.handleDecrement}
                            handleRemoveFromCart={this.handleRemoveFromCart} 
                            cartItems={user.cart}  
                        />
                        <CartSum cartItems={user.cart} user={user}/>
                    </div> :
                    <div>
                        <ViewCart 
                            handleIncrement={this.handleIncrement}
                            handleDecrement={this.handleDecrement}
                            handleRemoveFromCart={this.handleRemoveFromCart} 
                            cartItems={cartItems} 
                        />
                        <CartSum cartItems={cartItems} user={user}/>
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
        removeFromUserCart: (user:IUser, item: ICart) => dispatch(removeFromUserCart(user, item)),
        removeItemsFromCart: (cartItems: ICart[], product: IProduct) => dispatch(removeItemsFromCart(cartItems, product)),
        removeItemsFromUserCart: (user: IUser, item: IProduct) => dispatch(removeItemsFromUserCart(user, item)),
        addToCart: (cartItems: ICart[], product: IProduct) => dispatch(addToCart(cartItems, product)),
        addToUserCart: (user: IUser, product: IProduct) => dispatch(addToUserCart(user, product)),
    }
}
);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
