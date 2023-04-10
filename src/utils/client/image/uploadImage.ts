export async function getSignedUrlRequest(
    itemIndex: number,
    categoryId: string,
    fileExtension: string
): Promise<{
    url: string;
    fields: any;
}> {
    const response = await fetch(
        `/api/upload?itemIndex=${itemIndex}&id=${categoryId}&filetype=${fileExtension}`
    );
    if (response.ok) console.log('Got signed URL successfully!');
    else throw new Error('Failed to get signed URL.');

    return response.json();
}

export async function uploadToGoogleStorage(
    url: string,
    fields: any,
    file: File
) {
    // Converting fields to FormData and combining with file
    const formData = new FormData();
    Object.entries({ ...fields, file }).forEach(([key, value]) => {
        formData.append(key, value as any);
    });

    const response = await fetch(url, {
        method: 'POST',
        body: formData,
    });
    if (response.ok) console.log('Uploaded successfully!');
    else throw new Error('Failed to upload.');
}

export async function confirmUploadRequest(
    itemIndex: number,
    categoryId: string,
    filename: string
) {
    const result = await fetch(
        `/api/upload/confirm?itemIndex=${itemIndex}&id=${categoryId}&filename=${filename}`,
        { method: 'POST' }
    );
    if (result.ok) console.log('Confirmed successfully!');
    else throw new Error('Failed to confirm.');

    fetch('/api/revalidate');
}
