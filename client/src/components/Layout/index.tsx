import AppHeader from "./AppHeader";

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <AppHeader />
      <main className="grow">{children}</main>
    </>
  );
}
