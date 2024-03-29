import React from 'react';

import Cart from '../../components/Body/Cart';
import Filter from '../../components/Body/Filter';
import Products from '../../components/Body/Products';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

class ProductsPage extends React.Component {
  render() {
    return (
      <>
        <div className="fixed w-full z-10">
          <Header focus="home" />
        </div>
        <div className="mt-12">
          <div>
            <div className="fixed w-full p-4 mt-2 z-8 border-b-2 bg-white">
              <Filter />
            </div>
            <div className="flex items-stretch">
              <div className="flex-1 self-stretch mt-12 md:mt-8">
                <Products />
              </div>
              <div>
                <Cart />
              </div>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 lg:hidden w-full">
          <Footer focus="" />
        </div>
      </>
    );
  }
}

export default ProductsPage;
