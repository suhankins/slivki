'use client';

import { ChangeEvent, useId, useState } from 'react';
import { Image } from './Image';
import {
    confirmUploadRequest,
    getSignedUrlRequest,
    uploadToGoogleStorage,
} from '@/lib/uploadImage';

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
    };

    return (
        <>
            {picture ? (
                <Image picture={picture} />
            ) : (
                <>
                    <label
                        className="btn-primary btn absolute right-4 top-4 aspect-square p-4"
                        role="button"
                        aria-label="Upload image"
                        htmlFor={fileUploaderId}
                        tabIndex={0}
                    >
                        {loadingText ? (
                            <span>{loadingText}</span>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="absolute h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                />
                            </svg>
                        )}
                    </label>
                    <input
                        type="file"
                        id={fileUploaderId}
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </>
            )}
        </>
    );
}