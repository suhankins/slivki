import { Drawer } from '@/components/Drawer/Drawer';
import { getCategoryElementId } from '@/utils/client/getCategoryElementId';
import { CategoryModel, SimpleCategory } from '@/models/Category';
import { CategoryViewer } from '@/components/Category/CategoryViewer';

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
                    name: category.name,
                    id: getCategoryElementId(category.name, index),
                };
            })}
        >
            <main className="vertical-list w-full">
                {categories
                    ?.sort((a, b) => (b.index ?? 0) - (a.index ?? 0))
                    .map((category, index) => (
                        <CategoryViewer
                            id={getCategoryElementId(category.name, index)}
                            key={index}
                            category={category}
                        />
                    ))}
            </main>
        </Drawer>
    );
}
