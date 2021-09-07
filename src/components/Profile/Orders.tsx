import { connect } from 'react-redux';
import React from 'react';
import { IUser, IOrder, AppActions } from '../../ActionTypes';
import { AppState } from '../../store';
import { getOrdersByUserId } from '../../actions/userAction';

interface IProps {
    user: IUser;
    orders: IOrder[];
    actions: Actions;
}

interface Actions {
    getOrdersByUserId: (loggedUser: IUser) => void;
}
class Orders extends React.Component<IProps>{
    componentDidMount = () => {
        this.props.user._id !== "" ? this.props.actions.getOrdersByUserId(this.props.user) : '';
    }
    render() {
        const { orders, user } = this.props;
        return (
            <div>
                <div className="border rounded shadow-xl w-full h-full p-4 flex flex-col space-y-10">
                    <p className="text-2xl">My orders</p>
                    <div>
                        {user._id}
                        {/* {orders.map(order => {
                            <div className="flex flex-col">
                                <p className="p-2 border">Order# {order._id}</p>
                                <div className="flex flex-col space-y-4">
                                    {order.cart.map(cart => {
                                        <div className="flex flex-row spaxe-x-4 border-b p-2">
                                            <img src={cart.image} />
                                            <div>
                                                <p>{cart.title}</p>
                                                <p>€{cart.price}</p>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>
                        })} */}                        
                    </div>
                </div>
                
            </div>
        )
    }
}

interface StateProps {
    user: IUser;
    orders: IOrder[];
}

const mapStateToProps = (state: AppState) => ({
    user: state.user.user,
    orders: state.user.orders,
})

const mapDispatchToProps = (dispatch: any): { actions : Actions} => ({
    actions: {
        getOrdersByUserId: (loggedUser: IUser) => dispatch(getOrdersByUserId(loggedUser)),
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Orders);