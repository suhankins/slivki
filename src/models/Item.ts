import { modelOptions, prop } from '@typegoose/typegoose';
import '@/lib/mongodb'; // Importing library to connect to MongoDB

@modelOptions({
    schemaOptions: {
        _id: false,
    },
})
export class ItemClass {
    static readonly fields = ['name', 'description', 'sizes', 'price', 'image'];

    @prop({ required: [true, 'English name is required!'] })
    public name!: string;

    /**
     * Ingredients of the item, e.g. milk, sugar, etc.
     * or whatever else you want to tell about given item
     */
    @prop()
    public description?: string;

    /**
     * Price in lari. If no sizes are specified, then only first element of the array is used.
     */
    @prop({
        type: () => [Number],
        required: [true, 'Price is required!'],
        validate: [(v: number[]) => v.length > 0, 'Price is required!'],
    })
    public price!: (number | null)[];

    @prop()
    public image?: string;
}
