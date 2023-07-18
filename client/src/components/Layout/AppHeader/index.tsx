import UserMenu from "./UserMenu";

export default function AppHeader() {
  return (
    <header className="flex flex-row justify-center">
      <div className="grow w-full max-w-7xl flex flex-row justify-between p-4">
        <p>Logo</p>

        <UserMenu />
      </div>
    </header>
  );
}
