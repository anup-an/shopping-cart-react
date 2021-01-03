/* eslint-disable react/prefer-stateless-function */
import { connect } from 'react-redux';
import React from 'react';
import { Dispatch, bindActionCreators, AnyAction } from 'redux';
import * as ProductActions from '../../actions/productAction';
import { IProduct, ProductsActionTypes } from '../../ActionTypes';
import { AppState } from '../../store';

interface IProps {
    items: IProduct[];
    sort: string;
    size: string;
    filteredItems: IProduct[];
    sortedItems: IProduct[];
    filterProducts: (size: string, products: IProduct[]) => (dispatch: Dispatch<ProductsActionTypes>) => Promise<void>;
    sortProducts: (sort: string, products: IProduct[]) => (dispatch: Dispatch<ProductsActionTypes>) => Promise<void>;
}

class Filter extends React.Component<IProps> {
    render(): JSX.Element {
        const { sort, size, items, filteredItems, filterProducts, sortProducts } = this.props;
        return (
            <div className="flex flex-row justify-between items-center">
                <div> {filteredItems.length} Products</div>
                <div>
                    Sort By Price{' '}
                    <select
                        // eslint-disable-next-line react/destructuring-assignment
                        value={sort}
                        className="border rounded p-1 border-gray-300"
                        onChange={(e) => sortProducts(e.target.value, filteredItems)}
                    >
                        <option key="Newest" value="Newest">
                            {' '}
                            Newest{' '}
                        </option>
                        <option key="Lowest" value="Lowest">
                            Lowest
                        </option>
                        <option key="Highest" value="Highest">
                            Highest
                        </option>
                    </select>
                </div>
                <div>
                    Filter By Size{' '}
                    <select
                        value={size}
                        className="border rounded p-1 border-gray-300"
                        onChange={(e) => filterProducts(e.target.value, items)}
                    >
                        <option value="ALL">ALL</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                </div>
            </div>
        );
    }
}

interface StateProps {
    items: IProduct[];
    sort: string;
    sortedItems: IProduct[];
    filteredItems: IProduct[];
    size: string;
}

const mapStateToProps = (state: AppState): StateProps => ({
    items: state.products.items,
    sort: state.products.sort,
    sortedItems: state.products.sortedItems,
    filteredItems: state.products.filteredItems,
    size: state.products.size,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return bindActionCreators(
        {
            ...ProductActions,
        },
        dispatch,
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
