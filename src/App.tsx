import React from 'react';
import Body from './components/body';
import Footer from './components/footer';
import Header from './components/header';
import data from "./data.json";
  interface IProps{
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
    size: string;
    sort:string;
  }


class App extends React.Component <IProps, IState> {
    constructor(props: IProps){
        super(props);
        this.state = {
            products: data.products,
            size: "",
            sort: "",
        };
    }
    render() {
        const {products} = this.state;
        return (
            <div className="flex flex-col">
                <div>
                <Header />
                </div>
                <div>

                <Body products={products}/>
                </div>
                <div>

                <Footer />
                </div>
            </div>
        )
    }

} 
export default App;
