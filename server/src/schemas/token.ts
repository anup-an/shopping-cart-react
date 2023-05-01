import mongoose from 'mongoose';
import { createSchema } from '.';

export interface IToken extends mongoose.Document {
    userId: string;
    token: string;
    createdAt: string;
}

const TokenSchema = createSchema<IToken>({
    userId:{ type: mongoose.Schema.Types.ObjectId, required: true, ref:  'users'},
    token: {
        type:String, required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400,
    }
});

export default TokenSchema;

