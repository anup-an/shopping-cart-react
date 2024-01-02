import React from 'react';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import ResetPassword from '../../components/ResetPassword';

class ResetPasswordPage extends React.Component {
    render() {
        return (
            <div className="h-screen">
                <div className="fixed w-full z-10">
                    <Header focus="" />
                </div>
                <div className="h-full pt-20 flex justify-center items-center">
                    <ResetPassword />
                </div>
                <div className="fixed bottom-0 lg:hidden w-full">
                    <Footer focus="" />
                </div>
            </div>
        );
    }
}

export default ResetPasswordPage;
