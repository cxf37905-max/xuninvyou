import { TryOnView } from '@/components/tryon/try-on-view';
import { getSubscription } from '@/lib/subscription';

export const metadata = {
  title: 'Virtual Try-On - Try Clothes Before You Buy',
  description: 'Upload your photo and any clothing image to see how it looks on you.',
};

export default async function TryOnPage() {
  const subscription = await getSubscription();
  
  return <TryOnView subscription={subscription} />;
}
