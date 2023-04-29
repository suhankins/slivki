export function PriceSelector({
    sizeSelector,
    price,
}: {
    sizeSelector: React.ReactNode;
    price: React.ReactNode;
}) {
    return (
        <div className="flex w-full flex-grow flex-col items-center justify-end lg:flex-row">
            <div className="flex w-full justify-evenly">{sizeSelector}</div>
            {price}
        </div>
    );
}
