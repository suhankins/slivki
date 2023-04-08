export interface ItemParams {
    picture?: React.ReactNode;
    title: React.ReactNode;
    description?: React.ReactNode;
    priceSelector: React.ReactNode;
}

export function Item({
    picture,
    title,
    description,
    priceSelector,
}: ItemParams) {
    return (
        <article className="relative grid min-h-[9rem] w-full max-w-2xl grid-cols-2 gap-4 rounded-lg bg-base-200 p-4">
            <div className="sm:row-span-2">{picture}</div>
            <header className="flex flex-col gap-4">
                {title}
                {description}
            </header>
            <div className="col-span-2 flex w-full flex-wrap items-center justify-center gap-4 self-end xs:flex-nowrap xs:justify-end sm:col-span-1 sm:flex-row">
                {priceSelector}
            </div>
        </article>
    );
}
