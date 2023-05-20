import { Drawer } from '@/components/Drawer/Drawer';
import { getCategoryElementId } from '@/utils/client/getCategoryElementId';
import { CategoryModel, SimpleCategory } from '@/models/Category';
import { CategoryViewer } from '@/components/Category/CategoryViewer';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { HeroScrollButton } from '@/components/buttons/HeroScrollButton';
import { getDictionary } from '@/lib/getDictionary';
import { Locale, getLocalizedString, i18n } from '@/lib/i18n-config';
import { LanguagePickerViewer } from '@/components/LanguagePicker/LanguagePickerViewer';
import { CartDisplay } from '@/components/Cart/CartDisplay';

async function getCategories() {
    const categories = (await CategoryModel.find()).map(
        (category) => category.toObject() as SimpleCategory
    );
    return categories;
}

export const revalidate = false;
export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({
        lang: locale,
    }));
}

export default async function Home({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const categories = await getCategories();
    const dictionary = await getDictionary(lang);

    return (
        <Drawer
            name={dictionary.companyName}
            navbarElements={
                <>
                    <LanguagePickerViewer selectedLang={lang} />
                    <CartDisplay />
                </>
            }
            navbarChangeOnScroll={true}
            headers={categories
                .sort((a, b) => (b.index ?? 0) - (a.index ?? 0))
                .map((category, index) => {
                    return {
                        name: getLocalizedString(category.name, lang),
                        id: getCategoryElementId(
                            getLocalizedString(category.name, lang),
                            index
                        ),
                        depth: category.depth,
                    };
                })}
        >
            <div
                className="min-h-s-screen hero relative -top-16"
                style={{
                    backgroundImage: `url("/static/backgroundPlaceholder.webp")`,
                }}
            >
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">
                            {dictionary.hero.top}
                        </h1>
                        <p className="mb-5">{dictionary.hero.bottom}</p>
                    </div>
                </div>
                <a
                    className="btn-instagram group btn-square btn absolute bottom-4 right-4 flex gap-2 focus:w-auto focus:px-4 sm:w-auto sm:px-4"
                    href="https://www.instagram.com/slivki_coffee_ge/"
                    target="_blank"
                >
                    <span className="hidden group-focus:inline sm:inline">
                        @slivki_coffee_ge
                    </span>
                    <img
                        alt="Instagram logo"
                        src="/static/instagram.svg"
                        className="inline h-6 w-6"
                    />
                </a>
                <HeroScrollButton
                    id={getCategoryElementId(
                        categories[0]
                            ? getLocalizedString(categories[0].name, lang)
                            : '',
                        0
                    )}
                    className="absolute bottom-4"
                    aria-label="Scroll down to the menu"
                >
                    <ChevronDownIcon />
                </HeroScrollButton>
            </div>
            <main className="vertical-list w-full max-w-screen-lg p-4">
                {categories
                    ?.sort((a, b) => (b.index ?? 0) - (a.index ?? 0))
                    .map((category, index) => (
                        <CategoryViewer
                            lang={lang}
                            id={getCategoryElementId(
                                getLocalizedString(category.name, lang),
                                index
                            )}
                            key={index}
                            category={category}
                        />
                    ))}
            </main>
        </Drawer>
    );
}
