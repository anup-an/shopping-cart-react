import React from 'react';
import { Slide } from 'react-awesome-reveal';
import { connect } from 'react-redux';
import { removeFromCart } from '../../actions/cartAction';
import { removeFromUserCart } from '../../actions/userAction';
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
    count?: number;
};

type IProps = {
    cartItems: ICart[];
    user: IUser;
    actions: Actions;
};

type Actions = {
    removeFromCart: (cartItems: ICart[], item: ICart) => Promise<void>;
    removeFromUserCart: (user: IUser, item: ICart) => Promise<void>;
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

    render(): JSX.Element {
        const { cartItems, user } = this.props;
        const { isOpen } = this.state;
        return (
            <div>
                {user._id != '' ?
                    <div>
                        <ViewCart handleRemoveFromCart={this.handleRemoveFromCart} cartItems={user.cart} />
                        <CartSum cartItems={user.cart} />
                    </div> :
                    <div>
                        <ViewCart handleRemoveFromCart={this.handleRemoveFromCart} cartItems={cartItems} />
                        <CartSum cartItems={cartItems} />
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
        removeFromUserCart: (user:IUser, item: IProduct) => dispatch(removeFromUserCart(user, item))
    }
}
);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
