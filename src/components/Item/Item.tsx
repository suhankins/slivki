export interface ItemParams {
    image?: React.ReactNode;
    title: React.ReactNode;
    description?: React.ReactNode;
    priceSelector: React.ReactNode;
    children?: React.ReactNode;
}

export function Item({
    image,
    title,
    description,
    priceSelector,
    children,
}: ItemParams) {
    return (
        <article className="relative grid w-full max-w-2xl grid-cols-2 gap-4 rounded-lg bg-base-200 p-4">
            {children}
            {image}
            <header
                className={`flex flex-col gap-4 ${
                    !image && 'col-span-2 sm:col-span-1'
                }`}
            >
                {title}
                {description}
            </header>
            {priceSelector}
        </article>
    );
}
