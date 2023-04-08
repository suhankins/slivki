'use client';

import { ChangeEvent, useId, useState } from 'react';
import { Image } from './Image';
import {
    confirmUploadRequest,
    getSignedUrlRequest,
    uploadToGoogleStorage,
} from '@/utils/uploadImage';
import { UploadButton } from './UploadButton';

export interface EditableImageProps {
    picture?: string;
    itemIndex: number;
    categoryId: string;
}

export function EditableImage({
    picture,
    itemIndex,
    categoryId,
}: EditableImageProps) {
    const fileUploaderId = useId();
    const [loadingText, setLoadingText] = useState<null | string>(null);

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file === undefined) return;
        try {
            const fileExtension = file.name.split('.').slice(-1)[0];

            setLoadingText('Asking permission...');
            const { url, fields } = await getSignedUrlRequest(
                itemIndex,
                categoryId,
                fileExtension
            );

            setLoadingText('Uploading...');
            await uploadToGoogleStorage(url, fields, file);

            setLoadingText('Confirming...');
            await confirmUploadRequest(itemIndex, categoryId, fileExtension);
        } catch (error) {
            // TODO: Add toasts for errors
            console.error(error);
        }
        setLoadingText(null);
        event.target.files = null;
        fetch('/api/revalidate'); // revalidating main page
    };

    return (
        <>
            {picture ? (
                <figure className="group relative">
                    <div className="invisible absolute right-1 top-1 flex gap-1 group-hover:visible">
                        <UploadButton
                            className={`${!loadingText && 'btn-square'}`}
                            fileUploaderId={fileUploaderId}
                            handleFileChange={handleFileChange}
                            loadingText={loadingText}
                            disabled={loadingText !== null}
                        />
                        <button
                            className="btn-error btn-square btn"
                            aria-label="Delete image"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                            </svg>
                        </button>
                    </div>

                    <Image picture={picture} />
                </figure>
            ) : (
                <UploadButton
                    disabled={loadingText !== null}
                    className="btn-square absolute right-4 top-4"
                    fileUploaderId={fileUploaderId}
                    handleFileChange={handleFileChange}
                    loadingText={loadingText}
                />
            )}
        </>
    );
}
