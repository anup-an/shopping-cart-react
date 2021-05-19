/* eslint-disable react/prefer-stateless-function */
import { connect } from 'react-redux';
import React from 'react';
import { IProduct } from '../../ActionTypes';
import { AppState } from '../../store';
import { filterProducts, sortProducts } from '../../actions/productAction';

interface IProps {
    items: IProduct[];
    sort: string;
    size: string;
    filteredItems: IProduct[];
    sortedItems: IProduct[];
    actions: Actions;
}

interface Actions {
    filterProducts: (size: string, sort: string, products: IProduct[]) => Promise<void>;
    sortProducts: (sort: string, size: string, products: IProduct[]) => Promise<void>;
}

class Filter extends React.Component<IProps, IProduct> {
    constructor(props: IProps) {
        super(props);
    }

    handlesort = (sort: string, size: string): void => {
        this.props.actions.sortProducts(sort, size, this.props.items);
    };

    handleFilter = (size: string, sort: string): void => {
        console.log(sort);
        this.props.actions.filterProducts(size, sort, this.props.items);
    };

    render(): JSX.Element {
        const { sort, size, items, actions, filteredItems } = this.props;
        return (
            <div className="flex flex-row justify-between items-center text-sm">
                <div> {filteredItems.length} Products</div>
                <div>
                    Price{' '}
                    <select
                        value={sort}
                        className="border rounded p-1 border-gray-300 text-sm"
                        onChange={(e) => this.handlesort(e.target.value, size)}
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
                    Size{' '}
                    <select
                        value={size}
                        className="border rounded p-1 border-gray-300"
                        onChange={(e) => this.handleFilter(e.target.value, sort)}
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

const mapDispatchToProps = (dispatch: any): { actions: Actions } => ({
    actions: {
        filterProducts: (size: string, sort: string, products: IProduct[]) =>
            dispatch(filterProducts(size, sort, products)),
        sortProducts: (sort: string, size: string, products: IProduct[]) =>
            dispatch(sortProducts(sort, size, products)),
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);