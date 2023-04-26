import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Cart from '../../components/cart';

class CartPage extends React.Component {
    render() {
        return (
            <>
                <div className="fixed w-full z-10">
                    <Header focus="cart" />
                </div>
                <Cart />
                <div className="fixed bottom-0 lg:hidden w-full">
                    <Footer focus="" />
                </div>
            </>
        );
    }
}

export default CartPage;
