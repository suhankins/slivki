'use client';

import { Locale, getLocalizedString } from '@/lib/i18n-config';
import { waysToContact } from '@/lib/waysToContact';
import { useState } from 'react';

export function OrderForm({ lang }: { lang: Locale }) {
    const [selectedWayToContact, setSelectedWayToContact] = useState<number>(0);

    return (
        <form className="flex w-full flex-col items-center gap-2">
            <h1 className="text-xl">How would you like us to contant you?</h1>
            <div className="flex w-full justify-evenly">
                {waysToContact.map((way, index) => (
                    <label
                        className="label cursor-pointer flex-col"
                        key={index}
                    >
                        <p>{getLocalizedString(way.name, lang)}</p>
                        <input
                            type="radio"
                            className="radio-primary radio radio-lg"
                            checked={selectedWayToContact === index}
                            onChange={() => setSelectedWayToContact(index)}
                        />
                    </label>
                ))}
            </div>
            <div className="form-control">
                <label className="input-group">
                    <span>{waysToContact[selectedWayToContact].prefix}</span>
                    <input
                        type="text"
                        placeholder={
                            waysToContact[selectedWayToContact].placeholder
                        }
                        className="input-bordered input w-full max-w-2xl"
                    />
                </label>
            </div>
            {waysToContact[selectedWayToContact].warning && (
                <div className="alert alert-warning">
                    <div>
                        <span>
                            {getLocalizedString(
                                waysToContact[selectedWayToContact].warning,
                                lang
                            )}
                        </span>
                    </div>
                </div>
            )}
            <button className="btn-success btn-block btn" type="submit">
                Order
            </button>
        </form>
    );
}
