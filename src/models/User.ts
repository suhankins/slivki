import {
    defaultClasses,
    getModelForClass,
    modelOptions,
    mongoose,
    prop,
} from '@typegoose/typegoose';
import '@/lib/mongodb'; // Importing library to connect to MongoDB

@modelOptions({
    schemaOptions: {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
})
export class UserClass implements defaultClasses.Base {
    public _id!: mongoose.Types.ObjectId;
    public id!: string;

    @prop({ required: true, unique: true })
    public name!: string;

    @prop({ required: true })
    public passwordHash!: string;
}

export const UserModel = getModelForClass(UserClass);
