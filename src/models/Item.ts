import { modelOptions, prop } from '@typegoose/typegoose';
import '@/lib/mongodb'; // Importing library to connect to MongoDB

export type SimpleItem = {
    name_en: string;
    description_en?: string;
    sizes?: string[];
    price: number[];
    picture?: string;
};

@modelOptions({
    schemaOptions: {
        _id: false,
        /**
         * Used by API
         */
        toJSON: {
            transform: (_doc, ret) => {
                delete ret.id;
                ret._id = ret._id.toString();
            },
        },
        /**
         * Used for generating static pages
         */
        toObject: {
            transform: (_doc, ret) => {
                delete ret.id;
                delete ret._id;
            },
        },
    },
})
export class ItemClass {
    @prop({ required: [true, 'English name is required!'] })
    public name_en!: string;
    // New languages can be added if needed

    /**
     * Ingredients of the item, e.g. milk, sugar, etc.
     * or whatever else you want to tell about given item
     */
    @prop()
    public description_en?: string;

    /**
     * Array of available sizes, e.g. S (X ml), M (Y ml), L (Z ml), etc.
     */
    @prop({ type: () => [String], default: [] })
    public sizes?: string[];

    /**
     * Price in lari. If no sizes are specified, then only first element of the array is used.
     */
    @prop({
        type: () => [Number],
        required: [true, 'Price is required!'],
        validate: [(v: number[]) => v.length > 0, 'Price is required!'],
    })
    public price!: number[];

    @prop()
    public picture?: string;
}
