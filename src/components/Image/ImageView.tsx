import Image from 'next/image';

export function ImageView({
    src: picture,
    alt: altText,
}: {
    src: string;
    alt?: string;
}) {
    return (
        <Image
            width={312} // Resolution of the image at 4K display
            height={312}
            priority={true}
            alt={altText ?? ''}
            className="aspect-square h-full w-full rounded-lg bg-base-300 object-cover sm:row-span-2"
            src={picture}
        />
    );
}
