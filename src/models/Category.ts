import {
    DocumentType,
    PropType,
    defaultClasses,
    getModelForClass,
    modelOptions,
    mongoose,
    post,
    prop,
} from '@typegoose/typegoose';
import '@/lib/mongodb'; // Importing library to connect to MongoDB
import { ItemClass, SimpleItem } from './Item';

export type SimpleCategory = {
    _id: string;
    name_en: string;
    index?: number;
    items?: SimpleItem[];
};

@modelOptions({
    schemaOptions: {
        /**
         * Used by API
         */
        toJSON: {
            transform: (_doc, ret) => {
                delete ret.__v;
                ret._id = ret._id.toString();
            },
        },
        /**
         * Used for generating static pages
         */
        toObject: {
            transform: (_doc, ret) => {
                delete ret.__v;
                delete ret._id;
                delete ret.id;
            },
        },
    },
})
@post<never>('save', () => {
    // We don't wait for request to finish to save user time
    fetch(
        `${process.env.NEXTAUTH_URL}/api/revalidate?secret=${process.env.REVALIDATE_SECRET}`
    ).then((res) =>
        console.log(
            `Revalidation request ${
                res.status === 200 ? 'succeeded' : 'failed'
            }`
        )
    );
})
export class CategoryClass implements defaultClasses.Base {
    public _id!: mongoose.Types.ObjectId;
    public id!: string;

    @prop({ required: [true, 'English name is required!'], minlength: 1 })
    public name_en!: string;
    // New languages can be added if needed

    /**
     * Index of the category in the list of categories,
     * i.e. coffee is displayed first, then tea, etc.
     */
    @prop()
    public index?: number;

    @prop({ type: () => [ItemClass], default: [] }, PropType.ARRAY)
    public items?: ItemClass[];

    public async addItem(this: DocumentType<CategoryClass>, item: ItemClass) {
        this.items?.push(item);
        await this.save();
    }

    public async removeItem(
        this: DocumentType<CategoryClass>,
        item: ItemClass
    ) {
        this.items?.splice(this.items.indexOf(item), 1);
        await this.save();
    }

    public async repositionItem(
        this: DocumentType<CategoryClass>,
        item: ItemClass,
        index: number
    ) {
        this.items?.splice(this.items.indexOf(item), 1);
        this.items?.splice(index, 0, item);
        await this.save();
    }
}

export const CategoryModel = getModelForClass(CategoryClass);
