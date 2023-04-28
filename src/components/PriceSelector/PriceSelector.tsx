export function PriceSelector({
    sizeSelector,
    price,
}: {
    sizeSelector: React.ReactNode;
    price: React.ReactNode;
}) {
    return (
        <div className="col-span-2 flex w-full flex-col items-center justify-center gap-4 sm:col-span-1 md:flex-row">
            {sizeSelector}
            {price}
        </div>
    );
}
