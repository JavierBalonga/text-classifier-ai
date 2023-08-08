import { useCreditsContext } from '../../../../../contexts/CreditsContext';
import Alert from '../../../../abstract/Alert';
import Button from '../../../../abstract/Button';
import useClaimDailyCredits from './useClaimDailyCredits';

export default function ClaimCreditsButton() {
  const { refreshCredits, lastClaimDatetime } = useCreditsContext();
  const [claimDailyCredits, { error, loading }] = useClaimDailyCredits();

  const handleClaimDailyCredits = () => {
    claimDailyCredits().then(() => refreshCredits());
  };

  if (
    lastClaimDatetime &&
    new Date(lastClaimDatetime).getFullYear() >= new Date().getFullYear() &&
    new Date(lastClaimDatetime).getMonth() >= new Date().getMonth() &&
    new Date(lastClaimDatetime).getDate() >= new Date().getDate()
  ) {
    return null;
  } else if (error) {
    return <Alert size="sm" error={error} />;
  } else {
    return (
      <Button size="sm" onClick={handleClaimDailyCredits} disabled={loading}>
        Claim Daily Credits
      </Button>
    );
  }
}
