import { ResultView } from '@/components/result/result-view';
import { getSubscription } from '@/lib/subscription';

export const metadata = {
  title: 'Try-On Result - VirtualTryOn',
  description: 'View your virtual try-on preview.',
};

export default async function ResultPage() {
  const subscription = await getSubscription();
  
  return <ResultView subscription={subscription} />;
}
