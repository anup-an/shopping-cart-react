import React from 'react';
import Body from './components/body';
import Footer from './components/footer';
import Header from './components/header';

class App extends React.Component {
    render() {
        return (
            <div className="flex flex-col">
                <div>
                <Header />
                </div>
                <div>

                <Body />
                </div>
                <div>

                <Footer />
                </div>
            </div>
        )
    }

} 
export default App;
