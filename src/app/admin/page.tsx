'use client';

import { CategoryClass } from '@/models/Category';
import { CategoryEditable } from '@/views/CategoryEditable';
import useSwr from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AdminPage() {
    const { data, error, isLoading } = useSwr<CategoryClass[]>(
        '/api/category',
        fetcher
    );
    return (
        <main>
            <h1 className="text-xl font-bold">Categories</h1>
            {isLoading && <progress className="progress w-56"></progress>}
            {error && (
                <div className="alert alert-error shadow-lg">
                    <span>Error! Couldn't fetch list of categories.</span>
                    <span>Reload the page or call the programmer</span>
                </div>
            )}
            {data &&
                data.map((category) => (
                    <CategoryEditable
                        category={category}
                        key={category._id.toString()}
                    />
                ))}
        </main>
    );
}
