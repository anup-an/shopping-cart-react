import React from 'react';
import { connect } from 'react-redux';

import { FilterState, IProduct, SortState } from '../../ActionTypes';
import { filterProducts, searchProducts, sortProducts } from '../../actions/productAction';
import { AppState } from '../../store';
import { SearchState } from '../../types/common';

interface IProps {
    sort: SortState<IProduct> | null;
    filter: FilterState<IProduct> | null;
    actions: Actions;
}

interface IState {
    searchState: SearchState<IProduct> | null;
}

interface Actions {
    filterProducts: (filterObj: FilterState<IProduct>) => Promise<void>;
    sortProducts: (sortObject: SortState<IProduct>) => Promise<void>;
    searchProducts: (searchObject: SearchState<IProduct>) => Promise<void>;
}

class Filter extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { searchState: null };
    }

    handleProductSort = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, field: keyof IProduct): void => {
        event.preventDefault();
        const parameter = this.props.sort
            ? { [field]: this.props.sort[field] === 'asc' ? 'desc' : 'asc' }
            : { [field]: 'asc' };
        this.props.actions.sortProducts(parameter);
    };

    handleProductFilter = (filterObj: FilterState<IProduct>): void => {
        this.props.actions.filterProducts(filterObj);
    };

    handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.actions.searchProducts(
            this.state.searchState || ({ search: { title: '' } } as SearchState<IProduct>),
        );
    };

    handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState((state) => ({
            ...state,
            searchState: {
                ...state.searchState,
                [event.target.name]: event.target.value,
            },
        }));
    };

    render(): JSX.Element {
        const { sort, filter } = this.props;
        return (
            <div className="flex flex-row justify-between items-center text-sm">
                <form
                    className="flex flex-row items-center border rounded border-gray-600 pr-2"
                    onSubmit={this.handleSearch}
                >
                    <button type="submit" className="mx-2 focus:outline-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>

                    <label htmlFor="keywords">
                        <input
                            id="keywords"
                            name="title"
                            type="text"
                            onChange={this.handleInput}
                            placeholder="Search for products"
                            className="p-2 text-sm text-gray-700 focus:outline-none flex flex-grow"
                        />
                    </label>
                </form>
                <div>
                    Price
                    <button
                        className={`mx-2 focus:outline-none hover:bg-blue-700 hover:text-white border border-gray-600 p-1 rounded ${
                            ['desc', 'asc'].includes(sort?.price || '') ? 'bg-blue-400 text-white' : ''
                        }}`}
                        onClick={(event) => this.handleProductSort(event, 'price')}
                        type="button"
                    >
                        {sort?.price === 'desc' ? (
                            <i className="fa-solid fa-chevron-up text-white" />
                        ) : (
                            <i className={`fa-solid fa-chevron-down ${sort?.price === 'asc' ? 'text-white' : ''} `} />
                        )}
                    </button>
                </div>
                <div>
                    Size{' '}
                    <select
                        value={filter?.availableSizes}
                        className="border rounded p-1 border-gray-600"
                        onChange={(e) => this.handleProductFilter({ availableSizes: e.target.value })}
                    >
                        <option value="">ALL</option>
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
    sort: SortState<IProduct> | null;
    filter: FilterState<IProduct> | null;
}

const mapStateToProps = (state: AppState): StateProps => ({
    sort: state.products.sort,
    filter: state.products.filter,
});

const mapDispatchToProps = (dispatch: any): { actions: Actions } => ({
    actions: {
        filterProducts: (filterObj: FilterState<IProduct>) => dispatch(filterProducts(filterObj)),
        sortProducts: (sortObject: SortState<IProduct>) => dispatch(sortProducts(sortObject)),
        searchProducts: (searchObject: { [x: string]: any }) => dispatch(searchProducts(searchObject)),
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
