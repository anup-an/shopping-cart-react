import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import Cart from './Cart';
import Filter from './Filter';

type IProps = {
    isLoading?: boolean;
};

class Body extends React.Component<IProps> {
    render() {
        return (
            <div className="mt-20">
                <div className="flex flex-row justify-between w-full">
                    <div className="w-full xl:w-3/4">
                        <div className="mx-10 mt-4">
                            <Filter />
                        </div>
                    </div>
                    <div className="hidden lg:block fixed right-0 lg:w-1/4">
                        <Cart />
                    </div>
                </div>
            </div>
        );
    }
}
interface StateProps {
    isLoading: boolean;
}

const mapStateToProps = (state: AppState): StateProps => ({
    isLoading: state.products.isLoading,
});

export default connect(mapStateToProps, null)(Body);
