export async function newCategory() {
    const result = await fetch(`/api/category/new`, {
        method: 'POST',
        body: JSON.stringify({
            name: 'New Category',
        }),
    });
    if (result.ok) console.log('New category added successfully');
    else throw new Error('Failed to add new category.');

    fetch('/api/revalidate');
}
