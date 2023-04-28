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
        <article className="card card-compact w-full max-w-2xl bg-base-200">
            {children}
            {image}
            <div className="card-body">
                <header className={`flex flex-col gap-4`}>
                    {title}
                    {description}
                </header>
                {priceSelector}
            </div>
        </article>
    );
}
