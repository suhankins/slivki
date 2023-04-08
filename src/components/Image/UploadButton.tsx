import { ChangeEvent } from 'react';

export function UploadButton({
    className,
    fileUploaderId,
    handleFileChange,
    loadingText,
    disabled,
}: {
    className?: string;
    fileUploaderId: string;
    handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
    loadingText: string | null;
    disabled: boolean;
}) {
    return (
        <>
            <label
                className={`btn-primary btn ${
                    disabled && 'btn-disabled'
                } ${className}`}
                role="button"
                aria-label="Upload image"
                htmlFor={fileUploaderId}
                tabIndex={0}
                aria-disabled={disabled}
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
                disabled={disabled}
                type="file"
                id={fileUploaderId}
                className="hidden"
                onChange={handleFileChange}
            />
        </>
    );
}
