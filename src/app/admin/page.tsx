'use client';

import { SimpleCategory } from '@/models/Category';
import { CategoryEditable } from '@/views/CategoryEditable';
import { CategorySkeleton } from '@/views/CategorySkeleton';
import useSwr from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AdminPage() {
    const { data, error, isLoading } = useSwr<SimpleCategory[]>(
        '/api/category',
        fetcher
    );
    return (
        <main className="vertical-list">
            <div className="vertical-list">
                <h1 className="text-xl font-bold">Categories</h1>
                {isLoading && <CategorySkeleton />}
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
            </div>
            <div className="divider"></div>
            <div className="vertical-list">
                <h1 className="text-xl font-bold">Account</h1>
                {/* TODO: Account customization */}
            </div>
        </main>
    );
}
