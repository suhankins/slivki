import { EditableText } from '@/components/EditableText';
import { Item } from './Item';
import { ImageEditor } from '@/components/Item/Image/ImageEditor';
import { ItemClass } from '@/models/Item';
import { PriceSelectorEditor } from '@/components/PriceSelector/PriceSelectorEditor';
import { DeleteButton } from '@/components/buttons/DeleteButton';
import { UploadButton } from '@/components/buttons/UploadButton';
import { EllipsisMenu } from '../EllipsisMenu';
import { Position } from '@/utils/client/Position';
import { MoveButton } from '../buttons/MoveButton';
import { SimpleCategory } from '@/models/Category';
import { Locale, getLocalizedString } from '@/lib/i18n-config';

export function ItemEditor({
    item,
    categoryId,
    category,
    itemIndex,
    position,
    lang,
}: {
    item: ItemClass;
    categoryId: string;
    category: SimpleCategory;
    itemIndex: number;
    position: Position;
    lang: Locale;
}) {
    return (
        <Item
            image={
                item.image && (
                    <ImageEditor
                        categoryId={categoryId}
                        itemIndex={itemIndex}
                        image={item.image}
                    />
                )
            }
            title={
                <EditableText
                    fetchUrl={`/api/category/${categoryId}/items/${itemIndex}/name`}
                    placeholder="Title"
                    valueName={lang}
                    method="PATCH"
                    defaultValue={getLocalizedString(item.name, lang)}
                    textarea={true}
                    className="input-ghost input card-title w-full resize-none overflow-hidden rounded pl-0 pr-0 text-2xl"
                />
            }
            description={
                <EditableText
                    nullable={true}
                    allowNewLine={true}
                    fetchUrl={`/api/category/${categoryId}/items/${itemIndex}/description`}
                    valueName={lang}
                    method="PATCH"
                    placeholder="Description"
                    defaultValue={getLocalizedString(
                        item.description,
                        lang,
                        false
                    )}
                    textarea={true}
                    className="input-ghost input w-full resize-none overflow-hidden rounded pl-0 pr-0"
                />
            }
            priceSelector={
                <PriceSelectorEditor
                    categoryId={categoryId}
                    itemIndex={itemIndex}
                    sizes={category.sizes}
                    prices={item.price}
                />
            }
        >
            <EllipsisMenu className="absolute top-0 right-0 z-20">
                {!item.image && (
                    <li>
                        <UploadButton
                            itemIndex={itemIndex}
                            categoryId={categoryId}
                        />
                    </li>
                )}
                <li>
                    <DeleteButton
                        aria-label="Delete item"
                        className="btn-square"
                        fetchUrl={`/api/category/${categoryId}/items/${itemIndex}`}
                    />
                </li>
                {position !== 'alone' && (
                    <>
                        {position !== 'first' && (
                            <li>
                                <MoveButton
                                    direction="up"
                                    categoryId={categoryId}
                                    itemIndex={itemIndex}
                                />
                            </li>
                        )}
                        {position !== 'last' && (
                            <li>
                                <MoveButton
                                    direction="down"
                                    categoryId={categoryId}
                                    itemIndex={itemIndex}
                                />
                            </li>
                        )}
                    </>
                )}
            </EllipsisMenu>
        </Item>
    );
}
