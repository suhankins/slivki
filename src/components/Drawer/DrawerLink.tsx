'use client';

export function DrawerLink({
    drawerInputId,
    name,
    id,
}: {
    drawerInputId: string;
    name: string;
    id: string;
}) {
    return (
        <a
            onClick={() => {
                const element = document.getElementById(id);
                element?.scrollIntoView(true);
                document.getElementById(drawerInputId)?.click();
            }}
        >
            {name}
        </a>
    );
}
