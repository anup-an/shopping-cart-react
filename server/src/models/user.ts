import UserSchema, { IUser } from '../schemas/user';
import CreateModel from './model';

export const guestUser = {
    _id: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    city: '',
    country: '',
    refreshToken: '',
    wishList: [],
    cart: [],
};

const User = new CreateModel<IUser>('users', UserSchema).create();

export default User;
