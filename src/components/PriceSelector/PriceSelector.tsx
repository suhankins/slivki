export function PriceSelector({ children }: { children: React.ReactNode }) {
    return (
        <div className="col-span-2 flex w-full flex-wrap items-center justify-center gap-4 self-end xs:flex-nowrap xs:justify-end sm:col-span-1 sm:flex-row">
            {children}
        </div>
    );
}
