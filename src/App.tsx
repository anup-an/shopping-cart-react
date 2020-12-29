import React from 'react';
import Body from './components/Body';
// import Footer from './components/Footer';
import Header from './components/Header';
import data from './data.json';

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

    sortByPrice = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        this.setState({ sort: event.target.value });
        if (event.target.value === 'Lowest') {
            this.setState({
                sort: event.target.value,
                products: data.products.slice().sort((a, b) => (a.price > b.price ? 1 : -1)),
            });
        } else if (event.target.value === 'Highest') {
            this.setState({
                sort: event.target.value,
                products: data.products.slice().sort((a, b) => (a.price < b.price ? 1 : -1)),
            });
        } else if (event.target.value === 'Newest') {
            this.setState({
                sort: event.target.value,
                products: data.products.slice().sort((a, b) => (a.id > b.id ? 1 : -1)),
            });
        }
    };

    filterBySize = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        if (event.target.value === 'ALL') {
            this.setState({
                size: event.target.value,
                products: data.products,
            });
        } else {
            this.setState({
                size: event.target.value,
                products: data.products.filter((product) => product.availableSizes.indexOf(event.target.value) >= 0),
            });
        }
    };

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
                        sortByPrice={this.sortByPrice}
                        filterBySize={this.filterBySize}
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
        );
    }
}
export default App;
