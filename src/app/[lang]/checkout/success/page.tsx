export default function Page() {
    return (
        <>
            <h1 className="text-center text-4xl font-extrabold">
                Thank you for your order!
            </h1>
            <p className="text-center text-xl">
                If we don't contact you within 5 minutes, please message us via
            </p>
            <div className="flex flex-col items-center md:flex-row">
                <a
                    className="btn-primary btn text-2xl normal-case"
                    href="https://example.com/" // TODO: Replace with real URL
                    target="_blank"
                >
                    Telegram
                </a>
                <div className="divider">or</div>
                <a
                    className="btn-primary btn text-2xl normal-case"
                    href="https://www.instagram.com/slivki_coffee_ge/"
                    target="_blank"
                >
                    Instagram
                </a>
            </div>
        </>
    );
}
