import AppHeader from './AppHeader';

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <AppHeader />
      <main className="background-pattern flex grow flex-col">{children}</main>
    </>
  );
}
