import mongoose from 'mongoose';
import { IMethods, IModel } from '../models/model';

export const createSchema = <T>(schema: any) => {
    return new mongoose.Schema<T, IModel<T>, IMethods>({...schema, __v: {type:Number, select: false}});
};
