import React from 'react';

import Body from './components/Body';

import Footer from './components/Footer';

import Header from './components/Header';

import data from './data.json';

interface IProps {
    products?: IProduct[];
    size?: string;
    sort?: string;
}

interface IProduct {
    id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    availableSizes: string[];
}

interface IState {
    products: IProduct[];
    count: number;
    size: string;
    sort: string;
}

class App extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            products: data.products,
            count: data.products.length,
            size: '',
            sort: '',
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
            this.setState({ products: data.products });
        } else {
            this.setState({
                size: event.target.value,
                products: data.products.filter((product) => product.availableSizes.indexOf(event.target.value) >= 0),
            });
        }
    };

    render(): JSX.Element {
        const { products, count, sort, size } = this.state;

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
                    />
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        );
    }
}
export default App;
