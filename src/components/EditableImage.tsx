import { useId, useMemo } from 'react';

export interface EditableImageProps {
    picture?: string;
}

export function EditableImage({ picture }: EditableImageProps) {
    const fileUploaderId = useId();

    return (
        <>
            {picture ? (
                <div
                    role="img"
                    className="aspect-square h-full w-full rounded-lg bg-base-300 bg-cover bg-center bg-no-repeat sm:row-span-2"
                    style={{
                        backgroundImage: `url('${picture}')`,
                    }}
                />
            ) : (
                <>
                    <label
                        className="btn-primary btn absolute right-4 top-4 aspect-square p-4"
                        role="button"
                        aria-label="Upload image"
                        htmlFor={fileUploaderId}
                        tabIndex={0}
                    >
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
                    </label>
                    <input type="file" id={fileUploaderId} className="hidden" />
                </>
            )}
        </>
    );
}
