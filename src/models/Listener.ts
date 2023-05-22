import { getModelForClass, prop } from '@typegoose/typegoose';
if (process.env.NODE_ENV !== 'test') import('@/lib/mongodb'); // Importing library to connect to MongoDB

export class ListenerClass {
    @prop({ required: true, unique: true })
    public telegramId!: string;
}

export const ListenerModel = getModelForClass(ListenerClass);
