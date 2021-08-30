import React from 'react';
import Cart from './Cart';
import Filter from './Filter';
import Products from './Products';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import Loader from '../ui/Loader';
import { IProduct } from './ViewCart';
import { fetchProducts } from '../../actions/productAction';



type IProps = {
    actions: Actions;
    isLoading?: boolean;
    filteredItems: IProduct[];
};

type Actions = {
    fetchProducts: () => Promise<void>;
};


class Body extends React.Component<IProps>{
    componentDidMount(){
        this.props.actions.fetchProducts();
    }
    render() {
        const { filteredItems, isLoading } = this.props;
        return (
            <div className="top-20">
                {!isLoading ?
                    <div className="flex flex-row justify-between w-full">
                        <div className="w-full xl:w-3/4">
                            <div className="mx-10 mt-4">
                                <Filter />
                            </div>
                            <div className="mt-4 border-t-2 mx-4 mb-16">
                                <Products filteredItems={filteredItems}/>
                            </div>
                        </div>
                        <div className="hidden lg:block fixed right-0 lg:w-1/4">
                            <Cart />
                        </div>
                    </div> :
                    <div className="flex items-center justify-center text-center fixed bottom-1/2 w-full">
                        <Loader />
                    </div>
                }
            </div>    
                
        )
    }
};
interface StateProps {
    isLoading: boolean;
    filteredItems: IProduct[];
}

const mapStateToProps = (state: AppState): StateProps => ({
    isLoading: state.products.isLoading,
    filteredItems: state.products.filteredItems,
})

const mapDispatchToProps = (dispatch: any): { actions: Actions } => ({
    actions: {
        fetchProducts: () => dispatch(fetchProducts()),
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(Body);
