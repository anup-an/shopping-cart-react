import { ICart } from '../../ActionTypes';

export interface LogInActionPayload {
    email: string;
    password: string;
    cartItems: ICart[];
}
