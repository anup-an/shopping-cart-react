import React from 'react';

import SendResetLink from '../../components/SendResetLink';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

class ResetPasswordLinkPage extends React.Component {
    render() {
        return (
            <div className="h-screen">
                <div className="fixed w-full z-10">
                    <Header focus="" />
                </div>
                <div className="h-full pt-20 flex justify-center items-center">
                    <SendResetLink />
                </div>
                <div className="fixed bottom-0 lg:hidden w-full">
                    <Footer focus="" />
                </div>
            </div>
        );
    }
}

export default ResetPasswordLinkPage;
