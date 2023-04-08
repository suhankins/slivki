'use client';

import { Drawer } from '@/components/Drawer/Drawer';
import { Logout } from '@/components/Logout';
import { getCategoryElementId } from '@/lib/getCategoryElementId';
import { SimpleCategory } from '@/models/Category';
import { CategoryEditor } from '@/views/Category/CategoryEditor';
import { CategorySkeleton } from '@/views/Category/CategorySkeleton';
import { useId, useMemo } from 'react';
import useSwr, { preload } from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

preload('/api/category', fetcher);

export default function AdminPage() {
    const categoriesHeaderId = useId();
    const accountHeaderId = useId();

    const { data, error, isLoading } = useSwr<SimpleCategory[]>(
        '/api/category',
        fetcher
    );

    const headers = useMemo(() => {
        return [
            {
                name: 'Categories',
                id: categoriesHeaderId,
                innerHeaders: data?.map((category, index) => {
                    return {
                        name: category.name_en,
                        id: getCategoryElementId(category.name_en, index),
                    };
                }),
            },
            {
                name: 'Account',
                id: accountHeaderId,
            },
        ];
    }, [data]);

    return (
        <Drawer
            navbarElements={<Logout className="ml-auto" />}
            name="Slivki Admin Panel"
            headers={headers}
        >
            <main className="vertical-list w-full">
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
                {data?.map((category) => (
                    <CategoryEditor
                        category={category}
                        key={category._id.toString()}
                    />
                ))}
                <div className="divider" />
                <h1 className="text-2xl font-bold" id={accountHeaderId}>
                    Account
                </h1>
                {/* TODO: Account customization */}
            </main>
        </Drawer>
    );
}
