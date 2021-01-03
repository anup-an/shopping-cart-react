/* eslint-disable no-underscore-dangle */
import { connect } from 'react-redux';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Slide, Zoom } from 'react-awesome-reveal';
import Modal from 'react-modal';
import { fetchProducts } from '../../actions/productAction';
import ProductDetails from './ProductDetails';
import { AppState } from '../../store';

Modal.setAppElement('#root');

interface IProduct {
    _id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    availableSizes: string[];
    count?: number;
}
interface IProps {
    products?: IProduct[];
    filteredItems?: IProduct[];
}

interface IState {
    isOpen: boolean;
    modalProduct: IProduct | null;
}
class Products extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { isOpen: false, modalProduct: null };
    }

    componentDidMount() {
        fetchProducts();
    }

    closeModal = (): void => {
        this.setState({ isOpen: false });
    };

    openModal = (product: IProduct): void => {
        this.setState({ isOpen: true, modalProduct: product });
    };

    render(): JSX.Element {
        const { filteredItems } = this.props;
        const { isOpen, modalProduct } = this.state;
        console.log(filteredItems);
        return (
            <div className="mt-2 mx-2">
                <Slide direction="up">
                    <ul className="grid grid-cols-4 gap-10 w-full p-2 text-sm">
                        {filteredItems?.map((product) => (
                            <li key={product._id} className="border shadow p-2">
                                <div>
                                    <button type="button" onClick={() => this.openModal(product)}>
                                        <img src={`${product.image}`} loading="eager" alt={`${product.title}`} />
                                    </button>

                                    <div className="mt-1">{product.title}</div>
                                    <div className="flex flex-row justify-between mt-2">
                                        <div>€{product.price}</div>
                                        <button
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
                                        <Zoom>
                                            <ProductDetails product={modalProduct} />
                                        </Zoom>
                                    </Modal>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Slide>
            </div>
        );
    }
}

interface StateProps {
    products: IProduct[];
    filteredItems: IProduct[];
}

const mapStateToProps = (state: AppState): StateProps => ({
    products: state.products.items,
    filteredItems: state.products.filteredItems,
});

export default connect(mapStateToProps, fetchProducts)(Products);
