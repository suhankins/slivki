import { SimpleCategory } from '@/models/Category';
import { ItemViewer } from '../Item/ItemViewer';
import { Category } from './Category';
import { Locale, getLocalizedString } from '@/lib/i18n-config';

export interface CategoryProps {
    lang: Locale;
    category: SimpleCategory;
    id?: string;
}

export function CategoryViewer({ category, id, lang }: CategoryProps) {
    return (
        <Category
            id={id}
            title={
                <span className="text-center text-xl font-bold">
                    {getLocalizedString(category.name, lang)}
                </span>
            }
        >
            {category.items &&
                category.items.map((item, index) => (
                    <ItemViewer
                        lang={lang}
                        category={category}
                        item={item}
                        key={index}
                    />
                ))}
        </Category>
    );
}
