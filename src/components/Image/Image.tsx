export function Image({
    picture,
    altText,
}: {
    picture: string;
    altText?: string;
}) {
    return (
        <img
            alt={altText}
            className="aspect-square h-full w-full rounded-lg bg-base-300 object-cover"
            src={picture}
        />
    );
}
