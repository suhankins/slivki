import { CartProvider } from '@/components/CartProvider';

export default function Layout({ children }: { children: React.ReactNode }) {
    return <CartProvider>{children}</CartProvider>;
}
