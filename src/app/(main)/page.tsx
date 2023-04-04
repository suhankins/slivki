import { Drawer } from '@/components/Drawer/Drawer';
import { getCategoryElementId } from '@/lib/getCategoryElementId';
import { CategoryModel, SimpleCategory } from '@/models/Category';
import { Category } from '@/views/Category';

async function getCategories() {
    const categories = (await CategoryModel.find()).map(
        (category) => category.toObject() as SimpleCategory
    );
    return categories;
}

export const revalidate = false;

export default async function Home() {
    const categories = await getCategories();
    return (
        <Drawer
            headers={categories.map((category, index) => {
                return {
                    name: category.name_en,
                    id: getCategoryElementId(category.name_en, index),
                };
            })}
        >
            <main className="vertical-list">
                {categories.map((category, index) => (
                    <Category
                        id={getCategoryElementId(category.name_en, index)}
                        key={index}
                        category={category}
                    />
                ))}
            </main>
        </Drawer>
    );
}
