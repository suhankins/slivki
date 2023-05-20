import { CartProvider } from '@/components/Cart/CartProvider';

export default function Layout({ children }: { children: React.ReactNode }) {
    return <CartProvider>{children}</CartProvider>;
}
