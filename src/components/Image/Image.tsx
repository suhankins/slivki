export function Image({
    picture,
    ariaLabel,
}: {
    picture: string;
    ariaLabel?: string;
}) {
    return (
        <div
            role="img"
            aria-label={ariaLabel}
            className="aspect-square h-full w-full rounded-lg bg-base-300 bg-cover bg-center bg-no-repeat sm:row-span-2"
            style={{
                backgroundImage: `url('${picture}')`,
            }}
        />
    );
}
