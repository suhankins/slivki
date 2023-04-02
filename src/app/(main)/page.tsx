import { CategoryModel, SimpleCategory } from '@/models/Category';
import { Category } from '@/views/Category';

async function getCategories() {
    const categories = (await CategoryModel.find()).map(
        (category) => category.toObject() as SimpleCategory
    );
    return categories;
}

export default async function Home() {
    const categories = await getCategories();
    return (
        <main>
            {categories.map((category, index) => (
                <Category key={index} category={category} />
            ))}
        </main>
    );
}
