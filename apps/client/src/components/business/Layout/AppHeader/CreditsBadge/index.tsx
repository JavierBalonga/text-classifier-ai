import { useCreditsContext } from '../../../../../contexts/CreditsContext';
import Alert from '../../../../abstract/Alert';
import Skeleton from '../../../../abstract/Skeleton';
import Tag from '../../../../abstract/Tag';

export default function CreditsBadge() {
  const { credits, loading, error } = useCreditsContext();

  if (error) {
    return <Alert error={error} />;
  } else if (loading) {
    return <Skeleton width={68} height={26} />;
  } else {
    return <Tag>Credits: {credits}</Tag>;
  }
}
