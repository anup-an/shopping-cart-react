import React from 'react';
import { Provider } from 'react-redux';
import Body from './components/Body';
// import Footer from './components/Footer';
import Header from './components/Header';
import data from './data.json';
import store from './store';

interface IProps {
    products?: IProduct[];
    size?: string;
    sort?: string;
}

interface ICart {
    id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    availableSizes: string[];
    count?: number;
}

interface IProduct {
    id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    availableSizes: string[];
    count?: number;
}

interface IState {
    products: IProduct[];
    count: number;
    size: string;
    sort: string;
    cartItems: ICart[];
}

interface IOrder {
    name: string;
    email: string;
    address: string;
    postalcode: string;
    city: string;
    country: string;
}

class App extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            products: data.products,
            count: data.products.length,
            size: '',
            sort: '',
            cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]'),
        };
    }

    addToCart = (product: IProduct): void => {
        const { cartItems } = this.state;
        if (cartItems.length === 0) {
            cartItems.push({ ...product, count: 1 });
        } else if (cartItems.length !== 0) {
            const cart = cartItems.find((item) => item.id === product.id);
            if (cart && cart.count) {
                cartItems[cartItems.indexOf(cart)].count = cart.count + 1;
            } else if (!cart) {
                cartItems.push({ ...product, count: 1 });
            }
        }

        this.setState({ cartItems });
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    };

    removeFromCart = (item: ICart): void => {
        const { cartItems } = this.state;
        this.setState({ cartItems: cartItems.filter((product) => product.id !== item.id) });
        localStorage.setItem('cartItems', JSON.stringify(cartItems.filter((product) => product.id !== item.id)));
    };

    createOrder = (order: IOrder): void => {
        console.log(order);
    };

    render(): JSX.Element {
        const { products, count, sort, size, cartItems } = this.state;

        return (
            <Provider store={store}>
                <div className="flex flex-col">
                    <div>
                        <Header />
                    </div>
                    <div>
                        <Body
                            products={products}
                            count={count}
                            sort={sort}
                            size={size}
                            addToCart={this.addToCart}
                            removeFromCart={this.removeFromCart}
                            createOrder={this.createOrder}
                            cartItems={cartItems}
                        />
                    </div>
                    {/* <div>
                    <Footer />
                </div> */}
                </div>
            </Provider>
        );
    }
}
export default App;
