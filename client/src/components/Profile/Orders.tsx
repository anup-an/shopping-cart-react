import { connect } from 'react-redux';
import React from 'react';
import { IUser, IOrder } from '../../ActionTypes';
import { AppState } from '../../store';
import { getOrdersByUserId } from '../../actions/userAction';
import { Loading, MapData, isFailure, isSuccess, pickFieldOrDefault, useMapData } from '../../types/mapDataTypes';
import { fetchOrder } from '../../api/order';
import { ApiError } from '../../api/axios';
import Loader from '../ui/Loader';
import Error from '../ui/Error';

interface IProps {
  user: IUser;
  orders: IOrder[];
  actions: Actions;
}

interface IState {
  ordersFetch: MapData<{ data: IOrder[] }, ApiError>;
}

interface Actions {
  getOrdersByUserId: (loggedUser: IUser) => void;
}
class Orders extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { ordersFetch: Loading };
  }
  fetchOrders = async () => {
    const result = await fetchOrder();
    this.setState({ ordersFetch: result });
  };
  getOrdersList = () => {
    return pickFieldOrDefault(this.state.ordersFetch, 'data', []);
  };
  componentDidMount = () => {
    this.fetchOrders();
  };
  render() {
    const { ordersFetch } = this.state;
    return (
      <div className="mb-20">
        <div className="border rounded shadow-xl w-full h-full p-4 flex flex-col space-y-10">
          <p className="text-2xl">My orders</p>
          {isSuccess(ordersFetch) ? (
            <div>
              {this.getOrdersList().map((order: IOrder) => (
                <div className="flex flex-col border mb-4" key={order._id}>
                  <p className="p-4 border bg-gray-200 border-b break-words">Order# {order._id}</p>
                  <div className="flex flex-col space-y-4 p-2">
                    {order.cart.map((cart) => (
                      <div className="flex flex-col sm:flex-row sm:space-x-4 border-b p-2" key={cart._id}>
                        <img src={cart.image} className="w-full sm:w-1/4 h-auto" />
                        <div>
                          <p>{cart.title}</p>
                          <p>Price: €{cart.price}</p>
                          <p>Quantity: {cart.count}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-row justify-end space-x-2 border-t p-4">
                    <p>Total amount:</p>
                    <p>€{order.cart.map((cart) => cart.price * cart.count).reduce((a, b) => a + b)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              {isFailure(ordersFetch) ? (
                <Error fetch={this.fetchOrders} message="Unable to load orders" />
              ) : (
                <div className="flex justify-center">
                  <Loader message="Loading orders. Please wait ....." />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

interface StateProps {
  user: IUser;
  orders: IOrder[];
}

const mapStateToProps = (state: AppState): StateProps => ({
  user: state.user.user,
  orders: state.user.orders,
});

const mapDispatchToProps = (dispatch: any): { actions: Actions } => ({
  actions: {
    getOrdersByUserId: () => dispatch(getOrdersByUserId()),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
