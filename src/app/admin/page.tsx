'use client';

import { Drawer } from '@/components/Drawer/Drawer';
import { Logout } from '@/components/Logout';
import { getCategoryElementId } from '@/utils/client/getCategoryElementId';
import { SimpleCategory } from '@/models/Category';
import { CategoryEditor } from '@/components/Category/CategoryEditor';
import { CategorySkeleton } from '@/components/Category/CategorySkeleton';
import { useId, useState } from 'react';
import useSwr from 'swr';
import { NewCategory } from '@/components/Category/NewCategory';
import { getPosition } from '@/utils/client/Position';
import { Locale, getLocalizedString } from '@/lib/i18n-config';
import { LanguagePicker } from '@/components/LanguagePicker';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AdminPage() {
    const [lang, setLang] = useState<Locale>('en');
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
            innerHeaders: data
                ?.sort((a, b) => (b.index ?? 0) - (a.index ?? 0))
                .map((category, index) => {
                    return {
                        name: getLocalizedString(category.name, lang),
                        id: getCategoryElementId(
                            getLocalizedString(category.name, lang),
                            index
                        ),
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
            navbarElements={
                <>
                    <LanguagePicker
                        className="ml-auto"
                        selectedLang={lang}
                        setLang={setLang}
                    />
                    <Logout className="ml-2" />
                </>
            }
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
                            lang={lang}
                            id={getCategoryElementId(
                                getLocalizedString(category.name, lang),
                                index
                            )}
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
