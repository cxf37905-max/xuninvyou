import { PricingView } from '@/components/pricing/pricing-view';
import { getSubscription } from '@/lib/subscription';

export const metadata = {
  title: 'Pricing - VirtualTryOn',
  description: 'Choose your subscription plan.',
};

export default async function PricingPage() {
  const subscription = await getSubscription();
  
  return <PricingView subscription={subscription} />;
}
