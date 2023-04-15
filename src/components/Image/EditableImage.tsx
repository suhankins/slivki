import { DeleteButton } from '../buttons/DeleteButton';
import { ImageView } from './ImageView';
import { UploadButton } from '../buttons/UploadButton';

export interface EditableImageProps {
    image?: string;
    itemIndex: number;
    categoryId: string;
}

export function EditableImage({
    image,
    itemIndex,
    categoryId,
}: EditableImageProps) {
    return (
        <>
            {image && (
                <figure className="group relative sm:row-span-2">
                    <div className="invisible absolute right-1 top-1 flex gap-1 group-hover:visible">
                        <UploadButton
                            itemIndex={itemIndex}
                            categoryId={categoryId}
                        />
                        <DeleteButton
                            aria-label="Delete image"
                            fetchUrl={`/api/category/${categoryId}/items/${itemIndex}/image`}
                        />
                    </div>
                    <ImageView src={image} />
                </figure>
            )}
        </>
    );
}
