import Image from 'next/image';
import { ImageView } from './ImageView';

export function ImageViewer({
    src: picture,
    alt: altText,
}: {
    src: string;
    alt?: string;
}) {
    return (
        <ImageView>
            <Image
                width={312} // Resolution of the image at 4K display
                height={312}
                alt={altText ?? ''}
                className="aspect-square h-full max-h-64 w-full bg-base-300 object-cover"
                src={picture}
            />
        </ImageView>
    );
}
