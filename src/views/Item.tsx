import { ItemClass } from '@/models/Item';

export function Item({ item }: { item: ItemClass }) {
    return (
        <div>
            <div>
                <img></img>
            </div>
            <div>
                <div>
                    <h2>{item.name_en}</h2>
                    <p>{item.description_en}</p>
                </div>
                <div>
                    <div>
                        <button>200 ml</button>
                        <button>300 ml</button>
                        <button>400 ml</button>
                    </div>
                    <span>8 (ICON)</span>
                </div>
            </div>
        </div>
    );
}
