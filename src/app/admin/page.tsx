'use client';

import { Drawer } from '@/components/Drawer/Drawer';
import { Logout } from '@/components/Logout';
import { getCategoryElementId } from '@/utils/client/getCategoryElementId';
import { SimpleCategory } from '@/models/Category';
import { CategoryEditor } from '@/components/Category/CategoryEditor';
import { CategorySkeleton } from '@/components/Category/CategorySkeleton';
import { useId } from 'react';
import useSwr from 'swr';
import { NewCategory } from '@/components/Category/NewCategory';
import { getPosition } from '@/utils/client/Position';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AdminPage() {
    const categoriesHeaderId = useId();
    const accountHeaderId = useId();

    const { data, error, isLoading } = useSwr<SimpleCategory[]>(
        '/api/category',
        fetcher
    );

    const headers = [
        {
            name: 'Categories',
            id: categoriesHeaderId,
            innerHeaders: data?.map((category, index) => {
                return {
                    name: category.name,
                    id: getCategoryElementId(category.name, index),
                    depth: (category.depth ?? 0) + 1,
                };
            }),
        },
        {
            name: 'Account',
            id: accountHeaderId,
        },
    ];

    return (
        <Drawer
            navbarElements={<Logout className="ml-auto" />}
            name="Slivki Admin Panel"
            headers={headers}
        >
            <main className="vertical-list w-full max-w-screen-lg p-4">
                <h1 className="text-2xl font-bold" id={categoriesHeaderId}>
                    Categories
                </h1>
                {isLoading && <CategorySkeleton />}
                {error && (
                    <div className="alert alert-error shadow-lg">
                        <span>Error! Couldn't fetch list of categories.</span>
                        <span>Reload the page or call the programmer</span>
                    </div>
                )}
                {data
                    ?.sort((a, b) => (b.index ?? 0) - (a.index ?? 0))
                    .map((category, index) => (
                        <CategoryEditor
                            id={getCategoryElementId(category.name, index)}
                            position={getPosition(index, data.length)}
                            category={category}
                            key={category._id.toString()}
                        />
                    ))}
                {data && <NewCategory />}
                <div className="divider" />
                <h1 className="text-2xl font-bold" id={accountHeaderId}>
                    Account
                </h1>
                {/* TODO: Account customization */}
            </main>
        </Drawer>
    );
}
