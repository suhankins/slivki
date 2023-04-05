'use client';

import { Drawer } from '@/components/Drawer/Drawer';
import { Logout } from '@/components/Logout';
import { getCategoryElementId } from '@/lib/getCategoryElementId';
import { SimpleCategory } from '@/models/Category';
import { CategoryEditor } from '@/views/Category/CategoryEditor';
import { CategorySkeleton } from '@/views/Category/CategorySkeleton';
import useSwr, { preload } from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

preload('/api/category', fetcher);

export default function AdminPage() {
    const { data, error, isLoading } = useSwr<SimpleCategory[]>(
        '/api/category',
        fetcher
    );
    return (
        <Drawer
            navbarElements={<Logout className="ml-auto" />}
            name="Slivki Admin Panel"
            headers={data?.map((category, index) => {
                return {
                    name: category.name_en,
                    id: getCategoryElementId(category.name_en, index),
                };
            })}
        >
            <main className="vertical-list w-full">
                <h1 className="text-xl font-bold">Categories</h1>
                {isLoading && <CategorySkeleton />}
                {error && (
                    <div className="alert alert-error shadow-lg">
                        <span>Error! Couldn't fetch list of categories.</span>
                        <span>Reload the page or call the programmer</span>
                    </div>
                )}
                {data?.map((category) => (
                    <CategoryEditor
                        category={category}
                        key={category._id.toString()}
                    />
                ))}
                <div className="divider" />
                <h1 className="text-xl font-bold">Account</h1>
                {/* TODO: Account customization */}
            </main>
        </Drawer>
    );
}
