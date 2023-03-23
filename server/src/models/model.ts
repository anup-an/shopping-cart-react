import mongoose from 'mongoose';

export interface IMethods {}

export type IModel<K> = mongoose.Model<K, {}, IMethods>;

export type Schema<T> = mongoose.Schema<T, IModel<T>, IMethods>;

class CreateModel<T> {
    table: string;

    schema: Schema<T>;

    constructor(table: string, schema: any) {
        this.table = table;
        this.schema = schema;
    }

    create() {
        return mongoose.model<T, IModel<T>>(this.table, this.schema, this.table);
    }
}

export default CreateModel;
