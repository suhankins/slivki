export async function deleteImage(categoryId: string, itemIndex: number) {
    const result = await fetch(
        `/api/category/${categoryId}/items/${itemIndex}/image`,
        { method: 'DELETE' }
    );
    if (result.ok) console.log('Deleted successfully!');
    else throw new Error('Failed to delete.');
}
