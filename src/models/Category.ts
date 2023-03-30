import {
    DocumentType,
    PropType,
    defaultClasses,
    getModelForClass,
    modelOptions,
    mongoose,
    prop,
} from '@typegoose/typegoose';
import '@/lib/mongodb';
import { ItemClass } from './Item';

@modelOptions({
    schemaOptions: {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
})
export class CategoryClass implements defaultClasses.Base {
    public _id!: mongoose.Types.ObjectId;
    public id!: string;

    @prop({ required: true })
    public name_en!: string;
    // New languages can be added if needed

    /**
     * Index of the category in the list of categories,
     * i.e. so coffee is displayed first, then tea, etc.
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
