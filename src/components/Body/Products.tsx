/* eslint-disable no-underscore-dangle */
import { connect } from 'react-redux';
import React from 'react';
import { Slide, Zoom } from 'react-awesome-reveal';
import Modal from 'react-modal';
import ProductDetails from './ProductDetails';
import { AppState } from '../../store';
import { ICart, IUser } from '../../ActionTypes';
import { addToCart } from '../../actions/cartAction';
import { fetchProducts } from '../../actions/productAction';
import { addToUserCart } from '../../actions/userAction';

Modal.setAppElement('#root');

type IProduct = {
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
    filteredItems: IProduct[];
    actions: Actions;
    user: IUser | null;
};

type Actions = {
    fetchProducts: () => Promise<void>;
    addToCart: (cartItems: ICart[], product: IProduct) => Promise<void>;
    addToUserCart: (user: IUser, product: IProduct) => Promise<void>;
};
type IState = {
    isOpen: boolean;
    modalProduct: IProduct | null;
};
class Products extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { isOpen: false, modalProduct: null };
    }

    componentDidMount() {
        console.log('List of products');
        this.props.actions.fetchProducts();
    }

    closeModal = (): void => {
        this.setState({ isOpen: false });
    };

    openModal = (product: IProduct): void => {
        this.setState({ isOpen: true, modalProduct: product });
    };

    handleAddToCart = (product: IProduct) => {
        this.props.user ? this.props.actions.addToUserCart(this.props.user, product) : this.props.actions.addToCart(this.props.cartItems, product);
    };

    render(): JSX.Element {
        const { filteredItems, user } = this.props;
        const { isOpen, modalProduct } = this.state;
        return (
            <div className="mt-2 mx-2">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 w-full p-2 text-sm">
                        {filteredItems?.map((product) => (
                            <li key={product._id} className="border shadow p-2">
                                <div>
                                    <button
                                        type="button"
                                        className="focus:outline-none"
                                        onClick={() => this.openModal(product)}
                                    >
                                        <img src={`${product.image}`} loading="eager" alt={`${product.title}`} />
                                    </button>

                                    <div className="mt-1">{product.title}</div>
                                    <div className="flex flex-row justify-between mt-2">
                                        <div>€{product.price}</div>
                                        <button
                                            onClick={() => this.handleAddToCart(product)}
                                            type="button"
                                            className="bg-blue-400 hover:bg-blue-700 text-white border rounded px-1 w-7 h-7"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <Modal
                                        isOpen={isOpen}
                                        onRequestClose={this.closeModal}
                                        overlayClassName="fixed z-10 inset-0 flex items-end justify-center text-center bg-blue-800 bg-opacity-10"
                                        className="h-auto w-full max-w-5xl m-auto relative bg-white bg-opacity-100 rounded-lg px-6 pt-5 pb-4 text-left shadow-xl focus:outline-none"
                                    >
                                        <div>
                                            <div className="flex justify-end">
                                                <button onClick={this.closeModal} type="button">
                                                    <svg
                                                        className="w-6 h-6"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <ProductDetails product={modalProduct} />
                                    </Modal>
                                </div>
                            </li>
                        ))}
                    </ul>
            </div>
        );
    }
}

interface StateProps {
    filteredItems: IProduct[];
    cartItems: ICart[];
    user: IUser | null;
}

const mapStateToProps = (state: AppState): StateProps => ({
    filteredItems: state.products.filteredItems,
    cartItems: state.cartProducts.cartItems,
    user: state.user.user,
});

const mapDispatchToProps = (dispatch: any): { actions: Actions } => ({
    actions: {
        fetchProducts: () => dispatch(fetchProducts()),
        addToCart: (cartItems: ICart[], product: IProduct) => dispatch(addToCart(cartItems, product)),
        addToUserCart: (user: IUser, product: IProduct) => dispatch(addToUserCart(user, product))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
