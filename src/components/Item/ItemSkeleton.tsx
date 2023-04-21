import { Item } from './Item';

/**
 * For loading screens
 */
export function ItemSkeleton(): JSX.Element {
    return (
        <Item
            title={<div className="skeleton h-8 w-32 rounded-lg" />}
            description={
                <div className="flex flex-col gap-1">
                    <div className="skeleton h-6 w-36 rounded-lg" />
                    <div className="skeleton h-6 w-16 rounded-lg" />
                </div>
            }
            image={
                <div className="skeleton aspect-square h-full w-full rounded-lg sm:row-span-2" />
            }
            priceSelector={
                <div className="col-span-2 flex w-full items-center gap-4 self-end sm:col-span-1">
                    <div className="skeleton h-14 w-full rounded-full" />
                    <div className="skeleton h-14 w-24 rounded-lg" />
                </div>
            }
        />
    );
}
