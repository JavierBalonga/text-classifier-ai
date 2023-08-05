import { useCreditsContext } from '../../../../../contexts/CreditsContext';
import Alert from '../../../../abstract/Alert';
import Spinner from '../../../../abstract/Spinner';
import Tag from '../../../../abstract/Tag';

export default function CreditsBadge() {
  const { credits, loading, error } = useCreditsContext();
  if (error) {
    return <Alert error={error} />;
  } else if (loading) {
    return <Spinner />;
  } else {
    return <Tag>Credits: {credits}</Tag>;
  }
}
