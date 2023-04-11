export async function deleteImage(categoryId: string, itemIndex: number) {
    const result = await fetch(
        `/api/category/${categoryId}/${itemIndex}/image`,
        {
            method: 'PUT',
            body: JSON.stringify({
                value: '',
            }),
        }
    );
    if (result.ok) console.log('Deleted successfully!');
    else throw new Error('Failed to delete.');
}
