export async function newItem(categoryId: string) {
    const result = await fetch(`/api/category/${categoryId}/items/`, {
        method: 'POST',
        body: JSON.stringify({
            name: 'New Item',
            price: 0,
        }),
    });
    if (result.ok) console.log('New item added successfully');
    else throw new Error('Failed to add new item.');

    fetch('/api/revalidate');
}
