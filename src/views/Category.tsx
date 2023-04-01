import { CategoryClass } from '@/models/Category';

export function Category({ category }: { category: CategoryClass }) {
    return (
        <>
            <div className="divider">
                <span className="text-center text-xl font-bold">
                    {category.name_en}
                </span>
            </div>
        </>
    );
}
