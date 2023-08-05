import BookIcon from '../../../abstract/icons/BookIcon';
import CreditsBadge from './CreditsBadge';
import UserMenu from './UserMenu';

export default function AppHeader() {
  return (
    <header className="flex flex-row justify-center border-b-2 border-slate-800">
      <div className="flex w-full max-w-7xl grow flex-row justify-between p-4">
        <BookIcon className="text-4xl" />
        <div className="flex flex-row items-center gap-4">
          <CreditsBadge />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
