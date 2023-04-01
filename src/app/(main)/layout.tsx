import Link from 'next/link';
import { Burger } from './Burger';

export default async function mainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="drawer">
            <input
                id="drawer"
                type="checkbox"
                className="drawer-toggle"
                aria-hidden="true"
            />
            <div className="drawer-content flex flex-col">
                <div className="navbar w-full bg-base-300">
                    <div className="flex-none">
                        <label
                            htmlFor="drawer"
                            className="btn-ghost btn-square btn"
                        >
                            <Burger />
                        </label>
                    </div>
                    <a className="btn-ghost btn text-2xl normal-case">
                        Slivki (logo)
                    </a>
                </div>
                {children}
            </div>
            <div className="drawer-side">
                <label htmlFor="drawer" className="drawer-overlay"></label>
                <ul className="menu w-80 bg-base-100 p-4">
                    <div className="text-center text-2xl normal-case">
                        Slivki (logo)
                    </div>
                    <hr className="my-4 bg-primary" />
                    {/* TODO: Categories */}
                    <li>
                        <a className="text-xl normal-case" role="button">
                            Coffee
                        </a>
                    </li>
                    <li>
                        <a className="text-xl normal-case" role="button">
                            Tea
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
