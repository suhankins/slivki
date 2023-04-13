import { DeleteButton } from '../DeleteButton';
import { ImageView } from './ImageView';
import { UploadButton } from './UploadButton';

export interface EditableImageProps {
    picture?: string;
    itemIndex: number;
    categoryId: string;
}

export function EditableImage({
    picture,
    itemIndex,
    categoryId,
}: EditableImageProps) {
    return (
        <>
            {picture ? (
                <figure className="group relative sm:row-span-2">
                    <div className="invisible absolute right-1 top-1 flex gap-1 group-hover:visible">
                        <UploadButton
                            itemIndex={itemIndex}
                            categoryId={categoryId}
                        />
                        <DeleteButton
                            fetchUrl={`/api/category/${categoryId}/items/${itemIndex}/image`}
                        />
                    </div>

                    <ImageView src={picture} />
                </figure>
            ) : (
                <UploadButton
                    className="absolute right-4 top-4"
                    itemIndex={itemIndex}
                    categoryId={categoryId}
                />
            )}
        </>
    );
}
