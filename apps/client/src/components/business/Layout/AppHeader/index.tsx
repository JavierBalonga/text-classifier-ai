import { useAuth } from '../../../../contexts/AuthProvider';
import BookIcon from '../../../abstract/icons/BookIcon';
import ClaimCreditsButton from './ClaimCreditsButton';
import CreditsBadge from './CreditsBadge';
import UserMenu from './UserMenu';

export default function AppHeader() {
  const { isAuthenticated } = useAuth();
  return (
    <header className="flex flex-row justify-center border-b-2 border-slate-800">
      <div className="flex w-full max-w-7xl grow flex-row justify-between p-4">
        <BookIcon className="text-4xl" />
        <div className="flex flex-row items-center gap-4">
          {isAuthenticated && <ClaimCreditsButton />}
          {isAuthenticated && <CreditsBadge />}
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
