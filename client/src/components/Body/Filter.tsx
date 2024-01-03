import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { FilterState, IProduct, SortState } from '../../ActionTypes';
import { filterProducts, searchProducts, sortProducts } from '../../actions/productAction';
import { AppState } from '../../store';
import { SearchState } from '../../types/common';

interface IProps {
  sort: SortState<IProduct> | null;
  filter: FilterState<IProduct> | null;
  search: SearchState<IProduct> | null;
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

  handleProductSort = (value: string): void => {
    const splitString = value.split(':');
    this.props.actions.sortProducts({ [splitString[0]]: [splitString[1]] });
  };

  handleProductFilter = (filterObj: FilterState<IProduct>): void => {
    this.props.actions.filterProducts(filterObj);
  };

  debouncedSearch = _.debounce(() => {
    this.handleSearch();
  }, 300);

  handleSearch = () => {
    this.props.actions.searchProducts(this.state.searchState || ({ title: '' } as SearchState<IProduct>));
  };

  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState((state) => ({
      ...state,
      searchState: {
        ...state.searchState,
        [event.target.name]: event.target.value,
      },
    }));
    this.debouncedSearch();
  };

  componentDidMount(): void {
    this.setState({ searchState: this.props.search });
  }

  render(): JSX.Element {
    const { sort, filter } = this.props;
    return (
      <div className="md:flex flex-row justify-between items-center text-sm">
        <form
          className="flex flex-row items-center border rounded border-gray-600 pr-2"
          onSubmit={(e) => this.handleSearch}
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
              value={this.state.searchState?.title || ''}
              placeholder="Search for products"
              className="p-2 text-sm text-gray-700 focus:outline-none flex flex-grow"
            />
          </label>
        </form>
        <div className="flex justify-between md:space-x-20 bg-white bg-opacity-100 flex-row mt-3 md:mt-0">
          <div>
            Sort By{' '}
            <select
              className="border rounded p-1 border-gray-600"
              onChange={(e) => this.handleProductSort(e.target.value)}
            >
              <option value="" selected disabled>
                Select an option
              </option>
              <option value="price:asc">Price: Low to high</option>
              <option value="price:desc">Price: High to low</option>
            </select>
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
      </div>
    );
  }
}

interface StateProps {
  sort: SortState<IProduct> | null;
  filter: FilterState<IProduct> | null;
  search: SearchState<IProduct> | null;
}

const mapStateToProps = (state: AppState): StateProps => ({
  sort: state.products.sort,
  filter: state.products.filter,
  search: state.products.search,
});

const mapDispatchToProps = (dispatch: any): { actions: Actions } => ({
  actions: {
    filterProducts: (filterObj: FilterState<IProduct>) => dispatch(filterProducts(filterObj)),
    sortProducts: (sortObject: SortState<IProduct>) => dispatch(sortProducts(sortObject)),
    searchProducts: (searchObject: { [x: string]: any }) => dispatch(searchProducts(searchObject)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
