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
            <div
                className="hero relative -top-16 min-h-screen"
                style={{
                    backgroundImage: `url("/backgroundPlaceholder.jpg")`,
                }}
            >
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Slivki</h1>
                        <p className="mb-5">Food delivery someday, maybe.</p>
                    </div>
                </div>
                <a
                    className="btn-instagram btn absolute bottom-4 right-4 flex gap-2"
                    href="https://www.instagram.com/slivki_coffee_ge/"
                >
                    @slivki_coffee_ge
                    <img
                        alt="Instagram logo"
                        src="/instagram.svg"
                        className="inline h-6 w-6"
                    />
                </a>
            </div>
            <main className="vertical-list w-full max-w-screen-lg p-4">
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
