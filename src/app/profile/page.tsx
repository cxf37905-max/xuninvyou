import { ProfileView } from '@/components/profile/profile-view';
import { getSubscription } from '@/lib/subscription';

export const metadata = {
  title: 'Profile - VirtualTryOn',
  description: 'Manage your account settings.',
};

export default async function ProfilePage() {
  const subscription = await getSubscription();
  
  return <ProfileView subscription={subscription} />;
}
