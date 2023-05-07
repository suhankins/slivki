import { getModelForClass, prop } from '@typegoose/typegoose';
import '@/lib/mongodb'; // Importing library to connect to MongoDB

export class ListenerClass {
    @prop({ required: true, unique: true })
    public _id!: string;
}

export const ListenerModel = getModelForClass(ListenerClass);
