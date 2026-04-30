import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import { db } from '@/db';
import { subscriptions } from '@/db/schema';
import { eq } from 'drizzle-orm';

export type SubscriptionData = {
  status: 'FREE_TRIAL' | 'TRIALS_EXHAUSTED' | 'SUBSCRIBED';
  plan: 'free' | 'monthly' | 'yearly';
  remainingTrials: number;
};

export async function getSubscription(): Promise<SubscriptionData> {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return {
        status: 'FREE_TRIAL',
        remainingTrials: 3,
        plan: 'free',
      };
    }

    const subscription = await db.query.subscriptions.findFirst({
      where: eq(subscriptions.userId, parseInt(session.user.id)),
    });

    if (!subscription) {
      return {
        status: 'FREE_TRIAL',
        remainingTrials: 3,
        plan: 'free',
      };
    }

    const remainingTrials = subscription.status === 'SUBSCRIBED' 
      ? Infinity 
      : subscription.remainingTrials;

    return {
      status: subscription.status as 'FREE_TRIAL' | 'TRIALS_EXHAUSTED' | 'SUBSCRIBED',
      plan: subscription.plan as 'free' | 'monthly' | 'yearly',
      remainingTrials,
    };
  } catch (error) {
    console.error('Get subscription error:', error);
    return {
      status: 'FREE_TRIAL',
      remainingTrials: 3,
      plan: 'free',
    };
  }
}
